import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const CardAlamat = ({ alamat, provinsi, kota, navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.judulAlamat}>My Address </Text>
            <Text>
                {alamat}, {kota}
            </Text>

            <Text>{provinsi}</Text>

            <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.ubahAlamat}>Change Address</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CardAlamat;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.warnaScreen,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        marginTop: 10,
        padding: 15,
        marginTop: 10,
    },
    judulAlamat: {
        fontSize: 15,
        fontFamily: fonts.primary.regular,
        color: colors.warnaBlack,
        marginBottom: 5,
    },
    ubahAlamat: {
        textAlign: 'right',
        fontSize: 14,
        fontFamily: fonts.primary.bold,
        color: colors.warnaOrangeShadow,
        marginTop: 5,
    },
});
