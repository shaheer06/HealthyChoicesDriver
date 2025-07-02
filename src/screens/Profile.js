import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AppSkeleton from '../components/AppSkeleton';
import Header from '../components/BacKHeader';
import Icon from '../assets/icon/Icon';
import {moderateScale, scale, verticalScale} from '../utils/helper';
import Colors from '../assets/colors/Color';
import {fonts} from '../assets/fonts/Fonts';
import ImagePickerModal from '../components/ImagePickerModal';
import {useNavigation} from '@react-navigation/native';
import {profileArray} from '../assets/dummyData/dummyData';
import CustomButton from '../components/CustomButton';

const {height, width} = Dimensions.get('window');

const isTablet =
  height > 950 ? height * 0.15 : height * 0.2 && Platform.OS === 'ios';

const PROFILE_IMG_SIZE = width * 0.2;
const PROFILE_SECTION_HEIGHT = verticalScale(220);

const ProfileBox = ({item, onPress, style}) => {
  return (
    <TouchableOpacity
      style={[styles?.container, style]}
      activeOpacity={0.7}
      onPress={onPress}>
      {/* <View style={{flexDirection: 'row', gap: scale(5), alignItems: 'center'}}> */}
      {/* <Icon
          family={item?.iconFamily}
          name={item?.iconName}
          size={moderateScale(20)}
          color={Colors?.golden}
        /> */}
      <Text style={styles.txt}>{item?.title}</Text>
      {/* </View> */}
      <Icon family={'AntDesign'} name={'right'} size={moderateScale(20)} />
    </TouchableOpacity>
  );
};

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const navigation = useNavigation();

  const handleImagePicked = image => {
    setSelectedImage(image?.uri);
  };
  return (
    <>
      <AppSkeleton>
        <View style={styles.profileHeaderContainer}>
          {/* Main background */}
          <View style={styles.mainBackground} />

          {/* Decorative elements */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
          <View style={styles.decorativeCircle3} />
          <View style={styles.decorativeCircle4} />

          <Header
            styleContainer={{paddingHorizontal: scale(10)}}
            type={1}
            text={'Profile'}
            text3={{color: Colors?.white}}
            iconColor={Colors?.white}
            color={Colors?.white}
            showText={true}
            // onHamburgerPress={() => setSheetVisible(true)}
          />

          <View style={styles.profileContentContainer}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity
                style={styles.profileImageWrapper}
                onPress={() => setShowEditIcon(!showEditIcon)}>
                <View style={styles.profileImageBorder}>
                  <Image
                    source={
                      selectedImage
                        ? {uri: selectedImage}
                        : require('../assets/images/profile2.jpg')
                    }
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                </View>

                {showEditIcon && (
                  <TouchableOpacity
                    style={styles.editOverlay}
                    onPress={() => {
                      setModalVisible(true);
                      setShowEditIcon(false);
                    }}>
                    <View style={styles.editBackground} />
                    <View style={styles.editIconContainer}>
                      <Icon
                        family="Feather"
                        name="edit-3"
                        size={moderateScale(20)}
                        color={Colors.white}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>

            {/* {userData?.data?.name && ( */}
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>{'shaheer'}</Text>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Active</Text>
              </View>
            </View>
            {/* // )} */}
          </View>
        </View>

        <ScrollView style={styles?.main}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: scale(20)}}
        >
          {profileArray?.map((item, index) => (
            <ProfileBox
              item={item}
              key={index}
              onPress={() => navigation?.navigate(item?.routName)}
            />
          ))}
        </ScrollView>
        {/* <FlatList
          data={profileArray}
          contentContainerStyle={{gap:verticalScale(15)}}
          style={{width:"100%"}}
          keyExtractor={item => item?._id}
          renderItem={({item}) => {
            return (
              <ProfileBox
                item={item}
                onPress={() => navigation?.navigate(item?.routName)}
              />
            );
          }}
        /> */}
        <CustomButton 
        label={"Logout"}
        btnStyle={{alignSelf:'center',width:"100%"}}
        onPress={()=>navigation?.navigate("LoginScreen")}
        />
      </AppSkeleton>
      <ImagePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onImagePicked={handleImagePicked}
      />
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileHeaderContainer: {
    position: 'relative',
    height: height * 0.4,
    paddingBottom: verticalScale(19),
    // paddingTop: verticalScale(10),
    bottom: verticalScale(19),
    width: '110%',
    alignSelf: 'center',
    backgroundColor: Colors.orange,
    // borderBottomLeftRadius: scale(50),
    borderBottomRightRadius: width,
    overflow: 'hidden',
  },
  mainBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.orange,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.05,
    right: width * 0.1,
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: scale(30),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    top: height * 0.15,
    left: width * 0.05,
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: scale(24),
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  decorativeCircle3: {
    position: 'absolute',
    bottom: height * 0.05,
    right: width * 0.2,
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  decorativeCircle4: {
    position: 'absolute',
    bottom: height * 0.1,
    left: width * 0.15,
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: scale(16),
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  profileContentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: height * 0.08,
  },
  profileImageContainer: {
    alignItems: 'center',
    // marginBottom: verticalScale(15),
  },
  profileImageWrapper: {
    position: 'relative',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: verticalScale(4),
    },
    shadowOpacity: 0.3,
    shadowRadius: scale(8),
    // elevation: 8,
  },
  profileImageBorder: {
    width: PROFILE_IMG_SIZE + moderateScale(8),
    height: PROFILE_IMG_SIZE + moderateScale(8),
    borderRadius: (PROFILE_IMG_SIZE + scale(8)) / 2,
    backgroundColor: Colors.white,
    padding: scale(4),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: scale(8),
    // elevation: 5,
  },
  profileImage: {
    width: PROFILE_IMG_SIZE,
    height: PROFILE_IMG_SIZE,
    borderRadius: PROFILE_IMG_SIZE / 2,
  },
  nameContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: moderateScale(20),
    fontFamily: fonts?.bold,
    color: Colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: verticalScale(1)},
    textShadowRadius: scale(3),
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(4),
    borderRadius: scale(15),
  },
  statusDot: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: scale(4),
    backgroundColor: Colors.verify,
    marginRight: scale(6),
  },
  statusText: {
    fontSize: moderateScale(12),
    fontFamily: fonts?.medium,
    color: Colors.white,
  },
  editOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: (PROFILE_IMG_SIZE + scale(8)) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.6,
    borderRadius: (PROFILE_IMG_SIZE + scale(8)) / 2,
  },
  editIconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: 0.3,
    shadowRadius: scale(4),
    elevation: scale(4),
  },
  container: {
    backgroundColor: Colors?.white,
    elevation: 5,
    shadowColor: Colors?.black,
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.3,
    padding: verticalScale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: scale(5),
    flexDirection: 'row',
      borderWidth:0.17,
      // borderColor:Colors?.white
  },
  txt: {
    color: Colors?.black,
    fontFamily: fonts?.medium,
    fontSize: moderateScale(14),
  },
  main: {
    marginTop:
      Platform.OS === 'ios'
        ? height > 950
          ? height * 0.03
          : height * 0.02
        : height * 0.04,
 
  },
});
