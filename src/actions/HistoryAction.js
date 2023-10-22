import FIREBASE from '../config/FIREBASE';
import {
    dispatchLoading,
    dispatchResult,
    dispatchError,
    API_TOMEOUT,
    URL_MIDTRANS_STATUS,
    HEADER_MIDTRANS,
} from '../utils';

import axios from 'axios';

export const GET_HISTORY = 'GET_HISTORY';
export const UPDATE_STATUS = 'UPDATE_STATUS';

export const getHistory = uid => {
    return dispatch => {
        dispatchLoading(dispatch, GET_HISTORY);

        FIREBASE.database()
            .ref('historys')
            .orderByChild('user') //user yang berdasarkan uid
            .equalTo(uid)
            .once('value', querySnapshot => {
                let data = querySnapshot.val(); //bisa juga make if

                dispatchResult(dispatch, GET_HISTORY, data);
            })
            .catch(error => {
                dispatchError(dispatch, GET_HISTORY, error);

                alert(error);
            });
    };
};

export const updateStatus = order_id => {
    return dispatch => {
        dispatchLoading(dispatch, UPDATE_STATUS);

        axios({
            method: 'GET',
            url: URL_MIDTRANS_STATUS + `${order_id}/status`,
            headers: HEADER_MIDTRANS,
            timeout: API_TOMEOUT,
        })
            .then(response => {
                const status =
                    response.data.transaction_status === 'settlement' ||
                        response.data.transaction_status === 'capture'
                        ? 'moons'
                        : response.data.transaction_status
                            ? response.data.transaction_status
                            : 'pending';

                //Update Data History di DATABASE
                FIREBASE.database()
                    .ref('historys')
                    .child(order_id)
                    .update({
                        status: status
                    })
                    .then((response) => {
                        dispatchResult(dispatch, UPDATE_STATUS, response ? response : [])
                    })
                    .catch(error => {
                        dispatchError(dispatch, UPDATE_STATUS, error);

                        alert(error);
                    });
            })
            .catch(error => {
                dispatchError(dispatch, UPDATE_STATUS, error);

                alert(error);
            });
    };
};
