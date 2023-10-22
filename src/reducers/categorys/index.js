import { GET_CATEGORY, GET_DETAIL_CATEGORY } from '../../actions/CategoryAction';

const initialState = {
    getCategoryLoading: false,
    getCategoryResult: false,
    getCategoryError: false,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state, //jika ada state lain
                getCategoryLoading: action.payload.loading, //didapat dari RakirAction.js
                getCategoryResult: action.payload.data,
                getCategoryError: action.payload.errorMessage
            }

        default:
            return state
    }
}

