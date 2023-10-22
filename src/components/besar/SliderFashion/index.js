import React, { Component } from 'react';
import { StyleSheet, View, Modal, StatusBar } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SliderBox } from 'react-native-image-slider-box';
import { responsiveHeight, colors, responsiveWidth } from '../../../utils';

export default class SliderFashion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openImage: false,
            previewImage: false,
        };
    }

    clickPreview = index => {
        this.setState({
            openImage: true,
            previewImage: [
                {
                    url: this.props.images[index],
                    props: {
                        //On your can set source directory.
                        source: this.props.images[index],
                    },
                },
            ],
        });
    };

    render() {
        const { images } = this.props;
        const { openImage, previewImage } = this.state;
        return (
            <View>
                <SliderBox
                    images={images}
                    autoplay
                    circleLoop
                    sliderBoxHeight={responsiveHeight(380)}
                    ImageComponentStyle={styles.fashion}
                    dotStyle={styles.dotStyle}
                    dotColor={colors.warnaDetail}
                    inactiveDotColor="#ffffff"
                    imageLoadingColor={colors.warnaUtama}
                    onCurrentImagePressed={index => this.clickPreview(index)}
                />

                <Modal
                    visible={openImage}
                    transparent={true}
                    onRequestClose={() => this.setState({ openImage: false })}>
                    <ImageViewer
                        imageUrls={previewImage}
                        backgroundColor={colors.warnaScreen}
                        onClick={() => this.setState({ openImage: false })}
                        enableSwipeDown
                        onSwipeDown={() => this.setState({ openImage: false })}
                    />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fashion: {
        width: responsiveWidth(400),
        height: responsiveHeight(480),
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginTop: 35,
    },
});
