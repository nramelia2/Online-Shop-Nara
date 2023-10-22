import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    Home,
    Splash,
    ListStore,
    Profile,
    FashionDetail,
    Keranjang,
    CheckOut,
    EditProfile,
    ChangePassword,
    History,
    Register1,
    Register2,
    ScanCamera,
    About,
    Midtrans,
} from '../pages';
import { BottomNavigator } from '../components';
import Login from '../pages/HalamanLogin';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }} />
            <Tab.Screen
                name="ListStore"
                component={ListStore}
                options={{ headerShown: false, title: 'Explore' }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
        </Tab.Navigator>
    );
};

const Router = () => {
    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MainApp"
                component={MainApp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="FashionDetail"
                component={FashionDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Keranjang"
                component={Keranjang}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CheckOut"
                component={CheckOut}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="History"
                component={History}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register1"
                component={Register1}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register2"
                component={Register2}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ScanCamera"
                component={ScanCamera}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={{ headerShown: false }} />
            <Stack.Screen
                name="Midtrans"
                component={Midtrans}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default Router;
