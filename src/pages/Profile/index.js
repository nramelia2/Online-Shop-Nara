import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
    colors,
    fonts,
    getData,
    heightMobileUI,
    responsiveHeight,
    responsiveWidth,
} from '../../utils';
import { dummyMenu } from '../../data';
import ListProfile from '../../components/besar/ListProfile';
import { Jarak } from '../../components';
import { DefaultImage } from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: false,
            menus: dummyMenu,
        };
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getUserData();
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    getUserData = () => {
        getData('user').then(res => {
            const data = res;

            if (data) {
                this.setState({
                    profile: data,
                });
            } else {
                this.props.navigation.replace('Login');
            }
        });
    };

    render() {
        const { profile, menus } = this.state;
        return (
            <View style={styles.page}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                <LinearGradient colors={colors.linerGradient} style={styles.linearGradient} />

                <View style={styles.row}>
                    <Image
                        source={profile.avatar ? { uri: profile.avatar } : DefaultImage}
                        style={styles.photo}
                    />
                    <View style={styles.profile}>
                        <Text style={styles.nama}>{profile.name}</Text>
                        <Text style={styles.nomorAndaddress}>{profile.alamat}</Text>
                    </View>
                </View>

                <View style={styles.bottomProfile}>
                    <Icon
                        style={styles.icon}
                        name="envelope"
                        size={20}
                        color={colors.Grey}
                    />
                    <Text style={styles.TextBottomProfile}>{profile.email}</Text>
                </View>

                <View style={styles.bottomProfile}>
                    <Icon
                        style={styles.icon}
                        name="phone-alt"
                        size={20}
                        color={colors.Grey}
                    />
                    <Text style={styles.TextBottomProfile}>{profile.numberphone}</Text>
                </View>

                <View style={styles.garis} />

                <View>
                    <Jarak height={5} />
                    <ListProfile
                        menus={menus}
                        key={menus.id}
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        height: 450,
        width: '100%',
        backgroundColor: colors.warnaScreen,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        elevation: 5,
    },
    photo: {
        width: responsiveWidth(120),
        height: responsiveHeight(120),
        borderRadius: 60,
        //alignSelf: 'center', //posisi yang ada di dirinya sendiri
        marginHorizontal: 35,
    },
    profile: {
        textAlign: 'center',
    },
    nama: {
        fontSize: RFValue(22, heightMobileUI),
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack,
    },
    nomorAndaddress: {
        fontFamily: fonts.primary.regular,
        fontSize: RFValue(18, heightMobileUI),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(-100),
    },
    linearGradient: {
        paddingVertical: 70,

    },
    icon: {
        marginRight: 20,
        marginTop: 20
    },
    bottomProfile: {
        flexDirection: 'row',
        marginHorizontal: 40,
    },
    TextBottomProfile: {
        marginTop: 20,
        fontFamily: fonts.primary.regular,
        fontSize: RFValue(18, heightMobileUI),
        marginHorizontal: 10,
    },
    garis: {
        borderBottomWidth: 1,
        borderBottomColor: colors.warnaDetail,
        marginTop: 25,
        marginHorizontal: 40
    }
});
