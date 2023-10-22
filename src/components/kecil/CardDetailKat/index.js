import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native-animatable';
import { Jarak } from '..';
import { colors, fonts, responsiveWidth } from '../../../utils';

const CardDetailKat = ({ category, navigation }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => navigation.navigate('FashionDetail', { category })}>
                <Image source={{ uri: category.gambar[0] }} style={styles.gambar} />
                <Text style={styles.text}>{category.nama[0]}</Text>
                <Jarak height={13} />
                <Text style={styles.text2}>{category.nama[1]}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CardDetailKat;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    card: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
        marginTop: 20,
        marginBottom: -10,
        padding: 10,
        width: responsiveWidth(160),
        height: 210,
        //alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    },
    gambar: {
        //marginHorizontal: 30,
        width: 120,
        height: 150,
        marginTop: 2,
        borderRadius: 5,
    },
    text: {
        fontSize: 14,
        color: colors.warnaBlack,
        fontFamily: fonts.primary.regular,
        marginTop: 5,
        textTransform: 'capitalize', //agar huruf tidak kapital semua
        textAlign: 'center',
    },
    text2: {
        fontSize: 14,
        color: colors.warnaDetail,
        fontFamily: fonts.primary.semibold,
        marginTop: -16,
        textTransform: 'capitalize', //agar huruf tidak kapital semua
        textAlign: 'center',
    },
});
