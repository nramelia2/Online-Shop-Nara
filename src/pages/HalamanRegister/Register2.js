import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ScrollView, Alert, StatusBar } from "react-native";
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils';
import { Inputan, Jarak, Tombol, Pilihan } from '../../components';
import { connect } from "react-redux";
import { ListProvinsi, ListKota } from '../../actions/RakirAction';
import { registerUser } from '../../actions/AuthenticationAction';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Register2 extends Component {
    constructor(props) {
        super(props)

        this.state = {
            kota: false, //karena merupakan text pilihan bukan input, tapi tetep sama aja kalau seumpama pake string
            provinsi: false,
            alamat: '',
        };
    };

    componentDidMount() {
        this.props.dispatch(ListProvinsi())
    }

    //komponene ketika props ada perubahan atau tidak
    //menggunakan replace karena tidak akan masuk ke dalam register lagi
    componentDidUpdate(prevProps) {
        const { registerResult } = this.props

        if (registerResult && prevProps.registerResult !== registerResult) {
            this.props.navigation.replace("MainApp")
        }
    }

    changeProvince = (provinsi) => {
        this.setState({
            provinsi: provinsi
        })

        this.props.dispatch(ListKota(provinsi))
    }

    continue = () => {
        const { kota, provinsi, alamat } = this.state

        if (kota && provinsi && alamat) {
            const data = {
                name: this.props.route.params.name,
                email: this.props.route.params.email,
                numberphone: this.props.route.params.numberphone,
                alamat: alamat,
                provinsi: provinsi,
                kota: kota,
                status: 'user' //disini user karena nanti di database terdapat dua status yaitu sebagai admin dan satunya sebagai user
            }

            //statue akan ke authentication Action
            this.props.dispatch(registerUser(data, this.props.route.params.password))

        }
        else {
            Alert.alert("Error", "Please, fill in all available data and you can just move on to the next.")
        }
    }

    render() {
        const { kota, provinsi, alamat } = this.state
        const { ProvinceResult, CityResult } = this.props

        console.log(this.props.route.params)
        //agar inputan tidak ketutup
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.pages}
            >
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <LinearGradient
                            colors={colors.linerGradiets}
                            style={styles.linearGradient}>
                            <View style={styles.panah}>
                                <Tombol icon="panahBack"
                                    padding={9}
                                    onPress={() => this.props.navigation.goBack()}
                                />
                            </View>
                            <Jarak height={40} />
                            <View>
                                <Text style={styles.login}>Now,</Text>
                                <Text style={styles.login2}>fill in your address</Text>
                            </View>
                        </LinearGradient>

                        <Jarak height={-60} />

                        <View style={styles.card}>
                            <Inputan
                                label="Address"
                                textarea
                                value={alamat}
                                onChangeText={(alamat) => this.setState({ alamat })}
                            />
                            <Jarak height={10} />

                            <Pilihan
                                label="Province"
                                datas={ProvinceResult ? ProvinceResult : []}
                                selectedValue={provinsi}
                                onValueChange={(provinsi) => this.changeProvince(provinsi)}
                                fontSize={15}
                            />
                            <Jarak height={10} />

                            <Pilihan
                                label="City"
                                datas={CityResult ? CityResult : []}
                                selectedValue={kota}
                                onValueChange={(kota) => this.setState({ kota: kota })}
                                fontSize={15} />
                            <Jarak height={20} />

                            <Jarak height={15} />

                            <Tombol
                                title="CONTINUE"
                                type="text"
                                padding={7}
                                fontSize={18}
                                onPress={() => this.continue()}
                            />
                            <Jarak height={30} />

                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        )
    }
}

const mapStateToProps = (state) => ({
    ProvinceResult: state.ReducerRakir.ProvinceResult,
    CityResult: state.ReducerRakir.CityResult,

    registerLoading: state.AuthenticationReducer.registerLoading,
    registerResult: state.AuthenticationReducer.registerResult,
    registerError: state.AuthenticationReducer.registerError,
})

export default connect(mapStateToProps, null)(Register2)

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
    },
    judulText: {
        fontSize: 18,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
        textAlign: 'center',
        marginTop: -30
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lingkaran: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    orange: {
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        backgroundColor: colors.warnaDetail,
        borderRadius: 8

    },
    abuabu: {
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        backgroundColor: colors.border,
        borderRadius: 8

    },
    card: {
        backgroundColor: colors.warnaScreen,
        marginHorizontal: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        borderRadius: 10,
        marginTop: 10
    },
    panah: {
        marginRight: responsiveWidth(345),
        marginLeft: 20,
        marginBottom: -40
    },
    login: {
        fontSize: 35,
        fontFamily: fonts.primary.bold,
        color: colors.warnaScreen,
        marginLeft: 40,
        marginTop: 10,
    },
    login2: {
        fontSize: 35,
        fontFamily: fonts.primary.bold,
        color: colors.warnaScreen,
        marginLeft: 40,
        marginBottom: -responsiveHeight(40),
    },
    linearGradient: {
        paddingVertical: 50,
    },
})

//keyboardType digunakan agar inputan berupa nomor saja