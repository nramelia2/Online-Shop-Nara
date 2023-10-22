import FIREBASE from '../config/FIREBASE';
import { dispatchLoading, dispatchResult, dispatchError } from '../utils';

export const ADD_CART = 'ADD_CART';
export const GET_CART = 'GET_CART';
export const DELETE_CART = 'DELETE_CART';

export const addCart = data => {
    return dispatch => {
        dispatchLoading(dispatch, ADD_CART);

        //Cek data keranjang user sudah ada atau belum

        FIREBASE.database()
            .ref('carts/' + data.uid)
            .once('value', querySnapshot => {
                if (querySnapshot.val()) {
                    //Update Cart Utama
                    const mainCart = querySnapshot.val();
                    const newWeight =
                        parseInt(data.jumlah) * parseFloat(data.category.berat);
                    const newPrice =
                        parseInt(data.jumlah) * parseInt(data.category.harga);

                    FIREBASE.database()
                        .ref('carts')
                        .child(data.uid)
                        .update({
                            totalBerat: mainCart.totalBerat + newWeight,
                            totalHarga: mainCart.totalHarga + newPrice,
                        })
                        .then(response => {
                            //Simpan ke keranjang Detail
                            dispatch(cartDetail(data));
                        })
                        .catch(error => {
                            dispatchError(dispatch, ADD_CART, error);
                            alert(error);
                        });
                } else {
                    //Simpan Cart Utama
                    const mainCart = {
                        user: data.uid,
                        tanggal: new Date().toDateString(),
                        totalHarga: parseInt(data.jumlah) * parseInt(data.category.harga),
                        totalBerat: parseInt(data.jumlah) * parseFloat(data.category.berat),
                    };

                    FIREBASE.database()
                        .ref('carts')
                        .child(data.uid)
                        .set(mainCart)
                        .then(response => {
                            //Simpan ke keranjang Detail
                            dispatch(cartDetail(data));
                        })
                        .catch(error => {
                            dispatchError(dispatch, ADD_CART, error);
                            alert(error);
                        });
                }
            })
            .catch(error => {
                dispatchError(dispatch, ADD_CART, error);
                alert(error);
            });
    };
};

export const cartDetail = data => {
    return dispatch => {
        const pesanans = {
            product: data.category,
            jumlahPesan: data.jumlah,
            warna: data.warna,
            ukuran: data.ukuran,
            totalHarga: parseInt(data.jumlah) * parseInt(data.category.harga),
            totalBerat: parseInt(data.jumlah) * parseFloat(data.category.berat),
            information: data.information,
        };

        FIREBASE.database()
            .ref('carts/' + data.uid)
            .child('pesanans')
            .push(pesanans)
            .then(response => {
                dispatchResult(dispatch, ADD_CART, response ? response : []);
            })
            .catch(error => {
                dispatchError(dispatch, ADD_CART, error);
                alert(error);
            });
    };
};

export const getCart = id => {
    //hanya mengambil dari 1 keranjang, id itu uid yang didapat dari login yang akan diambil di local storage
    return dispatch => {
        dispatchLoading(dispatch, GET_CART);

        FIREBASE.database()
            .ref('carts/' + id)
            .once('value', querySnapshot => {
                let data = querySnapshot.val();

                //let dataItem = { ...data } // bisa menggunakan ini juga

                dispatchResult(dispatch, GET_CART, data);
            })

            .catch(error => {
                dispatchError(dispatch, GET_CART, error);
                alert(error);
            });
    };
};

export const deleteKeranjang = (id, mainCart, keranjang) => {
    return dispatch => {
        dispatchLoading(dispatch, DELETE_CART);

        const totalPriceNew = mainCart.totalHarga - keranjang.totalHarga;
        const totalWeightNew = mainCart.totalBerat - keranjang.totalBerat;

        if (totalPriceNew === 0) {
            //hapus main cart dan detail

            FIREBASE.database()
                .ref('carts')
                .child(mainCart.user)
                .remove()
                .then(response => {
                    dispatchResult(dispatch, DELETE_CART, 'Cart successfully removed.');
                })
                .catch(error => {
                    dispatchError(dispatch, DELETE_CART, error);
                    alert(error);
                });
        } else {
            //update total harga dan total berat main cart
            FIREBASE.database()
                .ref('carts')
                .child(mainCart.user)
                .update({
                    totalBerat: totalWeightNew,
                    totalHarga: totalPriceNew,
                })
                .then(response => {
                    //hapus pesanan detail
                    dispatch(deleteKeranjangDetail(id, mainCart));
                })
                .catch(error => {
                    dispatchError(dispatch, DELETE_CART, error);
                    alert(error);
                });
        }
    };
};

export const deleteKeranjangDetail = (id, mainCart) => {
    return dispatch => {
        FIREBASE.database()
            .ref('carts/' + mainCart.user)
            .child('pesanans')
            .child(id)
            .remove()
            .then(response => {
                dispatchResult(dispatch, DELETE_CART, 'Cart successfully removed.');
            })
            .catch(error => {
                dispatchError(dispatch, DELETE_CART, error);
                alert(error);
            });
    };
};
