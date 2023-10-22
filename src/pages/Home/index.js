import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { BannerSlider, HeaderComponent, Jarak, ListFashion, ListJenis } from '../../components';
import { colors, fonts, responsiveWidth } from '../../utils';
import { connect } from 'react-redux';
import { getCategory } from '../../actions/CategoryAction';
import { favoriteFashion } from '../../actions/FashionAction';

class Home extends Component {

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.dispatch(getCategory())
            this.props.dispatch(favoriteFashion())
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={styles.yard}>
                <StatusBar barStyle="light-content" backgroundColor={colors.warnaUtama} translucent />
                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>

                    <HeaderComponent navigation={navigation} page="Home" />

                    <View style={styles.pilihKategori}>
                        <Text style={styles.label}>Category</Text>
                        <Jarak height={10} />
                        <ListJenis navigation={navigation} />
                    </View>

                    <BannerSlider />

                    <View style={styles.pilihFashion}>
                        <Text style={styles.label}>Choose a your Fashion</Text>
                        <Jarak width={15} />
                        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ListStore')}>
                            <Text style={styles.allView}>View All</Text>
                        </TouchableOpacity>

                        <ListFashion navigation={navigation} />

                    </View>
                    <Jarak height={100} />
                </ScrollView>
            </View>
        );
    }
}


export default connect()(Home)

const styles = StyleSheet.create({
    yard: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
    },
    pilihKategori: {
        marginHorizontal: 30,
        marginTop: 10,
    },
    label: {
        fontSize: 18,
        fontFamily: fonts.primary.regular,
        color: colors.warnaBlack,
    },
    pilihFashion: {
        marginHorizontal: 30,
        marginTop: 20,
    },
    container: {
        marginTop: -30,
        backgroundColor: colors.warnaDetail,
        padding: 6,
        marginLeft: responsiveWidth(250),
        borderRadius: 8,
    },
    allView: {
        fontSize: 14,
        fontFamily: fonts.primary.bold,
        color: colors.warnaScreen,
        textAlign: 'center',
    },
})

//showsHorizontalScrollIndicator: jika indikator scroll disamping tidak ingin ditampilkan,
//page untuk membedakan antara liststore dan home