import { fetchApi } from './fetch'

const api = {
    getAreaCode() {
        return fetchApi({
            method: 'get',
            url: '/areaCode',
            params: {
                numOfRows: 17,
            },
        })
    },
    getFestival() {
        return fetchApi({
            method: 'get',
            url: '/searchFestival',
            params: {
                eventStartDate: new Date(),
            },
        })
    },
    getStay() {
        return fetchApi({
            method: 'get',
            url: '/searchStay',
        })
    },
    getFet() {
        return fetchApi({
            method: 'get',
            url: '/detailPetTour',
        })
    },
}

export default api
