//berupa perulangan

import React from 'react';
import { View } from 'react-native';
import CardMenu from '../../kecil/CardMenu';

const ListProfile = ({ menus, navigation }) => {
    //menus ada 4 object
    return (
        <View>
            {menus.map(menu => {
                return <CardMenu menu={menu} key={menu.id} navigation={navigation} />;
            })}
        </View>
    );
};

export default ListProfile;
