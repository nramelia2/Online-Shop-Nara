import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Keyboard,
    ScrollView,
    Alert,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import { colors, fonts, responsiveHeight, responsiveWidth } from '../../utils';
import { InputanLogin, Jarak, Tombol } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class Register1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            numberphone: '',
            password: '',
        };
    }

    Continue = () => {
        const { name, email, numberphone, password } = this.state;

        if (name && email && numberphone && password) {
            this.props.navigation.navigate('Register2', this.state);
        } else {
            Alert.alert(
                'Error',
                'Please, fill in all available data and you can just move on to the next.',
            );
        }
    };

    render() {
        const { name, email, numberphone, password } = this.state;
        //agar inputan tidak ketutup
        return (
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.pages}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="transparent"
                    translucent
                />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <LinearGradient
                            colors={colors.linerGradiets}
                            style={styles.linearGradient}>
                            <View>
                                <Text style={styles.login}>Create your</Text>
                                <Text style={styles.login2}>account</Text>
                            </View>
                        </LinearGradient>

                        <View style={styles.card}>
                            <Jarak height={20} />
                            <InputanLogin
                                label="Name"
                                value={name}
                                onChangeText={name => this.setState({ name })}
                            />
                            <Jarak height={8} />
                            <InputanLogin
                                label="Email"
                                value={email}
                                onChangeText={email => this.setState({ email })}
                            />
                            <Jarak height={8} />
                            <InputanLogin
                                label="Number Phone"
                                keyboardType="number-pad"
                                value={numberphone}
                                onChangeText={numberphone => this.setState({ numberphone })}
                            />
                            <Jarak height={8} />
                            <InputanLogin
                                label="Password"
                                secureTextEntry
                                value={password}
                                onChangeText={password => this.setState({ password })}
                            />
                            <Jarak height={30} />

                            <Jarak height={15} />
                            <Tombol
                                title="CONTINUE"
                                type="text"
                                padding={7}
                                fontSize={18}
                                onPress={() => this.Continue()}
                            />

                            <Jarak height={20} />

                            <View style={styles.or}>
                                <Text style={styles.line}>____________________</Text>
                                <Text style={styles.text}>or</Text>
                                <Text style={styles.line}>____________________</Text>
                            </View>

                            <Jarak height={30} />

                            <View>
                                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                                    <LinearGradient colors={colors.linerGradient} style={styles.signup}>
                                        <Text style={styles.create}>Already have an account?</Text>
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
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
    },
    imageStyle: {
        width: 300,
        height: 120,
        marginHorizontal: responsiveWidth(35),
        marginTop: responsiveHeight(70),
        marginBottom: responsiveHeight(-25),
    },
    judulText: {
        fontSize: 18,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
        textAlign: 'center',
        marginTop: -30,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lingkaran: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    orange: {
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        backgroundColor: colors.warnaDetail,
        borderRadius: 8,
    },
    abuabu: {
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        backgroundColor: colors.border,
        borderRadius: 8,
    },
    card: {
        //backgroundColor: colors.warnaScreen,
        marginHorizontal: 40,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    panah: {
        marginRight: responsiveWidth(345),
        marginLeft: 20,
        marginBottom: -30,
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
    signup: {
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    create: {
        fontFamily: fonts.primary.bold,
        color: colors.warnaScreen,
    },
    icon: {
        marginTop: 2
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
});

//keyboardType digunakan agar inputan berupa nomor saja
