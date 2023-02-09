import React, { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import hospitalImg from '@/public/building-hospital.svg'
import pin from '@/public/map-pin-filled.svg'

interface MapProps {
    data: {
        name: string
        phone: string
        address: string
        zip: string
        lat: string
        lng: string
    }[]
}

const KakaoMap: FC<MapProps> = ({ data }) => {
    useEffect(() => {
        const mapScript = document.createElement('script')

        mapScript.async = true
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`

        document.head.appendChild(mapScript)

        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const container = document.getElementById('map')
                const options = {
                    center: new window.kakao.maps.LatLng(
                        data[0].lat,
                        data[0].lng
                    ),
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

                data.forEach((v) => {
                    const marker = new window.kakao.maps.Marker({
                        map: map,
                        position: new window.kakao.maps.LatLng(v.lat, v.lng),
                        clickable: true,
                        // image: markerImage,
                    })

                    // 마커를 클릭했을 때 마커 위에 표시할 인포윈도우를 생성합니다
                    const iwContent = `
                    <div style="padding:5px; height:fit-content;">
                        <P>${v.name}</P>
                        <p>${v.address}</p>
                        <p>${v.phone}</p>
                        <p> </p>
                    </div>` // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                    const iwRemoveable = true // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

                    // 인포윈도우를 생성합니다
                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: iwContent,
                        removable: iwRemoveable,
                    })

                    // 마커에 클릭이벤트를 등록합니다
                    window.kakao.maps.event.addListener(
                        marker,
                        'click',
                        function () {
                            // 마커 위에 인포윈도우를 표시합니다
                            infowindow.open(map, marker)
                        }
                    )
                })
            })
        }
        mapScript.addEventListener('load', onLoadKakaoMap)

        return () => mapScript.removeEventListener('load', onLoadKakaoMap)
    }, [data])

    return <div id="map" className="h-[calc(100vh_-_158px)] w-full"></div>
}

export default KakaoMap
