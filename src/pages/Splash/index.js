import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    ImageBackground,
} from 'react-native';
import { colors, responsiveHeight, responsiveWidth } from '../../utils';

export default class Splash extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.replace('MainApp');
        }, 3000);
    }

    render() {
        return (
            <View style={styles.pages}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                <ImageBackground
                    source={require('../../assets/image/splashBackground.png')}
                    style={styles.imageStyle}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: responsiveWidth(490),
        height: responsiveHeight(900),
    },
});
