import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import { colors, fonts } from '../../../utils'
import { IconBack2, IconKeranjang2, Keranjang } from '../../../assets'
import { Jarak } from '../Jarak'

const TextIcon = ({ icon, padding, onPress, title, fontSize }) => {

    const Icon = () => {
        if (icon === "Keranjang") {
            return <Keranjang />
        }
        else if (icon === "panahBack") {
            return <IconBack2 />
        }
        else if (icon === "keranjang2") {
            return <IconKeranjang2 />
        }

        return <Keranjang />
    }

    return (
        <TouchableOpacity style={styles.container(padding)} onPress={onPress}>
            <Icon />
            <Jarak width={10} />
            <Text style={styles.textShopp(fontSize)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TextIcon;

const styles = StyleSheet.create({
    container: (padding) => ({
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.warnaScreen,
        padding: padding,
        borderRadius: 30,
        marginTop: 10,
    }),
    textShopp: (fontSize) => ({
        color: colors.warnaUtama,
        fontFamily: fonts.primary.semibold,
        fontSize: fontSize ? fontSize : 15
    })
})