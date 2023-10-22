import { GET_HISTORY, UPDATE_STATUS } from '../../actions/HistoryAction';

const initialState = {
    getHistoryLoading: false,
    getHistoryResult: false,
    getHistoryError: false,

    updateStatusCartLoading: false,
    updateStatusCartResult: false,
    updateStatusCartError: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_HISTORY:
            return {
                ...state,
                getHistoryLoading: action.payload.loading,
                getHistoryResult: action.payload.data,
                getHistoryError: action.payload.errorMessage,
            };

        case UPDATE_STATUS:
            return {
                ...state,
                updateStatusCartLoading: action.payload.loading,
                updateStatusCartResult: action.payload.data,
                updateStatusCartError: action.payload.errorMessage,
            };

        default:
            return state;
    }
}
