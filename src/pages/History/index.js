import React, { Component } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { ListHistory } from '../../components';
import { colors, fonts, getData } from '../../utils';
import { getHistory } from '../../actions/HistoryAction';
import Icon from 'react-native-vector-icons/FontAwesome5';

class History extends Component {
    componentDidMount() {
        getData('user').then((res) => {
            const data = res
            if (!data) {
                this.props.navigation.replace('Login')
            }
            else {
                this.props.dispatch(getHistory(data.uid))
            }
        })
    }

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
                        Booking History
                    </Text>
                </View>

                <View style={styles.container}>
                    <ListHistory navigation={this.props.navigation} />
                </View>
            </View>
        )
    }
}

export default connect()(History)

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
        marginBottom: -15,
    },
    container: {
        flex: 1,
        backgroundColor: colors.warnaScreen
    }
})