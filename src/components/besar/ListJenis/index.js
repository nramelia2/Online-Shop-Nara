import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../../utils';
import { CardJenis } from '../../kecil';

const ListJenis = ({
    getCategoryLoading,
    getCategoryResult,
    getCategoryError,
    navigation,
}) => {
    return (
        <View style={styles.container}>
            {getCategoryResult ? (
                Object.keys(getCategoryResult).map(key => {
                    return (
                        <CardJenis
                            jeniss={getCategoryResult[key]}
                            key={key}
                            navigation={navigation}
                            id={key}
                        />
                    ); //cardJenis sudah mengandung jenisnya, fungsi key agar tidak ada warning
                })
            ) : getCategoryLoading ? (
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.warnaUtama} />
                </View>
            ) : getCategoryError ? (
                <Text>{getCategoryError}</Text>
            ) : (
                <Text>Blank Data</Text>
            )}
        </View>
    );
};

const mapStateToProps = state => ({
    getCategoryLoading: state.CategorysReducer.getCategoryLoading,
    getCategoryResult: state.CategorysReducer.getCategoryResult,
    getCategoryError: state.CategorysReducer.getCategoryError,
});

export default connect(mapStateToProps, null)(ListJenis);

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

//key={key} - hanya bertugas untuk mapping, jika ada looping
