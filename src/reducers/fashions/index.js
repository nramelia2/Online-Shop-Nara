import { GET_FASHION, GET_CATEGORY_TO_STORE, DELETE_FASHION, SAVE_KEYWORD_FASHION } from '../../actions/FashionAction';

const initialState = {
    getFashionLoading: false,
    getFashionResult: false,
    getFashionError: false,

    idCategory: false,
    namaCategory: false,

    keyword: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FASHION:
            return {
                ...state, //jika ada state lain
                getFashionLoading: action.payload.loading, //didapat dari RakirAction.js
                getFashionResult: action.payload.data,
                getFashionError: action.payload.errorMessage
            }

        case GET_CATEGORY_TO_STORE:
            console.log("Masuk Reducer")
            return {
                ...state,
                idCategory: action.payload.idCategory,
                namaCategory: action.payload.namaCategory,
            }

        case DELETE_FASHION:
            console.log("Masuk Reducer")
            return {
                ...state,
                idCategory: false,
                namaCategory: false,
                keyword: false, //untuk menghapus history
            }

        case SAVE_KEYWORD_FASHION:
            return {
                ...state,
                keyword: action.payload.data
            }

        default:
            return state
    }
}

