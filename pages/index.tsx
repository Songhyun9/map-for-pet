import Footer from '@/components/main/Footer'
import Header from '@/components/main/Header'
import KakaoMap from '@/components/main/KakaoMap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import api from './api/api'

interface IHospital {
    BIZCOND_DIV_NM_INFO: any
    BIZPLC_NM: string
    BSN_STATE_DIV_CD: string
    BSN_STATE_NM: string
    CLSBIZ_DE: any
    LICENSG_CANCL_DE: any
    LICENSG_DE: string
    LOCPLC_AR_INFO: string
    LOCPLC_FACLT_TELNO: string
    LOCPLC_ZIP_CD: any
    REFINE_LOTNO_ADDR: string
    REFINE_ROADNM_ADDR: string
    REFINE_WGS84_LAT: string
    REFINE_WGS84_LOGT: string
    REFINE_ZIP_CD: string
    RIGHT_MAINBD_IDNTFY_NO: string
    ROADNM_ZIP_CD: string
    SFRMPROD_PROCSBIZ_DIV_NM: any
    SIGUN_CD: string
    SIGUN_NM: string
    STOCKRS_DUTY_DIV_NM: string
    STOCKRS_IDNTFY_NO: any
    TOT_EMPLY_CNT: any
    X_CRDNT_VL: string
    Y_CRDNT_VL: string
}

interface IPharmacy {
    BIZCOND_DIV_NM_INFO: any
    BIZPLC_NM: string
    BSN_STATE_DIV_CD: string
    BSN_STATE_NM: string
    CLSBIZ_DE: string
    LICENSG_CANCL_DE: any
    LICENSG_DE: string
    LOCPLC_AR_INFO: any
    LOCPLC_FACLT_TELNO: string
    REFINE_LOTNO_ADDR: string
    REFINE_ROADNM_ADDR: string
    REFINE_WGS84_LAT: string
    REFINE_WGS84_LOGT: string
    REFINE_ZIP_CD: string
    RIGHT_MAINBD_IDNTFY_NO: string
    ROADNM_ZIP_CD: string
    SFRMPROD_PROCSBIZ_DIV_NM: any
    SIGUN_CD: string
    SIGUN_NM: string
    STOCKRS_DUTY_DIV_NM: string
    STOCKRS_IDNTFY_NO: any
    TOT_EMPLY_CNT: any
    X_CRDNT_VL: string
    Y_CRDNT_VL: string
}

export async function getStaticProps() {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['hospital'],
        queryFn: () => api.getHospital(1, 100, ''),
    })

    await queryClient.prefetchQuery({
        queryKey: ['pharmacy'],
        queryFn: () => api.getPhamacy(1, 100, ''),
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
    const [cityCD, setCItyCD] = useState<string>('41110')

    const { data: cities, error: citiesError } = useQuery({
        queryKey: ['cityList'],
        queryFn: () => api.getCityList(),
        select: (d) => d.Bysigunbasis[1].row,
    })

    const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCItyCD(event.target.value)
    }

    const { data: hospitals, error } = useQuery({
        queryKey: ['hospital', cityCD],
        queryFn: () => api.getHospital(1, 100, cityCD),
        select: (d) =>
            (d.Animalhosptl[1].row as IHospital[])
                .filter((v) => v.BSN_STATE_DIV_CD === '0000')
                .map((v2) => ({
                    name: v2.BIZPLC_NM,
                    phone: v2.LOCPLC_FACLT_TELNO,
                    address: v2.REFINE_ROADNM_ADDR,
                    zip: v2.ROADNM_ZIP_CD,
                    lat: v2.REFINE_WGS84_LAT,
                    lng: v2.REFINE_WGS84_LOGT,
                })),
    })

    const { data: pharmacies, error: pharmaciesError } = useQuery({
        queryKey: ['pharmacy', cityCD],
        queryFn: () => api.getPhamacy(1, 100, cityCD),
        select: (d) =>
            (d.AnimalPharmacy[1].row as IPharmacy[]).filter(
                (v) => v.BSN_STATE_DIV_CD === '0000'
            ),
    })

    console.log(pharmacies)
    console.log(pharmaciesError)

    return (
        <div className="min-w-screen h-full min-h-screen w-full overflow-hidden">
            <Header />
            <div className="h-[calc(100vh_-_64px)] w-full bg-stone-100 p-1">
                <div className="m-auto flex w-full max-w-md flex-col gap-4 pt-3">
                    <div className="form-control w-full flex-row gap-2">
                        <select className="select-bordered select max-w-xs">
                            <option>전체</option>
                            <option value={'hospital'}>병원</option>
                            <option>etc</option>
                        </select>
                        <select
                            value={cityCD}
                            onChange={selectChange}
                            className="select-bordered select max-w-xs"
                        >
                            {cities?.map((city: any, index: number) => (
                                <option
                                    key={`${city.SIGUN_NM}_${index}`}
                                    value={city.SIGUN_CD}
                                >
                                    {city.SIGUN_NM}
                                </option>
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
                    {hospitals && <KakaoMap data={hospitals} />}
                </div>
            </div>
            <Footer />
        </div>
    )
}
