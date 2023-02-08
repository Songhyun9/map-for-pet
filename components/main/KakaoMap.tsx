import React, { FC, useEffect, useState } from 'react'

interface MapProps {
    latitude: number
    longitude: number
}

const KakaoMap: FC<MapProps> = ({ longitude, latitude }) => {
    useEffect(() => {
        const mapScript = document.createElement('script')

        mapScript.async = true
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`

        document.head.appendChild(mapScript)

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map')
                const options = {
                    center: new window.kakao.maps.LatLng(latitude, longitude),
                }
                const map = new window.kakao.maps.Map(container, options)
                const markerPosition = new window.kakao.maps.LatLng(
                    latitude,
                    longitude
                )
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                })
                marker.setMap(map)
            })
        }
        mapScript.addEventListener('load', onLoadKakaoMap)

        return () => mapScript.removeEventListener('load', onLoadKakaoMap)
    }, [latitude, longitude])

    return <div id="map" className="h-[calc(100vh_-_158px)] w-full"></div>
}

export default KakaoMap
