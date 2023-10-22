import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../utils';
import { CardDetailKat } from '../../kecil';

const ListFashion = ({
    navigation,
    getFashionLoading,
    getFashionResult,
    getFashionError,
}) => {
    return (
        <View style={styles.container}>
            {getFashionResult ? (
                Object.keys(getFashionResult).map(key => {
                    return (
                        <CardDetailKat
                            key={key}
                            category={getFashionResult[key]}
                            navigation={navigation}
                        />
                    ); //cardJenis sudah mengandung jenisnya, fungsi key agar tidak ada warning
                })
            ) : getFashionLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.warnaUtama} />
                </View>
            ) : getFashionError ? (
                <Text>{getFashionError}</Text>
            ) : getFashionError ? (
                <Text>{getFashionError}</Text>
            ) : (
                <Text>Blank Data</Text>
            )}
        </View>
    );
};

const mapStateToProps = state => ({
    getFashionLoading: state.FashionReducer.getFashionLoading,
    getFashionResult: state.FashionReducer.getFashionResult,
    getFashionError: state.FashionReducer.getFashionError,
});

export default connect(mapStateToProps, null)(ListFashion);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap', //jika gambar ingin kebawah
        justifyContent: 'space-between',
    },
    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 30,
    },
});

//key={key} - tidaj visa ngirim parameter, hanya untuk mapping saja (jika ada looping)
