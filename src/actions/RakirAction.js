import axios from 'axios';
import {
    API_HEADER_RAJAONGKIR,
    API_RAJAONGKIR,
    API_TOMEOUT,
    API_HEADER_RAJAONGKIR_COST,
    ORIGIN_CITY,
} from '../utils/constant';
import { dispatchLoading, dispatchResult, dispatchError } from '../utils';

export const GET_PROVINCE = 'GET_PROVINCE';
export const GET_CITY = 'GET_CITY';
export const GET_CITY_DETAIL = 'GET_CITY_DETAIL';
export const POST_ONGKIR = 'POST_ONGKIR';

//membuat arrow fuction
export const ListProvinsi = () => {
    return dispatch => {
        //loading
        dispatchLoading(dispatch, GET_PROVINCE);

        axios({
            method: 'get', //terlihat di dokumentasi raja ongkis
            url: API_RAJAONGKIR + 'province',
            timeout: API_TOMEOUT,
            headers: API_HEADER_RAJAONGKIR,
        })
            .then(response => {
                if (response.status !== 200) {
                    dispatchError(dispatch, GET_PROVINCE, error.message);
                } else {
                    dispatchResult(
                        dispatch,
                        GET_PROVINCE,
                        response.data ? response.data.rajaongkir.results : [],
                    );
                }
            })
            .catch(error => {
                dispatchError(dispatch, GET_PROVINCE, error);

                alert(error);
            });
    };
};

//then, jika berhasil
//catch, jika eror

export const ListKota = provinsi_id => {
    return dispatch => {
        //loading
        dispatchLoading(dispatch, GET_CITY);

        axios({
            method: 'get', //terlihat di dokumentasi raja ongkis
            url: API_RAJAONGKIR + 'city?province=' + provinsi_id,
            timeout: API_TOMEOUT,
            headers: API_HEADER_RAJAONGKIR,
        })
            .then(response => {
                if (response.status !== 200) {
                    dispatchError(dispatch, GET_CITY, response);
                } else {
                    dispatchResult(
                        dispatch,
                        GET_CITY,
                        response.data ? response.data.rajaongkir.results : [],
                    );
                }
            })
            .catch(error => {
                dispatchError(dispatch, GET_CITY, error);

                alert(error);
            });
    };
};

export const getCityDetail = kota_id => {
    return dispatch => {
        //loading
        dispatchLoading(dispatch, GET_CITY_DETAIL);

        axios({
            method: 'get', //terlihat di dokumentasi raja ongkis
            url: API_RAJAONGKIR + 'city?id=' + kota_id,
            timeout: API_TOMEOUT,
            headers: API_HEADER_RAJAONGKIR,
        })
            .then(response => {
                if (response.status !== 200) {
                    dispatchError(dispatch, GET_CITY_DETAIL, response);
                } else {
                    dispatchResult(
                        dispatch,
                        GET_CITY_DETAIL,
                        response.data ? response.data.rajaongkir.results : [],
                    );
                }
            })
            .catch(error => {
                dispatchError(dispatch, GET_CITY_DETAIL, error);

                alert(error);
            });
    };
};

export const postOngkir = (data, ekspedisi) => {
    return dispatch => {
        dispatchLoading(dispatch, POST_ONGKIR);

        const formData = new URLSearchParams();
        formData.append('origin', ORIGIN_CITY);
        formData.append('destination', data.profile.kota); //--> destination data.profile.kota
        // --> berat => data.totalBerat
        formData.append(
            'weight',
            data.totalBerat < 1 ? 1000 : data.totalBerat * 1000,
        );
        //--> courier => ekspedisi.kurir
        formData.append('courier', ekspedisi.kurir);

        axios({
            method: 'POST',
            url: API_RAJAONGKIR + 'cost',
            timeout: API_TOMEOUT,
            headers: API_HEADER_RAJAONGKIR_COST,
            data: formData,
        })
            .then(response => {
                if (response.status !== 200) {
                    dispatchError(dispatch, POST_ONGKIR, response);
                } else {
                    const ongkirs = response.data.rajaongkir.results[0].costs;
                    const chooseOngkir = ongkirs
                        .filter(ongkir => ongkir.service === ekspedisi.service)
                        .map(filterOngkir => {
                            return filterOngkir;
                        });

                    dispatchResult(dispatch, POST_ONGKIR, chooseOngkir[0]);
                }
            })
            .catch(error => {
                dispatchError(dispatch, POST_ONGKIR, error);

                alert(error);
            });
    };
};
