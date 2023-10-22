import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { getCategoryToStore } from '../../../actions/FashionAction';
import { responsiveHeight, responsiveWidth } from '../../../utils';

const CardJenis = ({ jeniss, navigation, id, dispatch }) => {
    const byCategoryToStore = (id, namaCategory) => {
        //ke Fashion Action
        dispatch(getCategoryToStore(id, namaCategory));

        //navigate ke List Storecls
        navigation.navigate('ListStore');
    };

    return (
        <TouchableOpacity
            onPress={() => byCategoryToStore(id, jeniss.namaCategory)}>
            <Image source={{ uri: jeniss.image }} style={styles.jenisKat} />
        </TouchableOpacity>
    );
};

export default connect()(CardJenis);

const styles = StyleSheet.create({
    jenisKat: {
        width: responsiveWidth(70),
        height: responsiveHeight(100),
        borderRadius: 10,
    },
});
