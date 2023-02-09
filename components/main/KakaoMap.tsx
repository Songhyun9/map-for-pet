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

                    const cardWrapper = document.createElement('div')
                    cardWrapper.className = 'card w-96 bg-base-100 shadow-xl'

                    const cardBody = document.createElement('div')
                    cardBody.className = 'card-body'

                    const btnWrapper = document.createElement('div')
                    btnWrapper.className = 'card-actions justify-end'

                    const btn = document.createElement('button')
                    btn.className = 'btn btn-square btn-sm'
                    btn.onclick = function closeOverlay() {
                        customOverlay.setMap(null)
                    }
                    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`

                    const content = document.createElement('div')
                    content.innerHTML = `
                    <P class="break-words whitespace-pre-line font-bold">${v.name}</P>
                    <p class="break-words whitespace-pre-line">${v.address}</p>
                    <p class="break-words whitespace-pre-line">${v.phone}</p>
                    `

                    btnWrapper.appendChild(btn)
                    cardBody.appendChild(btnWrapper)
                    cardBody.appendChild(content)
                    cardWrapper.appendChild(cardBody)

                    var customOverlay = new window.kakao.maps.CustomOverlay({
                        clickable: true,
                        position: new window.kakao.maps.LatLng(v.lat, v.lng),
                        xAnchor: 0.5,
                        yAnchor: 1,
                        zIndex: 3,
                    })

                    customOverlay.setContent(cardWrapper)

                    // 마커에 클릭이벤트를 등록합니다
                    window.kakao.maps.event.addListener(
                        marker,
                        'click',
                        function () {
                            // 마커 위에 인포윈도우를 표시합니다
                            customOverlay.setMap(map)
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
