import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Modal, Alert, StatusBar, FlatList } from 'react-native';
import { Jarak, ListKeranjang, Tombol } from '../../components';
import {
    colors,
    fonts,
    getData,
    numberWithCommas,
    responsiveHeight,
    responsiveWidth,
} from '../../utils';
import { connect } from 'react-redux';
import { getCart } from '../../actions/CartAction';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { discounts } from '../../data';

class Keranjang extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalVisible: false,
            couponList: discounts,
            discountNow: 1,
        };
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible })
    }


    componentDidMount() {
        getData('user').then(res => {
            if (res) {
                //udah login
                this.props.dispatch(getCart(res.uid));
            } else {
                //belum login
                this.props.navigation.replace('Login');
            }
        });
    }

    componentDidUpdate(prevProps) {
        const { deleteCartResult } = this.props;

        if (deleteCartResult && prevProps.deleteCartResult !== deleteCartResult) {
            getData('user').then(res => {
                if (res) {
                    //sudah login
                    this.props.dispatch(getCart(res.uid));
                } else {
                    //belum login
                    this.props.navigation.replace('Login');
                }
            });
        }
    }

    render() {
        const { getCartResult } = this.props;
        const { modalVisible } = this.state
        return (
            <View style={styles.page}>
                <StatusBar barStyle="light-content" backgroundColor={colors.warnaDetail} translucent />

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
                        Cart
                    </Text>
                </View>

                <View style={styles.container}>
                    <ScrollView>
                        <ListKeranjang {...this.props} />

                        <Jarak height={50} />
                    </ScrollView>

                    <View style={styles.bawah}>
                        <TouchableOpacity style={styles.discount} onPress={() => this.setState({ modalVisible: true })}>
                            <Text style={styles.textDiscount}>USE COUPONS</Text>
                            <Icon name='chevron-right' size={18} color={colors.warnaDetail} />
                        </TouchableOpacity>

                        <View style={styles.hargaTotal}>
                            <Text style={styles.textCount}>Count Price</Text>
                            <Text style={styles.text}>
                                <Text style={{
                                    textDecorationLine: this.state.discountNow < 1 ? 'line-through' : 'none',
                                    fontSize: this.state.discountNow < 1 ? 18 : 15
                                }}>
                                    Rp. {''}
                                    {getCartResult ? numberWithCommas(getCartResult.totalHarga) : 0}
                                </Text>

                                <Jarak width={8} />
                                {this.state.discountNow < 1 ? 'Rp. ' : ''}
                                {this.state.discountNow < 1 ? numberWithCommas(getCartResult.totalHarga * this.state.discountNow) : ''}
                            </Text>
                        </View>

                        {getCartResult ? (
                            <Tombol
                                title="CHECK OUT"
                                type="text"
                                fontSize={18}
                                padding={10}
                                onPress={() => this.props.navigation.navigate('CheckOut', {
                                    totalHarga: getCartResult.totalHarga * this.state.discountNow,
                                    totalBerat: getCartResult.totalBerat
                                })}
                            />
                        ) : (
                            <Tombol
                                title="CHECK OUT"
                                type="text"
                                fontSize={18}
                                padding={10}
                                disabled={true}
                            />
                        )}
                    </View>
                </View>

                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.firstModal}>
                        <View style={styles.modalUtama}>
                            <FlatList
                                data={this.state.couponList}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity style={styles.modals}
                                        onPress={() => this.setState({ modalVisible: false, discountNow: item.diskon })}
                                    >
                                        <Text style={styles.nameKupon}>{item.nameKupon}</Text>
                                        <Text>{item.description}</Text>
                                    </TouchableOpacity>
                                }
                            />

                            <TouchableOpacity style={styles.discounts} onPress={() => this.setState({ modalVisible: false })}>
                                <Text style={styles.textClose}>CLOSE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    getCartLoading: state.cartReducer.getCartLoading,
    getCartResult: state.cartReducer.getCartResult,
    getCartError: state.cartReducer.getCartError,

    deleteCartLoading: state.cartReducer.deleteCartLoading,
    deleteCartResult: state.cartReducer.deleteCartResult,
    deleteCartError: state.cartReducer.deleteCartError,
});

export default connect(mapStateToProps, null)(Keranjang);

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
        //backgroundColor: colors.warnaScreen,
    },
    bawah: {
        backgroundColor: colors.warnaScreen,
        width: responsiveWidth(415),
        height: 220,
        paddingHorizontal: 30,
        elevation: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    hargaTotal: {
        //flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        fontSize: 15,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
        marginTop: 8,
        textAlign: 'right'
    },
    textCount: {
        fontSize: 15,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
    },
    tombol: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 10,
        paddingVertical: 15,
        elevation: 1,
    },
    discount: {
        backgroundColor: colors.warnaScreen,
        marginVertical: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.warnaAbuabu
    },
    discounts: {
        backgroundColor: colors.warnaDetail,
        marginVertical: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    textDiscount: {
        fontSize: 20,
        fontFamily: fonts.primary.bold,
        color: colors.warnaDetail,
        textAlign: 'center',
        marginBottom: -10,
        marginRight: 10,
        marginTop: -3
    },
    textClose: {
        fontSize: 20,
        fontFamily: fonts.primary.bold,
        color: colors.warnaScreen,
        textAlign: 'center',
        marginBottom: -10,
        marginRight: 10,
        marginTop: -3
    },
    modal: {
        flex: 1,
        backgroundColor: colors.warnaDetail,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    tombolModals: {
        backgroundColor: colors.warnaDetail,
        marginHorizontal: 20,
        marginVertical: 20,
    },
    modals: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: colors.warnaAbuabu,
        padding: 20,
        borderRadius: 3,
        elevation: 1,
        backgroundColor: colors.warnaScreen,
        marginTop: 30,
    },
    nameKupon: {
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack
    },
    modalUtama: {
        backgroundColor: colors.warnaScreen,
        borderRadius: 20,
        width: responsiveWidth(350),
        height: responsiveHeight(800),
        marginLeft: 27,
        marginTop: 30,
    },
    firstModal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
});

//{...this.props} - akan mengirim  getCartLoading, getCartResult, getCartError

