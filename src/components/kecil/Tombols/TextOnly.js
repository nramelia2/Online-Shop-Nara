import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text, useColorScheme } from 'react-native'
import { colors, fonts } from '../../../utils'

const TextOnly = ({ padding, title, onPress, fontSize, disabled }) => {
    return (
        <TouchableOpacity style={styles.container(padding, disabled)} onPress={onPress}>
            <Text style={styles.text(fontSize)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TextOnly;

const styles = StyleSheet.create({
    container: (padding, disabled) => ({
        backgroundColor: disabled ? colors.warnaAbuabu : colors.warnaDetail,
        padding: padding,
        borderRadius: 10,
    }),
    text: (fontSize) => ({
        color: colors.warnaScreen,
        fontSize: fontSize ? fontSize : 13,
        fontFamily: fonts.primary.bold,
        textAlign: 'center'
    })
})
