import { combineReducers } from 'redux';
import UserReducer from './user';
import ReducerRakir from './rajaongkir';
import AuthenticationReducer from './authentication';
import ProfileReducer from './profile';
import CategorysReducer from './categorys';
import FashionReducer from './fashions';
import cartReducer from './cart';
import PaymentReducer from './payment';
import OrderReducer from './order';
import HistoryReducer from './history';

const rootReducer = combineReducers({
    UserReducer,
    ReducerRakir,
    AuthenticationReducer,
    ProfileReducer,
    CategorysReducer,
    FashionReducer,
    cartReducer,
    PaymentReducer,
    OrderReducer,
    HistoryReducer,
})

export default rootReducer

//combineReducers - untuk mengkombinasikan banyak file menjadi satu.