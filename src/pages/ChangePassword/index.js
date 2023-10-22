import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { colors, fonts, getData } from '../../utils';
import { InputanLogin, Jarak, Tombol } from '../../components';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/profileAction';
import Icon from 'react-native-vector-icons/FontAwesome5';

class ChangePassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            newPassword: '',
            confirmationPassword: '',
        };
    }

    onSubmit = () => {
        const { password, newPassword, confirmationPassword } = this.state;

        if (newPassword !== confirmationPassword) {
            Alert.alert(
                'Error',
                'New password and confirmation must be the same, thanks',
            );
        } else if (password && newPassword && confirmationPassword) {
            //ambil daata email dari local storage
            getData('user').then(res => {
                const parameter = {
                    email: res.email,
                    password: password,
                    newPassword: newPassword,
                };
                this.props.dispatch(changePassword(parameter));
            });
        } else {
            Alert.alert('Error', 'Please fill out everything available on the form.');
        }
    };

    componentDidUpdate(prevProps) {
        const { changePasswordResult } = this.props;

        if (
            changePasswordResult &&
            prevProps.changePasswordResult !== changePasswordResult
        ) {
            Alert.alert('Success', 'Change the password successfully.');
            this.props.navigation.replace('MainApp');
        }
    }

    render() {
        const { password, newPassword, confirmationPassword } = this.state;
        const { changePasswordLoading } = this.props;
        return (
            <View style={styles.page}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.warnaUtama}
                    translucent
                />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon
                            style={styles.icon}
                            name="chevron-left"
                            size={20}
                            color={colors.warnaDetail}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textHeader}>Change Password</Text>
                </View>

                <View style={styles.container}>
                    <View showsVerticalScrollIndicator={false}>
                        <InputanLogin
                            label="Old Password"
                            secureTextEntry
                            value={password}
                            onChangeText={password => this.setState({ password })}
                        />
                        <Jarak height={5} />
                        <InputanLogin
                            label="New Password"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={newPassword => this.setState({ newPassword })}
                        />
                        <Jarak height={5} />
                        <InputanLogin
                            label="Confirmation Password"
                            secureTextEntry
                            value={confirmationPassword}
                            onChangeText={confirmationPassword =>
                                this.setState({ confirmationPassword })
                            }
                        />
                        <Jarak height={20} />
                    </View>

                    <View style={styles.submit}>
                        <Tombol
                            type="text"
                            title="SUBMIT"
                            padding={15}
                            onPress={() => this.onSubmit()}
                            loading={changePasswordLoading}
                        />
                        <Jarak height={20} />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    changePasswordLoading: state.ProfileReducer.changePasswordLoading,
    changePasswordResult: state.ProfileReducer.changePasswordResult,
    changePasswordError: state.ProfileReducer.changePasswordError,
});

export default connect(mapStateToProps, null)(ChangePassword);

const styles = StyleSheet.create({
    page: {
        flex: 1,
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
        marginBottom: -15,
    },
    container: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
        paddingHorizontal: 30,
        paddingTop: 15,
        justifyContent: 'space-between',
    },
    submit: {
        marginVertical: 30,
    },
});
