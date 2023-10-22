import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    colors,
    fonts,
    getData,
    numberWithCommas,
    responsiveHeight,
    responsiveWidth,
} from '../../utils';
import { CardAlamat, Pilihan, Tombol, Jarak } from '../../components';
import { connect } from 'react-redux';
import { getCityDetail, postOngkir } from '../../actions/RakirAction';
import { couriers } from '../../data/couriers';
import { snapTransactions } from '../../actions/PaymentAction';
import Icon from 'react-native-vector-icons/FontAwesome5';

class CheckOut extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: false,
            ekspedisi: couriers,
            totalHarga: this.props.route.params.totalHarga,
            totalBerat: this.props.route.params.totalBerat,
            alamat: '',
            kota: '',
            provinsi: '',
            ekspedisiSelected: false,
            ongkir: 0,
            estimasi: '',
            date: new Date().getTime(),
        };
    }

    componentDidMount() {
        this.getUserData();
    }

    getUserData = () => {
        getData('user').then(res => {
            const data = res;

            if (data) {
                this.setState({
                    profile: data,
                    alamat: data.alamat,
                });

                this.props.dispatch(getCityDetail(data.kota));
            } else {
                this.props.navigation.replace('Login');
            }
        });
    };

    componentDidUpdate(prevProps) {
        const { CityDetailResult, ongkirResult, snapTransactionsResult } = this.props;

        if (CityDetailResult && prevProps.CityDetailResult !== CityDetailResult) {
            this.setState({
                provinsi: CityDetailResult.province,
                kota: CityDetailResult.type + ' ' + CityDetailResult.city_name,
            });
        }

        if (ongkirResult && prevProps.ongkirResult !== ongkirResult) {
            this.setState({
                ongkir: ongkirResult.cost[0].value,
                estimasi: ongkirResult.cost[0].etd,
            });
        }
        if (
            snapTransactionsResult &&
            prevProps.snapTransactionsResult !== snapTransactionsResult
        ) {
            const params = {
                url: snapTransactionsResult.redirect_url,
                ongkir: this.state.ongkir,
                estimasi: this.state.estimasi,
                order_id: 'TEST-' + this.state.date + '-' + this.state.profile.uid, //make tanggal karena tanggal bersifat unik karena setip hari ganti
            };
            this.props.navigation.navigate('Midtrans', params);
        }
    }

    changeEkspedisi = ekspedisiSelected => {
        if (ekspedisiSelected) {
            this.setState({
                ekspedisiSelected: ekspedisiSelected,
            });

            this.props.dispatch(postOngkir(this.state, ekspedisiSelected));
        }
    };

    //function midtrans bayar
    Pay = () => {
        const { totalHarga, ongkir, profile, date } = this.state;
        const data = {
            //data di ambil dari post man dengan mengisi key server
            transaction_details: {
                order_id: 'TEST-' + date + '' + profile.uid, //make tanggal karena tanggal bersifat unik karena setip hari ganti
                gross_amount: parseInt(totalHarga + ongkir), //total harga + ongkir
            },
            credit_card: {
                secure: true,
            },
            customer_details: {
                first_name: profile.name,
                email: profile.email,
                phone: profile.numberphone,
            },
        };
        //ager memilih ongkir terlebih dahulu, jika tindak maka tidak bisa bayar
        if (!ongkir == 0) {
            //lari ke action
            this.props.dispatch(snapTransactions(data));
        } else {
            Alert.alert('Error', 'Please select ongkir.');
        }
    };

    render() {
        const { navigation, snapTransactionsLoading } = this.props;
        const {
            ekspedisi,
            totalHarga,
            totalBerat,
            alamat,
            kota,
            provinsi,
            ekspedisiSelected,
            ongkir,
            estimasi,
        } = this.state;
        return (
            <View style={styles.page}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon
                            style={styles.icon}
                            name="chevron-left"
                            size={20}
                            color={colors.warnaDetail}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textHeader}>Check Out</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.isi}>
                        <Text style={styles.alamat}>
                            Is the address correctly selected?
                        </Text>
                        <CardAlamat
                            alamat={alamat}
                            kota={kota}
                            provinsi={provinsi}
                            navigation={navigation}
                        />

                        <View style={styles.hargaTotal}>
                            <Text style={styles.text}>Count Price</Text>
                            <Text style={styles.text}>
                                Rp. {numberWithCommas(totalHarga)}
                            </Text>
                        </View>

                        <Pilihan
                            label="Choose Ekspedisi"
                            datas={ekspedisi}
                            selectedValue={ekspedisiSelected}
                            onValueChange={ekspedisiSelected =>
                                this.changeEkspedisi(ekspedisiSelected)
                            }
                        />

                        <Text style={styles.text}>Shipping Cost</Text>

                        <View style={styles.ongkir}>
                            <Text style={styles.text1}>Heavy {totalBerat} kg</Text>
                            <Text style={styles.text}>Rp. {numberWithCommas(ongkir)}</Text>
                        </View>

                        <View style={styles.ongkir}>
                            <Text style={styles.text1}>Estimeted Time (Day)</Text>
                            <Text style={styles.text}>{estimasi}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bawah}>
                    <View style={styles.hargaTotal}>
                        <Text style={styles.text}>Count Price</Text>
                        <Text style={styles.text}>
                            Rp. {numberWithCommas(totalHarga + ongkir)}
                        </Text>
                    </View>

                    <Tombol
                        title="PAY"
                        type="text"
                        fontSize={18}
                        padding={10}
                        onPress={() => this.Pay()}
                        loading={snapTransactionsLoading}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    CityDetailLoading: state.ReducerRakir.CityDetailLoading,
    CityDetailResult: state.ReducerRakir.CityDetailResult,
    CityDetailError: state.ReducerRakir.CityDetailError,

    ongkirResult: state.ReducerRakir.ongkirResult,

    snapTransactionsLoading: state.PaymentReducer.snapTransactionsLoading,
    snapTransactionsResult: state.PaymentReducer.snapTransactionsResult,
});

export default connect(mapStateToProps, null)(CheckOut);

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
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
        paddingTop: 20,
    },
    isi: {
        paddingHorizontal: 30,
    },
    alamat: {
        fontSize: 15,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
    },
    hargaTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
        marginTop: 8,
    },
    text1: {
        fontSize: 16,
        fontFamily: fonts.primary.regular,
        marginTop: 5,
    },
    ongkir: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bawah: {
        backgroundColor: colors.warnaScreen,
        width: responsiveWidth(425),
        height: 120,
        marginTop: responsiveHeight(170),
        paddingHorizontal: 30,
        elevation: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
});
