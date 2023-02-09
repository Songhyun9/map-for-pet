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
    getHospital(pIndex: number, pSize: number, cityCD: string) {
        return fetchGgApi({
            method: 'get',
            url: '/Animalhosptl',
            params: {
                pIndex: pIndex,
                pSize: pSize,
                SIGUN_CD: cityCD,
            },
        })
    },
    getPhamacy(pIndex: number, pSize: number, cityCD: string) {
        return fetchGgApi({
            method: 'get',
            url: 'AnimalPharmacy',
            params: {
                pIndex: pIndex,
                pSize: pSize,
                SIGUN_CD: cityCD,
            },
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
