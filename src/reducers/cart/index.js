import { ADD_CART, GET_CART, DELETE_CART } from '../../actions/CartAction';

const initialState = {
    saveCartLoading: false,
    saveCartResult: false,
    saveCartError: false,

    getCartLoading: false,
    getCartResult: false,
    getCartError: false,

    deleteCartLoading: false,
    deleteCartResult: false,
    deleteCartError: false,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_CART:
            return {
                ...state, //jika ada state lain
                saveCartLoading: action.payload.loading, //didapat dari RakirAction.js
                saveCartResult: action.payload.data,
                saveCartError: action.payload.errorMessage
            }

        case GET_CART:
            return {
                ...state, //jika ada state lain
                getCartLoading: action.payload.loading, //didapat dari RakirAction.js
                getCartResult: action.payload.data,
                getCartError: action.payload.errorMessage
            }

        case DELETE_CART:
            return {
                ...state, //jika ada state lain
                deleteCartLoading: action.payload.loading, //didapat dari RakirAction.js
                deleteCartResult: action.payload.data,
                deleteCartError: action.payload.errorMessage
            }

        default:
            return state
    }
}

