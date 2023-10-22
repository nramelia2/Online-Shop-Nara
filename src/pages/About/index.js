import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils';
import { Jarak } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class ChangePasswprd extends Component {
    render() {
        return (
            <View style={styles.page}>
                <StatusBar barStyle="light-content" backgroundColor={colors.warnaUtama} translucent />
                <View
                    style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon
                            style={styles.icon}
                            name="chevron-left"
                            size={20}
                            color={colors.warnaDetail} />
                    </TouchableOpacity>

                    <Text
                        style={styles.textHeader}>
                        About
                    </Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.deskripsi}>
                        This application is made as an intermediary medium for online shopping
                        purchases. The company is located in Bandung, Indonesia. Materials
                        taken to make goods come from Indonesia and are also taken from
                        abroad.
                    </Text>

                    <Jarak height={5} />

                    <Text style={styles.deskripsi}>
                        If you have any feedback about our company, you can contact us through
                        <Text> </Text>
                        <View style={styles.row}>
                            <Icon
                                style={styles.icons}
                                name="envelope"
                                size={18}
                                color={colors.warnaBlack}
                            />
                            <Text style={styles.bold}>narastyleon@gmail.com</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon
                                style={styles.icons}
                                name="phone-alt"
                                size={18}
                                color={colors.warnaBlack}
                            />
                            <Text style={styles.bold}>+0212312130</Text>
                        </View>
                        <Text></Text>
                    </Text>

                    <Jarak height={10} />

                    <Text style={styles.deskripsi}>
                        If you have any concerns about your account, you can contact us at
                        <Text> </Text>
                        <View style={styles.row}>
                            <Icon
                                style={styles.icons}
                                name="envelope"
                                size={18}
                                color={colors.warnaBlack}
                            />
                            <Text style={styles.bold}>centerhelpingnr@gmail.com</Text>
                        </View>
                        <View style={styles.row}>
                            <Icon
                                style={styles.icons}
                                name="phone-alt"
                                size={18}
                                color={colors.warnaBlack}
                            />
                            <Text style={styles.bold}>+0912123123</Text>
                        </View>
                    </Text>

                    <Jarak height={10} />

                    <Text style={styles.deskripsi}>
                        If within 3 days there is no improvement, you can send your
                        complaint again via email.
                    </Text>

                    <Text style={styles.from}>From</Text>

                    <Image
                        source={require('../../assets/image/nara.png')}
                        style={styles.image}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1
    },
    header: {
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
        flex: 1,
        backgroundColor: colors.warnaScreen,
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    deskripsi: {
        fontFamily: fonts.primary.regular,
        fontSize: 15,
        textAlign: 'justify',
    },
    bold: {
        fontFamily: fonts.primary.bold,
        marginTop: 10
    },
    from: {
        paddingTop: responsiveHeight(200),
        textAlign: 'center',
        fontSize: 18,
    },
    image: {
        width: 50,
        height: 50,
        marginHorizontal: responsiveWidth(140),
    },
    row: {
        flexDirection: 'row'
    },
    icons: {
        marginRight: 20,
        marginTop: 10
    },
});
