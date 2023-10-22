import FIREBASE from '../config/FIREBASE';
import { storeData } from '../utils';
import { dispatchLoading, dispatchResult, dispatchError } from '../utils';

export const REGISTER_USER = 'REGISTER_USER';
export const LOGIN_USER = 'LOGIN_USER';

export const registerUser = (data, password) => {
    return dispatch => {
        //Loading
        dispatchLoading(dispatch, REGISTER_USER);

        FIREBASE.auth()
            .createUserWithEmailAndPassword(data.email, password)
            .then(success => {
                // Signed in
                // ...
                //ambil uid, buat newData (data+uid)
                const newData = {
                    ...data, //ies6, untuk menggabungkan data
                    uid: success.user.uid,
                };

                //Simpan ke Realtime Database Firebase
                FIREBASE.database()
                    .ref('users/' + success.user.uid)
                    .set(newData);

                //sukses
                dispatchResult(dispatch, REGISTER_USER, newData);

                //Simpan ke local storage, menggunakan (Async Storage)
                storeData('user', newData);
            })
            .catch(error => {
                // ..

                dispatchError(dispatch, REGISTER_USER, error.message);

                alert(error.message);
            });
    };
};

export const loginUser = (email, password) => {
    //console.log('Masuk Action', email + ' ' + password);
    return dispatch => {
        dispatchLoading(dispatch, LOGIN_USER);

        FIREBASE.auth()
            .signInWithEmailAndPassword(email, password)
            .then(success => {
                // Signed In

                FIREBASE.database()
                    .ref('/users/' + success.user.uid)
                    .once('value')
                    .then(resDB => {
                        if (resDB.val()) {
                            dispatchResult(dispatch, LOGIN_USER, resDB.val());

                            //Simpan ke local storage, menggunakan (Async Storage)
                            storeData('user', resDB.val());
                        } else {
                            //EROR
                            dispatch({
                                type: LOGIN_USER,
                                payload: {
                                    loading: false,
                                    data: false,
                                    errorMessage: 'User data does not exist.',
                                },
                            });

                            alert('User data does not exist.');
                        }
                    });
            })
            .catch(error => {
                console.log('Error : ', error);
                dispatchError(dispatch, LOGIN_USER, error.message);

                alert(error.message);
            });
    };
};
