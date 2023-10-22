import { GET_PROVINCE, GET_CITY, GET_CITY_DETAIL, POST_ONGKIR } from '../../actions/RakirAction';

const initialState = {
    ProvinceLoading: false,
    ProvinceResult: false,
    ProvinceError: false,

    CityLoading: false,
    CityResult: false,
    CityError: false,

    CityDetailLoading: false,
    CityDetailResult: false,
    CityDetailError: false,

    ongkirLoading: false,
    ongkirResult: false,
    ongkirError: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PROVINCE:
            return {
                ...state, //jika ada state lain
                ProvinceLoading: action.payload.loading, //didapat dari RakirAction.js
                ProvinceResult: action.payload.data,
                ProvinceError: action.payload.errorMessage
            }

        case GET_CITY:
            return {
                ...state, //jika ada state lain
                CityLoading: action.payload.loading, //didapat dari RakirAction.js
                CityResult: action.payload.data,
                CityError: action.payload.errorMessage
            }

        case GET_CITY_DETAIL:
            return {
                ...state, //jika ada state lain
                CityDetailLoading: action.payload.loading, //didapat dari RakirAction.js
                CityDetailResult: action.payload.data,
                CityDetailError: action.payload.errorMessage
            }

        case POST_ONGKIR:
            return {
                ...state, //jika ada state lain
                ongkirLoading: action.payload.loading, //didapat dari RakirAction.js
                ongkirResult: action.payload.data,
                ongkirError: action.payload.errorMessage
            }

        default:
            return state
    }
}

