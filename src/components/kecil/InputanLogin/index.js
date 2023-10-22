import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, fonts } from '../../../utils';

const InputLogin = ({
    textarea,
    label,
    width,
    height,
    fontSize,
    value,
    onChangeText,
    secureTextEntry,
    disabled,
    placeholder
}) => {
    if (textarea) {
        //multiline digunakan agar dapat mengetik kebawah, bukan hanya 1 baris
        return (
            <View>
                <Text style={styles.label2(fontSize)}>{label}</Text>
                <TextInput
                    style={styles.textArea(fontSize)}
                    value={value}
                    onChangeText={onChangeText}
                    editable={disabled ? false : true}
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
                secureTextEntry={secureTextEntry}
                editable={disabled ? false : true}
                placeholder={placeholder ? placeholder : ''}
            />
        </View>
    );
};

export default InputLogin;

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
        borderBottomWidth: 1,
        borderBottomColor: colors.warnaDetail,
        //borderRadius: 10,
        width: width,
        height: height,
        paddingVertical: 5,
        //padding: 20,
        //backgroundColor: colors.warnaAbuabu
    }),
    textArea: fontSize => ({
        fontSize: fontSize ? fontSize : 18,
        fontFamily: fonts.primary.bold,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.warnaBlack,
        paddingHorizontal: 5,
        paddingVertical: 10,
        textAlignVertical: 'top',
        marginTop: 3,
    }),
});
