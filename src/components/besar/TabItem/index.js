import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
    IconHome,
    IconHome2,
    FashionIcon,
    FashionIcon2,
    IconProfile,
    IconProfile2,
} from '../../../assets';
import { colors, fonts } from '../../../utils';

const TabItem = ({ isFocused, onLongPress, onPress, label }) => {
    const Icon = () => {
        if (label === 'Home') {
            return isFocused ? <IconHome /> : <IconHome2 />;
        }
        if (label === 'Explore') {
            return isFocused ? <FashionIcon /> : <FashionIcon2 />;
        }
        if (label === 'Profile') {
            return isFocused ? <IconProfile /> : <IconProfile2 />;
        }
        return <IconHome />;
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}>
            <Icon />
            <Text style={styles.textVector(isFocused)}>{label}</Text>
        </TouchableOpacity>
    );
};

export default TabItem;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textVector: isFocused => ({
        color: isFocused ? colors.warnaDetail : colors.warnaBlack,
        fontSize: 12,
        marginTop: 4,
        fontFamily: fonts.primary.bold,
    }),
});
