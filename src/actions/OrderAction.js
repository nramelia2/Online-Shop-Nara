import FIREBASE from '../config/FIREBASE';
import { dispatchLoading, dispatchResult, dispatchError } from '../utils';

export const UPDATE_ORDER = 'UPDATE_ORDER';

//menggunakan nested
export const updateOrder = params => {
    return dispatch => {
        dispatchLoading(dispatch, UPDATE_ORDER);

        //get user (uid) mendapatkannya dari order_id
        const uid = params.order_id.split('-')[2]; //split untuk memisahkan order_id,

        //get cart by uid user
        FIREBASE.database()
            .ref('carts/' + uid)
            .once('value', querySnapshot => {
                if (querySnapshot.val()) {
                    //mengambil data keranjang
                    const data = querySnapshot.val();
                    //memodifikasi data keranjang
                    const newData = { ...data };
                    newData.ongkir = params.ongkir;
                    newData.estimasi = params.estimasi;
                    newData.url = params.url;
                    newData.order_id = params.order_id;
                    newData.status = 'pending';

                    //delete data cart
                    FIREBASE.database()
                        .ref('carts/' + uid)
                        .remove()
                        .then(() => {
                            //add newData history
                            FIREBASE.database()
                                .ref('historys')
                                .child(params.order_id)
                                .set(newData)
                                .then(response => {
                                    dispatchResult(
                                        dispatch,
                                        UPDATE_ORDER,
                                        response ? response : [],
                                    );
                                })
                                .catch(error => {
                                    dispatchError(dispatch, UPDATE_ORDER, error);

                                    alert(error);
                                });
                        })
                        .catch(error => {
                            dispatchError(dispatch, UPDATE_ORDER, error);

                            alert(error);
                        });
                }
            })
            .catch(error => {
                dispatchError(dispatch, UPDATE_ORDER, error);

                alert(error);
            });
    };
};
