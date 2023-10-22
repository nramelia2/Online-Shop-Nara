import React, { Component, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    StatusBar,
} from 'react-native';
import {
    colors,
    fonts,
    heightMobileUI,
    responsiveWidth,
    responsiveHeight,
    numberWithCommas,
    getData,
} from '../../utils';
import { Inputan, SliderFashion, Tombol, Pilihan, Jarak } from '../../components';
import { RFValue } from 'react-native-responsive-fontsize';
import { connect } from 'react-redux';
import { addCart } from '../../actions/CartAction';

class FashionDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: this.props.route.params.category,
            images: this.props.route.params.category.gambar,
            jumlah: '',
            ukuran: '',
            warna: '',
            information: '',
            uid: '',
        };
    }

    componentDidUpdate(prevProps) {
        const { saveCartResult } = this.props;

        if (saveCartResult && prevProps.saveCartResult !== saveCartResult) {
            this.props.navigation.navigate('Keranjang');
        }
    }

    addCart = () => {
        const { jumlah, warna, ukuran } = this.state;

        getData('user').then(res => {
            if (res) {
                //simpan uid local storage ke state
                this.setState({
                    uid: res.uid,
                });

                //validasi (user bener2 mengisi form atau tidak)
                if (jumlah && warna && ukuran) {
                    //hubungkan ke action (CartAction)
                    this.props.dispatch(addCart(this.state));
                } else {
                    Alert.alert(
                        'Error',
                        'Must fill in the count, color, size and information available in full.',
                    );
                }
            } else {
                Alert.alert('Error', 'Please login first to do the next process.');
                this.props.navigation.replace('Login');
            }
        });
    };

    render() {
        const { navigation, saveCartLoading } = this.props;
        const { category, images, jumlah, ukuran, warna, information } = this.state;
        return (
            <View style={styles.page}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.warnaDetail}
                    translucent
                />

                <View style={styles.back}>
                    <Tombol
                        icon="panahBack"
                        padding={7}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <SliderFashion images={images} />

                <View style={styles.container}>
                    <Jarak height={5} />
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.edit}>
                        <View style={styles.nameAndPrice}>
                            <Text style={styles.nama}>{category.nama[0]}</Text>
                        </View>
                        <Jarak height={20} />
                        <Text style={styles.bahan}>Material : {category.bahan}</Text>
                        <Text style={styles.deskripsi}>Description</Text>
                        <Text style={styles.deskripsi2}>{category.deskripsi}</Text>

                        <View style={styles.garis} />

                        <Jarak height={5} />

                        <View style={styles.count}>
                            <Inputan
                                label="Count"
                                value={jumlah}
                                onChangeText={jumlah => this.setState({ jumlah })}
                            />
                        </View>

                        <Jarak height={10} />

                        <View>
                            <Pilihan
                                label="Color"
                                width={responsiveWidth(166)}
                                height={responsiveHeight(43)}
                                fontSize={13}
                                datas={category.warna}
                                selectedValue={warna}
                                onValueChange={warna => this.setState({ warna })}
                            />
                            <Jarak height={10} />
                            <Pilihan
                                label="Size"
                                width={responsiveWidth(166)}
                                height={responsiveHeight(43)}
                                fontSize={13}
                                datas={category.ukuran}
                                selectedValue={ukuran}
                                onValueChange={ukuran => this.setState({ ukuran })}
                            />
                            <Jarak height={10} />
                        </View>

                        <Inputan
                            label="Note"
                            textarea
                            fontSize={13}
                            placeholder="Write a caption here, if you want to request a card for gifts and the like."
                            value={information}
                            onChangeText={information => this.setState({ information })}
                        />

                        <Jarak height={15} />
                    </ScrollView>

                    <View style={styles.underCart}>
                        <Text style={styles.harga}>
                            Rp. {numberWithCommas(category.harga)}
                        </Text>
                        <Jarak width={10} />
                        <View style={styles.addCart}>
                            <Tombol
                                title="ADD CART"
                                type="text"
                                padding={responsiveHeight(15)}
                                fontSize={18}
                                onPress={() => this.addCart()}
                                loading={saveCartLoading}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    saveCartLoading: state.cartReducer.saveCartLoading,
    saveCartResult: state.cartReducer.saveCartResult,
    saveCartError: state.cartReducer.saveCartError,
});

export default connect(mapStateToProps, null)(FashionDetail);

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        height: responsiveHeight(400),
        width: responsiveWidth(415),
        backgroundColor: colors.warnaScreen,
    },
    back: {
        position: 'absolute',
        marginLeft: 30,
        marginTop: 50,
        zIndex: 1, //agar bisa diback pada detail
    },
    edit: {
        marginHorizontal: 30,
    },
    harga: {
        //flex: 1,
        fontSize: RFValue(24, heightMobileUI),
        fontFamily: fonts.primary.bold,
        color: colors.warnaDetail,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 13,
    },
    nama: {
        fontSize: RFValue(24, heightMobileUI),
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack,
        marginTop: 3,
    },
    pajangan: {
        alignItems: 'flex-end',
        marginRight: 30,
    },
    bahan: {
        fontSize: 14,
        fontFamily: fonts.primary.regular,
        color: colors.warnaBlack,
        marginTop: -15,
    },
    deskripsi: {
        fontSize: 14,
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack,
        marginTop: 5,
    },
    deskripsi2: {
        fontSize: 14,
        fontFamily: fonts.primary.regular,
        color: colors.warnaBlack,
        marginTop: 3,
        textAlign: 'justify',
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    garis: {
        borderColor: colors.warnaDetail,
        borderWidth: 1,
        marginTop: 10,
    },
    pilihan: {
        paddingVertical: 20,
    },
    count: {
        flexDirection: 'row',
    },
    addCart: {
        marginBottom: 20,
        flex: 1,
        marginRight: 30,
    },
    nameAndPrice: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonCount: {
        flexDirection: 'row',
    },
    buttonClick: {
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.warnaDetail,
        borderRadius: 3,
        padding: 10,
    },
    beetweenCount: {
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    beetweenText: {
        fontFamily: fonts.primary.regular,
        fontSize: 18,
        color: colors.warnaBlack,
    },
    underCart: {
        flexDirection: 'row',
    },
});
