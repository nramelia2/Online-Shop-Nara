import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
} from 'react-native';
import { colors, fonts } from '../../../utils';
import CardKeranjang from '../../kecil/CardKeranjang';

const ListKeranjang = ({ getCartResult, getCartLoading, getCartError }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View>
                {getCartResult ? (
                    Object.keys(getCartResult.pesanans).map(key => {
                        return (
                            <CardKeranjang
                                keranjang={getCartResult.pesanans[key]}
                                mainCart={getCartResult}
                                key={key}
                                id={key}
                            />
                        );
                    })
                ) : getCartLoading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator color={colors.warnaUtama} />
                    </View>
                ) : getCartError ? (
                    <Text>{getCartError}</Text>
                ) : (
                    <View style={styles.blankData}>
                        <Image source={require('../../../assets/image/keranjangs.png')} />
                        <Text style={styles.textOrders}>No orders yet</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

export default ListKeranjang;

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30,
    },
    blankData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 200,
    },
    textOrders: {
        marginTop: 10,
        fontSize: 25,
        fontFamily: fonts.primary.bold,
        color: colors.border,
    },
});
