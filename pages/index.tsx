import Footer from '@/components/main/Footer'
import Header from '@/components/main/Header'
import KakaoMap from '@/components/main/KakaoMap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import api from './api/api'

export async function getStaticProps() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['hospital'],
        queryFn: () => api.getHospital(),
    })

    await queryClient.prefetchQuery({
        queryKey: ['cityList'],
        queryFn: () => api.getCityList(),
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default function Home() {
    const { data, error } = useQuery({
        queryKey: ['hospital'],
        queryFn: () => api.getHospital(),
        select: (d) => d.Animalhosptl,
    })

    const { data: cities, error: citiesError } = useQuery({
        queryKey: ['cityList'],
        queryFn: () => api.getCityList(),
        select: (d) => d.Bysigunbasis[1].row,
    })

    console.log(cities)
    console.log(citiesError)

    return (
        <div className="min-w-screen h-full min-h-screen w-full overflow-hidden">
            <Header />
            <div className="h-[calc(100vh_-_64px)] w-full bg-stone-100 p-1">
                <div className="m-auto flex w-full max-w-md flex-col gap-4 pt-3">
                    <div className="form-control w-full flex-row gap-2">
                        <select className="select-bordered select max-w-xs">
                            <option>전체</option>
                            <option>병원</option>
                            <option>etc</option>
                        </select>
                        <select className="select-bordered select max-w-xs">
                            {cities.map((city: any) => (
                                <option>{city.SIGUN_NM}</option>
                            ))}
                        </select>
                        <div className="input-group w-full">
                            <input
                                type="text"
                                placeholder="Search…"
                                className="input-bordered input w-full focus:outline-none"
                            />
                            <button className="btn-square btn p-2.5">
                                <MagnifyingGlassIcon />
                            </button>
                        </div>
                    </div>
                    <KakaoMap longitude={127.1325708} latitude={37.440861} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
