import FIREBASE from '../config/FIREBASE';
import { storeData } from '../utils';
import { dispatchLoading, dispatchResult, dispatchError } from '../utils';

export const UPDATE_PROFILE = 'UPDATE_PROFILE'; //memakai export biar bisa diakses diluar file
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const updateProfile = data => {
    return dispatch => {
        dispatchLoading(dispatch, UPDATE_PROFILE);

        const newData = {
            uid: data.uid,
            name: data.name,
            email: data.email,
            alamat: data.alamat,
            numberphone: data.numberphone,
            kota: data.kota,
            provinsi: data.provinsi,
            status: 'user',
            avatar: data.updateAvatar
                ? data.avatarForDB
                : data.oldAvatar
                    ? data.oldAvatar
                    : 'https://firebasestorage.googleapis.com/v0/b/pemrograman-mobile-7955e.appspot.com/o/profile%2Fdefault.png?alt=media&token=3ad1cf10-43bd-4630-b647-a5d4f0988682',
        };

        //memakai realtime database untuk update data
        FIREBASE.database()
            .ref('users/' + newData.uid)
            .update(newData)
            .then(response => {
                dispatchResult(dispatch, UPDATE_PROFILE, response ? response : []);

                //Simpan ke local storage, menggunakan (Async Storage)
                storeData('user', newData);
            })
            .catch(error => {
                dispatchError(dispatch, UPDATE_PROFILE, error.message);

                alert(error.message);
            });
    };
};

export const changePassword = data => {
    return dispatch => {
        dispatchLoading(dispatch, CHANGE_PASSWORD);

        //Cek email dan password
        FIREBASE.auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(response => {
                //jika sukses maka password akan terupdate
                const user = FIREBASE.auth().currentUser;

                user
                    .updatePassword(data.newPassword)
                    .then(() => {
                        // Update successful.
                        dispatchResult(
                            dispatch,
                            CHANGE_PASSWORD,
                            'Change the password successfully.',
                        );
                    })
                    .catch(error => {
                        // An error ocurred
                        // ...
                        dispatchError(dispatch, CHANGE_PASSWORD, error.message);
                    });
            })
            .catch(error => {
                dispatchError(dispatch, CHANGE_PASSWORD, error.message);

                alert(error);
            });
    };
};
