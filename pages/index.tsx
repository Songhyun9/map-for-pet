import Footer from '@/components/main/Footer'
import Header from '@/components/main/Header'
import KakaoMap from '@/components/main/KakaoMap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import api from './api/api'

export async function getStaticProps() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['stay'],
        queryFn: () => api.getHospital(),
    })

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default function Home() {
    const { data, error } = useQuery({
        queryKey: ['stay'],
        queryFn: () => api.getHospital(),
        select: (d) => d.Animalhosptl,
    })
    console.log(data)
    console.log(error)
    return (
        <div className="min-w-screen h-full min-h-screen w-full overflow-hidden">
            <Header />
            <div className="h-[calc(100vh_-_64px)] w-full bg-stone-100 p-1">
                <div className="m-auto flex w-full max-w-md flex-col gap-4 pt-3">
                    <div className="form-control w-full flex-row gap-2">
                        <select className="select-bordered select max-w-xs">
                            <option>전체</option>
                            <option selected>병원</option>
                            <option>etc</option>
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
                    <KakaoMap longitude={126.570667} latitude={33.450701} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
