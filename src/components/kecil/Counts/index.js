import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CountContext = React.createContext()

const Counter = (textarea,
    label,
    width,
    height,
    fontSize,
    placeholder,
    value,
    onChangeText) => {
    const { count, increment, decrement } = useContext(CountContext)
    return (
        <View style={styles.buttonCount}>
            <TouchableOpacity style={styles.buttonClick} onPress={decrement} value={value} onChangeText={onChangeText}>
                <Icon
                    name="minus"
                    size={12}
                    color={colors.warnaBlack}
                />
            </TouchableOpacity>

            <View style={styles.beetweenCount}>
                <Text style={styles.beetweenText}>{count}</Text>
            </View>

            <TouchableOpacity style={styles.buttonClick} onPress={increment} value={value} onChangeText={onChangeText}>
                <Icon
                    name="plus"
                    size={12}
                    color={colors.warnaBlack}
                />
            </TouchableOpacity>
        </View>
    )
}

const App = () => {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount(count + 1)
    }
    const decrement = () => {
        setCount(count - 1)
    }
    return (
        <CountContext.Provider value={{ count, increment, decrement }}>
            <Counter />
        </CountContext.Provider>
    )
}

export default App;

const styles = StyleSheet.create({
    buttonCount: {
        flexDirection: 'row'
    },
    buttonClick: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.warnaDetail,
        borderRadius: 3,
        padding: 10
    },
    beetweenCount: {
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    beetweenText: {
        fontFamily: fonts.primary.regular,
        fontSize: 18,
        color: colors.warnaBlack
    }
})