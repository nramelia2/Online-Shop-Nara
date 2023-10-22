import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils';
import { InputanLogin, Jarak, Tombol } from '../../components';
import { loginUser } from '../../actions/AuthenticationAction';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    login = () => {
        const { email, password } = this.state;

        if (email && password) {
            //action
            this.props.dispatch(loginUser(email, password));
        } else {
            Alert.alert('Error', 'Emails and passwords must be filled in.');
        }
    };

    componentDidUpdate(prevProps) {
        const { loginResult } = this.props;

        if (loginResult && prevProps.loginResult !== loginResult) {
            this.props.navigation.replace('MainApp');
        }
    }

    render() {
        const { email, password } = this.state;
        const { loginLoading } = this.props;

        return (
            <View>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />

                <LinearGradient
                    colors={colors.linerGradient}
                    style={styles.linearGradient}>
                    <View>
                        <Text style={styles.login}>Log into</Text>
                        <Text style={styles.login2}>your account</Text>
                    </View>
                </LinearGradient>

                <Jarak height={40} />

                <View style={styles.card}>
                    <InputanLogin
                        label="Email"
                        value={email}
                        onChangeText={email => this.setState({ email })}
                    //placeholder='Email Address'
                    />

                    <Jarak height={8} />

                    <InputanLogin
                        label="Password"
                        secureTextEntry
                        value={password}
                        onPress={() => this.setState({ password })}
                        onChangeText={password => this.setState({ password })}
                    //placeholder='Password'
                    />

                    <Jarak height={30} />

                    <Tombol
                        title="LOGIN"
                        type="text"
                        padding={7}
                        fontSize={18}
                        loading={loginLoading}
                        onPress={() => this.login()}
                    />

                    <Jarak height={30} />

                    <View style={styles.or}>
                        <Text style={styles.line}>____________________</Text>
                        <Text style={styles.text}>or</Text>
                        <Text style={styles.line}>____________________</Text>
                    </View>

                    <Jarak height={40} />

                    <View>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Register1')}>
                            <LinearGradient
                                colors={colors.linerGradient}
                                style={styles.signup}>
                                <Text style={styles.create}>Creat an account</Text>
                                <Jarak width={10} />
                                <Icon
                                    style={styles.icon}
                                    name="chevron-right"
                                    size={15}
                                    color={colors.warnaScreen}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    loginLoading: state.AuthenticationReducer.loginLoading,
    loginResult: state.AuthenticationReducer.loginResult,
    loginError: state.AuthenticationReducer.loginError,
});

export default connect(mapStateToProps, null)(Login);

const styles = StyleSheet.create({
    pages: {
        flex: 1,
    },
    card: {
        borderRadius: 10,
        marginHorizontal: 40,
    },
    register: {
        alignItems: 'center',
    },
    warna: {
        fontSize: 15,
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack,
    },
    imageBack: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: responsiveWidth(480),
        height: responsiveHeight(900),
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
        marginBottom: -responsiveHeight(20),
    },
    linearGradient: {
        paddingVertical: 50,
    },
    line: {
        color: colors.warnaDetail,
    },
    or: {
        flexDirection: 'row',
    },
    text: {
        marginHorizontal: 12,
        color: colors.warnaDetail,
    },
    signup: {
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    create: {
        fontFamily: fonts.primary.bold,
        color: colors.warnaScreen,
    },
    icon: {
        marginTop: 2,
    },
});

//keyboardType digunakan agar inputan berupa nomor saja
