import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../../../utils';

const Judul = () => {
    return <Text style={styles.container}>NARA Style-On</Text>;
};

export default Judul;

const styles = StyleSheet.create({
    container: {
        marginLeft: -100,
        color: colors.warnaScreen,
        fontSize: 25,
        flexDirection: 'row',
        marginTop: 10,
        fontFamily: fonts.primary.bold,
    },
});
