import { UPDATE_PROFILE, CHANGE_PASSWORD } from '../../actions/profileAction';

const initialState = {
    updateProfileLoading: false,
    updateProfileResult: false,
    updateProfileError: false,

    changePasswordLoading: false,
    changePasswordResult: false,
    changePasswordError: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case UPDATE_PROFILE:
            return {
                ...state, //jika ada state lain
                updateProfileLoading: action.payload.loading, //didapat dari RakirAction.js
                updateProfileResult: action.payload.data,
                updateProfileError: action.payload.errorMessage
            }

        case CHANGE_PASSWORD:
            return {
                ...state, //jika ada state lain
                changePasswordLoading: action.payload.loading, //didapat dari RakirAction.js
                changePasswordResult: action.payload.data,
                changePasswordError: action.payload.errorMessage
            }

        default:
            return state
    }
}

