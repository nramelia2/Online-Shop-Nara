import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Slider1, Slider2 } from '../../../assets';
import { SliderBox } from 'react-native-image-slider-box';
import { colors, responsiveHeight, responsiveWidth } from '../../../utils';

export default class BannerSlider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            images: [Slider1, Slider2], //bentuk array
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <SliderBox
                    images={this.state.images}
                    autoplay
                    circleLoop
                    sliderBoxHeight={responsiveHeight(170)}
                    ImageComponentStyle={styles.slider}
                    dotStyle={styles.dotStyle}
                    dotColor={colors.warnaDetail}
                    inactiveDotColor="#ffffff"
                    imageLoadingColor={colors.warnaDetail}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    slider: {
        borderRadius: 15,
        width: responsiveWidth(345),
    },
    dotStyle: {
        width: 10,
        height: 5,
        borderRadius: 5,
    },
});

//autoplay = agar gambar bergeser sendiri
//circleLoop = jika gambar sudah selesai play, maka dia akan mengulanginya lagi
//sliderBoxHeight = untuk tinggi
//ImageComponentStyle = untuk styling Image
//dotStyle = untuk mengganti warna titik-titik
