import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import {
    colors,
    fonts,
    numberWithCommas,
    responsiveHeight,
    responsiveWidth,
} from '../../../utils';
import Jarak from '../Jarak';
import { updateStatus } from '../../../actions/HistoryAction';

class CardHistory extends Component {
    componentDidMount() {
        const { pesanan } = this.props;
        this.props.dispatch(updateStatus(pesanan.order_id))
    }

    goToMidtrans = () => {
        const { pesanan } = this.props;
        if (pesanan.status === 'moons') {
            Alert.alert('Info', 'The order is paid off');
        } else {
            this.props.navigation.navigate('Midtrans', { url: pesanan.url });
        }
    };

    render() {
        const { pesanan, updateStatusCartLoading } = this.props;
        const history = pesanan.pesanans;
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => this.goToMidtrans()}>
                <View style={styles.card}>
                    <Text style={styles.booking}>{pesanan.tanggal}</Text>
                    <Text style={styles.status}>
                        {' '}
                        {updateStatusCartLoading ? 'Loading' : pesanan.status}
                    </Text>
                </View>
                {Object.keys(history).map((key, index) => {
                    return (
                        <View key={index} style={styles.history}>
                            <View style={styles.history}>
                                <Image
                                    source={{ uri: history[key].product.gambar[0] }}
                                    style={styles.fashion}
                                />
                                <View style={styles.deskripsi}>
                                    <Text style={styles.judul}>
                                        {history[key].product.nama[0]}
                                    </Text>
                                    <Text>Note : {history[key].information}</Text>
                                </View>
                            </View>

                            <View style={styles.orderAndprice}>
                                <Text style={styles.label}>x {history[key].jumlahPesan}</Text>
                                <Text style={styles.label2}>
                                    Rp. {numberWithCommas(history[key].totalHarga)}
                                </Text>
                            </View>
                        </View>
                    );
                })}

                <Jarak height={15} />

                <View style={styles.garis} />

                <View style={styles.card}>
                    <View>
                        <Text style={styles.label}>ONGKIR ({pesanan.estimasi}) DAY </Text>
                        <Text style={styles.label}>COUNT PRICE </Text>
                    </View>
                    <View>
                        <Text> Rp. {numberWithCommas(pesanan.ongkir)}</Text>
                        <Text style={styles.hargaTotal}>
                            {' '}
                            Rp. {numberWithCommas(pesanan.totalHarga + pesanan.ongkir)}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    updateStatusCartLoading: state.HistoryReducer.updateStatusCartLoading,
});

export default connect(mapStateToProps, null)(CardHistory);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.warnaScreen,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        paddingHorizontal: 20,
        paddingVertical: 20,
        //borderRadius: 10,
        marginBottom: 15,
        marginHorizontal: -30,
    },
    history: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fashion: {
        width: responsiveWidth(80),
        height: responsiveHeight(120),
        borderRadius: 10,
    },
    booking: {
        fontSize: 15,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
        marginBottom: 10,
    },
    deskripsi: {
        marginLeft: responsiveWidth(8),
    },
    judul: {
        fontSize: 14,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
        textTransform: 'capitalize',
    },
    text: {
        fontSize: 13,
        fontFamily: fonts.primary.semibold,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack,
        fontSize: 14,
    },
    label2: {
        fontFamily: fonts.primary.bold,
        color: colors.warnaAbuabu,
        fontSize: 14,
    },
    status: {
        color: colors.warnaDetail,
        fontFamily: fonts.primary.bold,
        textTransform: 'uppercase', //biar gede semua
    },
    orderAndprice: {
        marginTop: 40,
    },
    hargaTotal: {
        color: colors.warnaDetail,
        fontFamily: fonts.primary.bold,
    },
    garis: {
        borderWidth: 1,
        borderColor: colors.warnaAbuabu,
        marginBottom: 5,
    },
});
