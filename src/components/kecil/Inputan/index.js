import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fonts } from '../../../utils';

const Inputan = ({
    textarea,
    label,
    width,
    height,
    fontSize,
    placeholder,
    value,
    onChangeText,
}) => {
    if (textarea) {
        //multiline digunakan agar dapat mengetik kebawah, bukan hanya 1 baris
        return (
            <View>
                <Text style={styles.label2(fontSize)}>{label}</Text>
                <TextInput
                    style={styles.textArea(fontSize)}
                    multiline={true}
                    numberOfLines={5}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder ? placeholder : ''}
                />
            </View>
        );
    }

    return (
        <View>
            <Text style={styles.label(fontSize)}>{label}</Text>
            <TextInput
                style={styles.input(width, height, fontSize)}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

export default Inputan;

const styles = StyleSheet.create({
    label: fontSize => ({
        fontSize: fontSize ? fontSize : 12,
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack,
    }),
    label2: fontSize => ({
        fontSize: fontSize ? fontSize : 14,
        fontFamily: fonts.primary.bold,
        marginTop: 5,
        color: colors.warnaBlack,
    }),
    input: (fontSize, width, height) => ({
        fontSize: fontSize ? fontSize : 12,
        fontFamily: fonts.primary.bold,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.warnaDetail,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 3,
    }),
    textArea: fontSize => ({
        fontSize: fontSize ? fontSize : 14,
        fontFamily: fonts.primary.bold,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.warnaDetail,
        paddingHorizontal: 5,
        paddingVertical: 10,
        textAlignVertical: 'top',
        marginTop: 3,
    }),
});
