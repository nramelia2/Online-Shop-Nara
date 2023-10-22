import React, { Component, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native';
import { Tombol } from '../../components/kecil';
import { colors, fonts, responsiveHeight } from '../../utils';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Clipboard from '@react-native-clipboard/clipboard';


class ScanCamera extends React.Component {
    state = {
        barcode: 'Options',
    };

    copy = (text) => {
        Clipboard.setString(text)
    }

    render() {
        const { navigation } = this.props

        return (
            <View style={styles.page}>
                <StatusBar barStyle="light-content" backgroundColor={colors.warnaDetail} translucent />
                <View
                    style={styles.headers}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon
                            style={styles.icon}
                            name="chevron-left"
                            size={20}
                            color={colors.warnaDetail} />
                    </TouchableOpacity>

                    <Text
                        style={styles.textHeader}>
                        Scanner Barcode
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }} />

                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        androidRecordAudioPermissionOptions={{
                            title: 'Permission to use audio recording',
                            message: 'We need your permission to use your audio',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }}
                        onBarCodeRead={barcode => {
                            console.log(barcode);
                            this.setState({
                                barcode: barcode.data,
                            });
                        }}
                    />

                    <View style={styles.container}>
                        <TouchableOpacity style={styles.bagianBawah} navigation={navigation} onPress={() => this.copy(`${this.state.barcode}`)}>
                            <Text style={styles.text}>{`${this.state.barcode}`}</Text>
                        </TouchableOpacity>

                        <View>
                            <View style={styles.bagianBawah}>
                                <Tombol icon="scan" padding={20} />
                                <Text style={styles.text2}>
                                    You can find your code here! To get interesting info about your code, then copy and paste it in the search feature.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


        );
    }
}

export default connect()(ScanCamera);

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    headers: {
        backgroundColor: colors.warnaScreen,
        paddingVertical: 15,
        elevation: 3,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    icon: {
        marginRight: 20,
        marginTop: 25,
    },
    textHeader: {
        color: colors.warnaBlack,
        fontSize: 18,
        fontFamily: fonts.primary.bold,
        marginTop: 15,
        marginBottom: -15
    },
    container: {
        height: responsiveHeight(180),
        backgroundColor: colors.warnaDetails,
    },
    bagianBawah: {
        marginHorizontal: 20,
        marginTop: 10,
        flexDirection: 'row',
    },
    text: {
        fontSize: 17,
        fontFamily: fonts.primary.bold,
        color: colors.warnaUtama,
    },
    bottom: {
        backgroundColor: colors.warnaUtama,
        height: 60,
        width: 60,
        borderRadius: 80,
    },
    text2: {
        fontSize: 13,
        fontFamily: fonts.primary.bold,
        color: colors.warnaUtama,
        marginRight: 40,
        marginLeft: 20,
        marginTop: 5,
        textAlign: 'justify'
    },
    header: {
        marginHorizontal: 20,
    },
    tombol: {
        backgroundColor: colors.warnaUtama,
        height: 40,
        width: 40,
        borderRadius: 80,
    },
    panah: {
        marginRight: responsiveHeight(400),
        marginLeft: 20,
        marginTop: 20,
        marginBottom: -30,
    },
    atas: {
        flexDirection: 'row',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
});
