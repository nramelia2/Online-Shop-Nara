import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { updateOrder } from '../../actions/OrderAction';
import { colors, fonts } from '../../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class Midtrans extends Component {

    //akan mengupdate pesanan yang akan dikonekan ke firebase
    componentDidMount() {
        if (this.props.route.params.order_id) {
            this.props.dispatch(updateOrder(this.props.route.params))
        }
    }

    //mengirim data dari react js
    onMessage = (data) => {
        if (data.nativeEvent.data === 'Done') {
            this.props.navigation.replace('History')
        }
    }

    render() {
        const { updateOrderLoading } = this.props
        return (
            <View style={styles.page}>
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
                        Continue Payment
                    </Text>
                </View>

                <>
                    {updateOrderLoading ? (
                        <View style={styles.loading}>
                            <ActivityIndicator size='large' color={colors.warnaDetail} />
                        </View>
                    ) : (
                        <WebView source={{ uri: this.props.route.params.url }} onMessage={this.onMessage} />
                    )}
                </>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    updateOrderLoading: state.OrderReducer.updateOrderLoading
})

export default connect(mapStateToProps, null)(Midtrans)

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
    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 50
    }
})
