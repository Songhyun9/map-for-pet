import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://apis.data.go.kr/B551011/KorService',
})

const baseInstance = {
    serviceKey: process.env.NEXT_PUBLIC_TOUR_DECODING_KEY,
    MobileOS: 'ETC',
    MobileApp: 'AppTest',
    _type: 'json',
}

interface IFetchApiProps {
    method: string
    url: string
    params?: object
}

export const fetchTourApi = async ({ method, url, params }: IFetchApiProps) => {
    try {
        if (method === 'get') {
            return await axiosInstance
                .get(url, {
                    params: {
                        ...baseInstance,
                        ...params,
                    },
                })
                .then((res) => res.data)
        } else {
            return await axiosInstance({
                method: method,
                url: `${url}?serviceKey=${process.env.NEXT_PUBLIC_TOUR_DECODING_KEY}&MobileOS=ETC&MobileApp=AppTest&_type=json`,
                data: params,
            }).then((res) => res.data)
        }
    } catch (error) {
        console.error(error)
    }
}
