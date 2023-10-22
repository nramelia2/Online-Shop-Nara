import FIREBASE from '../config/FIREBASE';
import { storeData } from '../utils';
import { dispatchLoading, dispatchResult, dispatchError } from '../utils';

export const GET_CATEGORY = 'GET_CATEGORY';

export const getCategory = () => {
    return dispatch => {
        dispatchLoading(dispatch, GET_CATEGORY);

        FIREBASE.database()
            .ref('category')
            .once('value', querySnapshot => {
                let data = querySnapshot.val() ? querySnapshot.val() : [];

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, GET_CATEGORY, data);
            })

            .catch(error => {
                dispatchError(dispatch, GET_CATEGORY, error);

                alert(error);
            });
    };
};
