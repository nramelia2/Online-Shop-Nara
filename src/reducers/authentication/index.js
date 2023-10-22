import { REGISTER_USER, LOGIN_USER } from '../../actions/AuthenticationAction'

const initialState = {
    registerLoading: false,
    registerResult: false,
    registerError: false,

    loginLoading: false,
    loginResult: false,
    loginError: false,

}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_USER:
            return {
                ...state, //jika ada state lain
                registerLoading: action.payload.loading, //didapat dari RakirAction.js
                registerResult: action.payload.data,
                registerError: action.payload.errorMessage
            }

        case LOGIN_USER:
            return {
                ...state, //jika ada state lain
                loginLoading: action.payload.loading, //didapat dari RakirAction.js
                loginResult: action.payload.data,
                loginError: action.payload.errorMessage
            }



        default:
            return state
    }
}

