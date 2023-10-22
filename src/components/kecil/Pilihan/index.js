import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, responsiveHeight } from '../../../utils';
import { Picker } from '@react-native-picker/picker';

const Pilihan = ({
    label,
    datas,
    width,
    height,
    fontSize,
    selectedValue,
    onValueChange,
}) => {
    return (
        <View>
            <Text style={styles.label(fontSize)}>{label}</Text>
            <View style={styles.editPicker}>
                <Picker
                    selectedValue={selectedValue}
                    style={styles.picker2(width, height, fontSize)}
                    onValueChange={onValueChange}>
                    <Picker.Item label="Choose" value="" />
                    {datas.map((item, index) => {
                        if (label == 'Province') {
                            return (
                                <Picker.Item
                                    label={item.province}
                                    value={item.province_id}
                                    key={item.province_id}
                                />
                            );
                        } else if (label == 'City') {
                            return (
                                <Picker.Item
                                    label={item.type + ' ' + item.city_name}
                                    value={item.city_id}
                                    key={item.city_id}
                                />
                            );
                        } else if (label == 'Choose Ekspedisi') {
                            return (
                                <Picker.Item label={item.label} value={item} key={item.id} />
                            );
                        } else {
                            return <Picker.Item label={item} value={item} key={index} />;
                        }
                    })}
                </Picker>
            </View>
        </View>
    );
};

export default Pilihan;

const styles = StyleSheet.create({
    label: fontSize => ({
        fontSize: fontSize ? fontSize : 15,
        fontFamily: fonts.primary.bold,
        color: colors.warnaBlack,
    }),
    editPicker: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.warnaDetail,
        marginTop: 5,
    },
    picker2: (fontSize, width, height) => ({
        fontSize: fontSize ? fontSize : 15,
        fontFamily: fonts.primary.bold,
        height: height ? height : responsiveHeight(20),
        marginBottom: 40,
    }),
});
