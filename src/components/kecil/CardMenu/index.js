import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearStroge, colors, fonts, responsiveHeight } from '../../../utils';
import FIREBASE from '../../../config/FIREBASE';

const CardMenu = ({ menu, navigation }) => {
    //hanya 1 object

    const onSubmit = () => {
        if (menu.halaman === 'Login') {
            FIREBASE.auth()
                .signOut()
                .then(() => {
                    // Sign-out successful.

                    clearStroge();
                    navigation.replace('Login');
                })
                .catch(error => {
                    // An error happened.

                    alert(error);
                });
        } else {
            navigation.navigate(menu.halaman);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={() => onSubmit()}>
            <View style={styles.edit}>
                {menu.gambar}
                <Text style={styles.text}>{menu.nama}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default CardMenu;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        backgroundColor: colors.warnaScreen,
        marginHorizontal: 30,
        padding: responsiveHeight(15),
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
        marginLeft: 20,
    },
    edit: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
