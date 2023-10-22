import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import {
    colors,
    fonts,
    getData,
    responsiveHeight,
    responsiveWidth,
} from '../../utils';
import { Inputan, InputanBorder, Jarak, Pilihan, Tombol } from '../../components';
import { connect } from 'react-redux';
import { ListKota, ListProvinsi } from '../../actions/RakirAction';
import { DefaultImage } from '../../assets';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updateProfile } from '../../actions/profileAction';
import BottomSheet from 'react-native-js-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: '',
            name: '',
            email: '',
            numberphone: '',
            alamat: '',
            provinsi: false,
            kota: false,
            avatar: '',
            avatarForDB: '',
            oldAvatar: '',
            updateAvatar: false,
        };
    }

    //memanggil getUserData
    componentDidMount() {
        this.getUserData();
        this.props.dispatch(ListProvinsi());
    }

    //bisa diletakan dimana saja
    //komponene ketika props ada perubahan atau tidak
    //menggunakan replace karena tidak akan masuk ke dalam register lagi
    componentDidUpdate(prevProps) {
        const { updateProfileResult } = this.props;

        if (
            updateProfileResult &&
            prevProps.updateProfileResult !== updateProfileResult
        ) {
            Alert.alert('Success', 'Update Profile Success');
            this.props.navigation.replace('MainApp');
        }
    }

    getUserData = () => {
        getData('user').then(res => {
            const data = res;
            this.setState({
                uid: data.uid,
                name: data.name,
                email: data.email,
                numberphone: data.numberphone,
                alamat: data.alamat,
                provinsi: data.provinsi,
                kota: data.kota,
                avatar: data.avatar,
                oldAvatar: data.avatar,
            });
            console.log(data);
            this.props.dispatch(ListKota(data.provinsi)); //agar mengambil dari kota list
        });
    };

    changeProvince = provinsi => {
        this.setState({
            provinsi: provinsi,
        });

        this.props.dispatch(ListKota(provinsi));
    };

    getImage = () => {
        launchImageLibrary(
            {
                quality: 1,
                maxWidth: 500,
                maxHeight: 500,
                selectionLimit: 1,
                cameraType: 'front',
                includeBase64: true,
            },
            response => {
                if (response.didCancel || response.errorCode || response.errorMessage) {
                    Alert.alert('Eror', 'Sorry, choose your photo please!');
                } else {
                    const source = response.assets[0].uri; //tidak bisa langsung uri
                    const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;

                    this.setState({
                        avatar: source, //ditampilkan
                        avatarForDB: fileString, //untuk database,
                        updateAvatar: true,
                    });
                }
            },
        );
    };

    getImageCamera = () => {
        launchCamera(
            {
                quality: 1,
                maxWidth: 500,
                maxHeight: 500,
                selectionLimit: 1,
                cameraType: 'front',
                includeBase64: true,
            },
            response => {
                if (response.didCancel || response.errorCode || response.errorMessage) {
                    Alert.alert('Eror', 'Sorry, choose your photo please!');
                } else {
                    const source = response.assets[0].uri; //tidak bisa langsung uri
                    const fileString = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;

                    this.setState({
                        avatar: source, //ditampilkan
                        avatarForDB: fileString, //untuk database,
                        updateAvatar: true,
                    });
                }
            },
        );
    };

    submit = () => {
        const { name, numberphone, alamat, provinsi, kota } = this.state;

        if (name && numberphone && alamat && provinsi && kota) {
            //dispatch untuk update profile

            this.props.dispatch(updateProfile(this.state));
        } else {
            Alert.alert('Error', 'Please fill in everything available.');
        }
    };

    render() {
        const { name, email, numberphone, alamat, provinsi, kota, avatar } =
            this.state;
        const { ProvinceResult, CityResult, updateProfileLoading } = this.props;

        let bottomSheet = this.state;

        const _onPressButton = () => {
            bottomSheet.open();
        };

        return (
            <View style={styles.page}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={colors.warnaUtama}
                    translucent
                />
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                        <Icon
                            style={styles.icon}
                            name="chevron-left"
                            size={20}
                            color={colors.warnaDetail}
                        />
                    </TouchableOpacity>

                    <Text style={styles.textHeader}>Edit Profile</Text>
                </View>

                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <Text style={styles.label}>Photo Profile</Text>

                            <View style={styles.uploadPhoto}>
                                <Image
                                    source={avatar ? { uri: avatar } : DefaultImage}
                                    style={styles.photo}
                                />

                                <Jarak height={10} />

                                <View style={styles.tombolPhoto}>
                                    <Tombol
                                        icon="camProfile"
                                        //title="Change Photo"
                                        padding={10}
                                        onPress={_onPressButton}
                                    />

                                    <BottomSheet
                                        title="Choose"
                                        ref={ref => (bottomSheet = ref)}
                                        itemDivider={3}
                                        backButtonEnabled={false}
                                        coverScreen={true}
                                        options={[
                                            {
                                                title: 'Upload photos in  Galery',
                                                icon: (
                                                    <MaterialCommunityIcons
                                                        name="camera-image"
                                                        color={colors.warnaDetail}
                                                        size={24}
                                                    />
                                                ),

                                                onPress: () => this.getImage(),
                                            },
                                            {
                                                title: 'Use Camera',
                                                icon: (
                                                    <MaterialCommunityIcons
                                                        name="camera"
                                                        color={colors.warnaDetail}
                                                        size={24}
                                                    />
                                                ),
                                                onPress: () => this.getImageCamera(),
                                            },
                                        ]}
                                        isOpen={false}
                                    />
                                </View>
                                <Jarak height={10} />
                            </View>
                        </View>

                        <InputanBorder
                            label="Name"
                            value={name}
                            onChangeText={name => this.setState({ name })}
                        />

                        <Jarak height={10} />

                        <InputanBorder label="Email" value={email} disabled />

                        <Jarak height={10} />

                        <InputanBorder
                            label="Number Phone"
                            value={numberphone}
                            onChangeText={numberphone => this.setState({ numberphone })}
                        />

                        <Jarak height={10} />

                        <Inputan
                            label="Address"
                            value={alamat}
                            onChangeText={alamat => this.setState({ alamat })}
                            textarea
                        />

                        <Jarak height={10} />

                        <Pilihan
                            label="Province"
                            datas={ProvinceResult ? ProvinceResult : []}
                            selectedValue={provinsi}
                            onValueChange={provinsi => this.changeProvince(provinsi)}
                            fontSize={15}
                        />
                        <Jarak height={10} />

                        <Pilihan
                            label="City"
                            datas={CityResult ? CityResult : []}
                            selectedValue={kota}
                            onValueChange={kota => this.setState({ kota: kota })}
                            fontSize={15}
                        />
                        <Jarak height={20} />

                        <Tombol
                            type="text"
                            title="SUBMIT"
                            padding={15}
                            loading={updateProfileLoading}
                            onPress={() => this.submit()}
                        />

                        <Jarak height={20} />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    ProvinceResult: state.ReducerRakir.ProvinceResult,
    CityResult: state.ReducerRakir.CityResult,

    updateProfileLoading: state.ProfileReducer.updateProfileLoading,
    updateProfileResult: state.ProfileReducer.updateProfileResult,
    updateProfileError: state.ProfileReducer.updateProfileError,
});

export default connect(mapStateToProps, null)(EditProfile);

const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    header: {
        backgroundColor: colors.warnaScreen,
        paddingVertical: 20,
        elevation: 3,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    icon: {
        marginRight: 20,
        marginTop: 20,
    },
    textHeader: {
        color: colors.warnaBlack,
        fontSize: 18,
        fontFamily: fonts.primary.bold,
        marginTop: 15,
        marginBottom: -10,
    },
    container: {
        flex: 1,
        backgroundColor: colors.warnaScreen,
        paddingHorizontal: 30,
        paddingTop: 15,
    },
    label: {
        fontSize: 20,
        fontFamily: fonts.primary.semibold,
        color: colors.warnaBlack,
    },
    photo: {
        width: responsiveWidth(160),
        height: responsiveHeight(160),
        borderRadius: 80,
        marginTop: 10,
        alignSelf: 'center',
    },
    tombolPhoto: {
        marginTop: -57,
        marginRight: -16,
        marginLeft: 68,
    },
    uploadPhoto: {
        marginHorizontal: 100,
    },
});

//disabled - karena email tidak bisa diganti/edit, maka harus di edit juga di InputanLogin
