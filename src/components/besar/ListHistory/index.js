import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    Image,
} from 'react-native';
import { connect } from 'react-redux';
import { colors, fonts } from '../../../utils';
import { CardHistory } from '../../kecil';

const ListHistory = ({ navigation, getHistoryLoading, getHistoryResult }) => {
    //operan
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                {getHistoryResult ? (
                    Object.keys(getHistoryResult).map(key => {
                        return (
                            <CardHistory
                                pesanan={getHistoryResult[key]}
                                key={key}
                                navigation={navigation}
                                id={key}
                            />
                        );
                    })
                ) : getHistoryLoading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color={colors.warnaDetail} />
                    </View>
                ) : (
                    <View style={styles.blankData}>
                        <Image source={require('../../../assets/image/history.png')} />
                        <Text style={styles.textOrders}>No history yet</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const mapStateToProps = state => ({
    getHistoryLoading: state.HistoryReducer.getHistoryLoading,
    getHistoryResult: state.HistoryReducer.getHistoryResult,
});

export default connect(mapStateToProps, null)(ListHistory);

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
    },
    loading: {
        flex: 1,
        marginTop: 10,
        marginBottom: 50,
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
