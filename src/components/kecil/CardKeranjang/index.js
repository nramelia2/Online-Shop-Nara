import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deleteKeranjang } from '../../../actions/CartAction';
import { IconDelete } from '../../../assets';
import {
    colors,
    fonts,
    numberWithCommas,
    responsiveHeight,
    responsiveWidth,
} from '../../../utils';

const CardKeranjang = ({ keranjang, mainCart, id, dispatch }) => {
    const deleteCart = () => {
        dispatch(deleteKeranjang(id, mainCart, keranjang));
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: keranjang.product.gambar[0] }}
                style={styles.fashion}
            />

            <View style={styles.deskripsi}>
                <Text style={styles.nama}>{keranjang.product.nama[0]}</Text>

                <Text style={styles.desc}>Orders {keranjang.jumlahPesan}</Text>
                <Text style={styles.desc}>Color {keranjang.warna}</Text>
                <Text style={styles.desc}>Size {keranjang.ukuran}</Text>
                <Text style={styles.harga}>
                    Rp {numberWithCommas(keranjang.totalHarga)}
                </Text>
            </View>

            <TouchableOpacity style={styles.hapus} onPress={() => deleteCart()}>
                <IconDelete />
            </TouchableOpacity>
        </View>
    );
};

export default connect()(CardKeranjang);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: colors.warnaScreen,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        //marginHorizontal: 30,
        paddingVertical: 15,
        paddingHorizontal: 30,
        //borderRadius: 10,
        alignItems: 'center',
    },
    fashion: {
        resizeMode: 'contain',
        width: responsiveWidth(60),
        height: responsiveHeight(140),
        marginRight: 5,
        marginLeft: -15,
        borderRadius: 30,
    },
    hapus: {
        flex: 1,
        alignItems: 'flex-end', //agar ke samping
    },
    nama: {
        fontSize: 15,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
    },
    harga: {
        fontSize: 15,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaDetail,
    },
    desc: {
        fontSize: 12,
    },
    desc2: {
        fontSize: 12,
    },
    deskripsi: {
        marginHorizontal: 5,
    },
});
