import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts } from '../../../utils';

const InputBorder = ({
    textarea,
    label,
    width,
    height,
    fontSize,
    value,
    onChangeText,
    secureTextEntry,
    disabled,
}) => {
    if (textarea) {
        //multiline digunakan agar dapat mengetik kebawah, bukan hanya 1 baris
        return (
            <View>
                <Text style={styles.label2(fontSize)}>{label}</Text>
                <TextInput
                    style={styles.textArea(fontSize)}
                    //multiline={true}
                    //numberOfLines={3}
                    value={value}
                    onChangeText={onChangeText}
                    editable={disabled ? false : true}
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
                secureTextEntry={secureTextEntry}
                editable={disabled ? false : true}
            />
        </View>
    );
};

export default InputBorder;

const styles = StyleSheet.create({
    label: fontSize => ({
        fontSize: fontSize ? fontSize : 15,
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack,
    }),
    label2: fontSize => ({
        fontSize: fontSize ? fontSize : 15,
        fontFamily: fonts.primary.bold,
        marginTop: 5,
    }),
    input: (fontSize, width, height) => ({
        fontSize: fontSize ? fontSize : 15,
        fontFamily: fonts.primary.bold,
        borderBottomWidth: 2,
        borderColor: colors.warnaDetail,
        width: width,
        height: height,
        paddingHorizontal: 5,
        paddingVertical: 10,
        marginTop: 3,
    }),
    textArea: fontSize => ({
        fontSize: fontSize ? fontSize : 18,
        fontFamily: fonts.primary.bold,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.warnaOrangeTajam,
        paddingHorizontal: 5,
        paddingVertical: 10,
        textAlignVertical: 'top',
        marginTop: 3,
    }),
});
