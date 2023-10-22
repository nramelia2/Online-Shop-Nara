import axios from 'axios';
import { API_TOMEOUT, URL_MIDTRANS, HEADER_MIDTRANS } from '../utils/constant';
import { dispatchLoading, dispatchResult, dispatchError } from '../utils';

export const SNAP_TRANSACTIONS = 'SNAP_TRANSACTION';

export const snapTransactions = data => {
    return dispatch => {
        dispatchLoading(dispatch, SNAP_TRANSACTIONS);
        axios({
            method: 'POST',
            url: URL_MIDTRANS + 'transactions', //ditambah transaction karena dalam url midtrans yang ada di const tidak ada , tetapi dalam postman ada
            headers: HEADER_MIDTRANS,
            data: data,
            timeout: API_TOMEOUT,
        })
            .then(function (response) {
                dispatchResult(dispatch, SNAP_TRANSACTIONS, response.data);
            })
            .catch(function (error) {
                dispatchError(dispatch, SNAP_TRANSACTIONS, error);

                alert(error);
            });
    };
};
