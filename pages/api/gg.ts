import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://openapi.gg.go.kr',
})

const baseInstance = {
    Key: process.env.NEXT_PUBLIC_GG_KEY,
    Type: 'json',
}

interface IFetchApiProps {
    method: string
    url: string
    params?: object
}

export const fetchGgApi = async ({ method, url, params }: IFetchApiProps) => {
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
                url: `${url}?Key=${process.env.NEXT_PUBLIC_GG_KEY}&Type=json`,
                data: params,
            }).then((res) => res.data)
        }
    } catch (error) {
        console.error(error)
    }
}
