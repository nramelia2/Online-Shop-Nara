import FIREBASE from '../config/FIREBASE';
import { dispatchLoading, dispatchResult, dispatchError } from '../utils';

export const GET_FASHION = 'GET_FASHION';
export const GET_CATEGORY_TO_STORE = 'GET_CATEGORY_TO_STORE';
export const DELETE_FASHION = 'DELETE_FASHION'; //menghapus parameter, agar fashion tampil semua
export const SAVE_KEYWORD_FASHION = 'SAVE_KEYWORD_FASHION';

export const getFashion = (idCategory, keyword) => {
    return dispatch => {
        dispatchLoading(dispatch, GET_FASHION);
        if (idCategory) {
            FIREBASE.database()
                .ref('fashion')
                .orderByChild('category')
                .equalTo(idCategory) //jika sama
                .once('value', querySnapshot => {
                    let data = querySnapshot.val() ? querySnapshot.val() : [];

                    //let dataItem = { ...data } // bisa menggunakan ini juga

                    dispatchResult(dispatch, GET_FASHION, data);
                })

                .catch(error => {
                    dispatchError(dispatch, GET_FASHION, error);

                    alert(error);
                });
        } else if (keyword) {
            FIREBASE.database()
                .ref('fashion')
                .orderByChild('klasifikasi')
                .equalTo(keyword.toUpperCase()) //jika sama dan di firebase hanya bisa memakai equalTo
                .once('value', querySnapshot => {
                    let data = querySnapshot.val() ? querySnapshot.val() : [];

                    //let dataItem = { ...data } // bisa menggunakan ini juga

                    dispatchResult(dispatch, GET_FASHION, data);
                })

                .catch(error => {
                    dispatchError(dispatch, GET_FASHION, error);

                    alert(error);
                });
        } else {
            FIREBASE.database()
                .ref('fashion')
                .once('value', querySnapshot => {
                    let data = querySnapshot.val() ? querySnapshot.val() : [];

                    //let dataItem = { ...data } // bisa menggunakan ini juga

                    dispatchResult(dispatch, GET_FASHION, data);
                })

                .catch(error => {
                    dispatchError(dispatch, GET_FASHION, error);

                    alert(error);
                });
        }
    };
};

export const favoriteFashion = () => {
    return dispatch => {
        dispatchLoading(dispatch, GET_FASHION);

        FIREBASE.database()
            .ref('fashion')
            .limitToLast(4)
            .once('value', querySnapshot => {
                let data = querySnapshot.val() ? querySnapshot.val() : [];

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, GET_FASHION, data);
            })

            .catch(error => {
                dispatchError(dispatch, GET_FASHION, error);

                alert(error);
            });
    };
};

export const getCategoryToStore = (id, namaCategory) => ({
    type: GET_CATEGORY_TO_STORE,
    payload: {
        idCategory: id,
        namaCategory: namaCategory,
    },
});

export const deleteFashion = () => ({
    type: DELETE_FASHION,
});

export const saveKeywordFashion = search => ({
    type: SAVE_KEYWORD_FASHION,
    payload: {
        data: search,
    },
});
