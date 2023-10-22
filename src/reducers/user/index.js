import { GET_USER } from '../../actions/UserAction';

const initialState = {
    dataUser: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            console.log("Masuk Reducer : ", action)
            return {
                ...state, //jika ada state lain
                dataUser: action.payload
            }
        default:
            return state
    }
}

