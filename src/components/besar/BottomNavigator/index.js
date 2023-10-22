import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { deleteFashion } from '../../../actions/FashionAction';
import { colors } from '../../../utils';
import TabItem from '../TabItem';

const BottomNavigator = ({ state, descriptors, navigation, dispatch }) => {
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }

                    if (route.name !== 'ListStore') {
                        //agar semuanya tampil
                        dispatch(deleteFashion());
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabItem
                        key={index}
                        label={label}
                        isFocused={isFocused}
                        onLongPress={onLongPress}
                        onPress={onPress}
                    />
                );
            })}
        </View>
    );
};

export default connect()(BottomNavigator);

const styles = StyleSheet.create({
    container: {
        position: 'absolute', //agar layar berada dibelakang bottom tidak bertabrakan
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        backgroundColor: colors.warnaScreen,
        paddingVertical: 8,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 10,
    },
});
