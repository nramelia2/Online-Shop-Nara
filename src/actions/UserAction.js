export const GET_USER = 'GET_USER';

//membuat arrow fuction
export const getUser = () => {
    return dispatch => {
        dispatch({
            type: GET_USER,
            payload: {
                nama: 'Ferran',
                email: 'ferrantorres@gmail.com',
            },
        });
    };
};
