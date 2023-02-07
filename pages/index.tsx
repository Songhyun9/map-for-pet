import Footer from '@/components/main/Footer'
import Header from '@/components/main/Header'
import KakaoMap from '@/components/main/KakaoMap'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function Home() {
    return (
        <div className="min-w-screen h-full min-h-screen w-full overflow-hidden">
            <Header />
            <div className="h-[calc(100vh_-_64px)] w-full bg-stone-100 p-1">
                <div className="m-auto flex w-full max-w-md flex-col gap-4 pt-3">
                    <div className="form-control w-full">
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
