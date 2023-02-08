import { fetchGgApi } from './gg'
import { fetchTourApi } from './tour'

const api = {
    getAreaCode() {
        return fetchTourApi({
            method: 'get',
            url: '/areaCode',
            params: {
                numOfRows: 17,
            },
        })
    },
    getFestival() {
        return fetchTourApi({
            method: 'get',
            url: '/searchFestival',
            params: {
                eventStartDate: new Date(),
            },
        })
    },
    getStay() {
        return fetchTourApi({
            method: 'get',
            url: '/searchStay',
        })
    },
    getHospital() {
        return fetchGgApi({
            method: 'get',
            url: '/Animalhosptl',
        })
    },
    getCityList() {
        return fetchGgApi({
            method: 'get',
            url: '/Bysigunbasis',
        })
    },
}

export default api
