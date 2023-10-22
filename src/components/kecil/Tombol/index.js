import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, fonts } from '../../../utils';
import {
    IconBack2,
    IconCamera,
    IconCamProfile,
    IconScan,
    Keranjang,
} from '../../../assets';
import TextOnly from './TextOnly';
import TextIcon from './TextIcon';

const Tombol = props => {
    const Icon = () => {
        if (icon === 'Keranjang') {
            return <Keranjang />;
        } else if (icon === 'panahBack') {
            return <IconBack2 />;
        } else if (icon === 'camera') {
            return <IconCamera />;
        } else if (icon === 'scan') {
            return <IconScan />;
        } else if (icon === 'camProfile') {
            return <IconCamProfile />;
        }

        return <Keranjang />;
    };

    const { icon, totalCart, padding, type, onPress } = props;

    if (type === 'text') {
        return <TextOnly {...props} />;
    } else if (type === 'textIcon') {
        return <TextIcon {...props} />;
    }

    return (
        <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
            <Icon />

            {totalCart && (
                <View style={styles.notif}>
                    <Text style={styles.textNotif}>{totalCart}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default Tombol;

const styles = StyleSheet.create({
    container: padding => ({
        backgroundColor: colors.warnaUtama,
        padding: padding,
        borderRadius: 30,
    }),
    notif: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'red',
        borderRadius: 3,
        padding: 3,
    },
    textNotif: {
        fontSize: 8,
        color: colors.warnaScreen,
        fontFamily: fonts.primary.bold,
    },
});
