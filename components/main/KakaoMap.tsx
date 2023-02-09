import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import hospitalImg from '@/public/building-hospital.svg'
import pin from '@/public/map-pin-filled.svg'

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
                const imageSrc = hospitalImg.src // 마커이미지의 주소입니다
                const imageSize = new window.kakao.maps.Size(35, 35) // 마커이미지의 크기입니다
                const imageOption = {
                    offset: new window.kakao.maps.Point(27, 69),
                } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

                const markerImage = new window.kakao.maps.MarkerImage(
                    imageSrc,
                    imageSize,
                    imageOption
                )

                const markerPosition = new window.kakao.maps.LatLng(
                    latitude,
                    longitude
                )
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition,
                    // image: markerImage,
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
