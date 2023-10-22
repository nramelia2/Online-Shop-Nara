import React from 'react';
import { Component } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { colors, getData, responsiveHeight } from '../../../utils';
import { IconSearch } from '../../../assets';
import { Tombols, Jarak, Judul } from '../../kecil';
import { connect } from 'react-redux';
import { saveKeywordFashion } from '../../../actions/FashionAction';
import { getCart } from '../../../actions/CartAction';
import { LinearGradient } from 'react-native-svg';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seacrh: '',
        };
    }

    //menampilkan jumlah keranjang
    componentDidMount() {
        getData('user').then(res => {
            if (res) {
                //udah login
                this.props.dispatch(getCart(res.uid));
            }
        });
    }

    resultSearch = () => {
        const { page, navigation, dispatch } = this.props;
        const { seacrh } = this.state;

        //Jalankan action save keywor
        dispatch(saveKeywordFashion(seacrh));

        //jika di Home maka akan di navigate ke halaman List Store
        if (page !== 'ListStore') {
            navigation.navigate('ListStore');
        }

        //Kembalikan state seacrh ke string kosong
        this.setState({
            seacrh: '',
        });
    };

    render() {
        const { seacrh } = this.state;
        const { navigation, getCartResult } = this.props;

        let totalCart;

        if (getCartResult) {
            totalCart = Object.keys(getCartResult.pesanans).length;
            //length - jumlah keranjang
        }

        return (
            <View style={styles.container}>
                <View style={styles.kheader}>
                    <Judul />
                    <Jarak width={30} />
                    <Tombols
                        icon="camera"
                        padding={10}
                        onPress={() => navigation.navigate('ScanCamera')}
                    />
                    <Jarak width={8} />
                    <Tombols
                        icon="Keranjang"
                        padding={10}
                        onPress={() => navigation.navigate('Keranjang')}
                        totalCart={totalCart}
                    />
                </View>

                <View style={styles.cariFashion}>
                    <IconSearch />
                    <TextInput
                        placeholder="Search"
                        style={styles.inputText}
                        value={seacrh}
                        onChangeText={seacrh => this.setState({ seacrh })}
                        onSubmitEditing={() => this.resultSearch()}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    getCartResult: state.cartReducer.getCartResult,
});

export default connect(mapStateToProps, null)(HeaderComponent);

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.warnaUtama,
        height: responsiveHeight(190),
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 2,
    },
    cariFashion: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#EBF0FF',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 40,
        alignItems: 'center',
        marginHorizontal: 30,
        marginVertical: 10,
    },
    inputText: {
        fontSize: 15,
    },
    kheader: {
        marginTop: 40,
        marginLeft: 130,
        marginRight: 20,
        flexDirection: 'row',
    },
});
