import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, StatusBar } from 'react-native';
import { HeaderComponent, Jarak, ListFashion, ListJenis } from '../../components';
import { colors, fonts, responsiveWidth } from '../../utils';
import { dummyDetailKat, dummyJenis } from '../../data'
import { connect } from 'react-redux';
import { getFashion } from '../../actions/FashionAction';
import { getCategory } from '../../actions/CategoryAction';

class ListStore extends Component {

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            const { idCategory, keyword } = this.props //kalau ditaro diatas tidak terbaca
            this.props.dispatch(getCategory())
            this.props.dispatch(getFashion(idCategory, keyword))
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentDidUpdate(prevProps) {
        const { idCategory, keyword } = this.props

        if (idCategory && prevProps.idCategory !== idCategory) {
            this.props.dispatch(getFashion(idCategory, keyword))
        }

        if (keyword && prevProps.keyword !== keyword) {
            this.props.dispatch(getFashion(idCategory, keyword))
        }
    }


    render() {
        const { navigation, namaCategory, keyword } = this.props
        return (
            <View style={styles.yard}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

                <HeaderComponent navigation={navigation} page="ListStore" />

                <Jarak height={50} />

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.container}>
                    <View style={styles.pilihFashion}>

                        {keyword ? <Text style={styles.label}>
                            <Text style={styles.label}>Search </Text>
                            {keyword}
                        </Text> : <Text style={styles.label}>
                            <Text style={styles.label}>Choose a your </Text>
                            {namaCategory ? namaCategory : 'Fashion'}
                        </Text>}

                        <Jarak width={15} />
                        <ListFashion navigation={navigation} />
                    </View>
                    <Jarak height={100} />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    idCategory: state.FashionReducer.idCategory,
    namaCategory: state.FashionReducer.namaCategory,
    keyword: state.FashionReducer.keyword,
})

export default connect(mapStateToProps, null)(ListStore)


const styles = StyleSheet.create({
    yard: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
    },
    pilihKategori: {
        marginHorizontal: 30,
        marginTop: responsiveWidth(10),
    },
    label: {
        fontSize: 20,
        fontFamily: fonts.primary.regular,
        color: colors.warnaBlack
    },
    pilihFashion: {
        marginHorizontal: 30,
        marginTop: 20,
    },
    container: {
        marginTop: -60,
    },
})

//showsHorizontalScrollIndicator: jika indikator scroll disamping tidak ingin ditampilkan,