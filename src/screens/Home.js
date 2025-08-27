import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import AppSkeleton from '../components/AppSkeleton';
// import Map from '../components/Map';
import OrderRequestModal from '../components/OrderRequestModal';
import { useOrderRequest } from '../context/OrderRequestContext';
import Colors from '../assets/colors/Color';
import { scale, verticalScale } from '../utils/helper';
import { fonts } from '../assets/fonts/Fonts';
import Header from '../components/BacKHeader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import api from '../utils/apiUrl';
import PopUp from '../Popup/PopUp';
import Loader from '../components/Loader';
import { useQuery } from '@tanstack/react-query';
import { getOrderList } from '../services/order';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector(state => state?.user);
  const navigation = useNavigation();

  const DashboardCard = ({ title, value, subtitle, icon, color, onPress }) => (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: color }]}
      onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>{icon}</Text>
          <Text style={[styles.cardValue, { color: color }]}>{value}</Text>
        </View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  const { data: orderData, isLoading: isLoadingOrderList, refetch } = useQuery({
    queryKey: ['orderList', userData?.data?._id],
    queryFn: () => getOrderList(userData?.data?._id),
    enabled: !!userData?.data?._id,
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      console.log(data, 'Dataaaaaa');
    },
    onError: (error) => {
      console.log(error, 'Error');
      PopUp.show('Error', 'error', 3000, 'There is an Error');
    },
  })

  useFocusEffect(
    useCallback(() => {
      if (userData?.data?._id) {
        refetch();
      }
    }, [refetch]),
  );

  console.log(orderData, 'Order Data');
  return (
    <>
      <AppSkeleton disableScroll={true}>
        <View
          style={{
            backgroundColor: Colors?.orange,
            bottom: verticalScale(19),
            padding: scale(16),
            width: '110%',
            alignSelf: 'center',
            borderBottomLeftRadius: scale(15),
            borderBottomRightRadius: scale(15),
          }}>
          <Header
            text={'Dashboard'}
            showText={true}
            iconColor={Colors?.white}
            color={Colors?.white}
            type={3}
          />

          <View style={styles.headerImageContainer}>
            <Image
              source={require('../assets/images/bgImg.png')}
              style={styles.headerImage}
              resizeMode="cover"
            />
            <View style={styles.headerOverlay}>
              <View style={styles.headerContent}>
                <Image
                  source={require('../assets/images/package1.png')}
                  style={styles.headerIcon}
                  resizeMode="contain"
                />
                <Text style={styles.headerImageTitle}>Welcome</Text>
                <Text style={styles.headerImageSubtitle}>
                  Ready to deliver today?
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          {/* Header Image Section */}

          <View style={styles.cardRow}>
            <DashboardCard
              title="Order Delivered"
              value={orderData?.totalDeliverdOrder}
              subtitle="This week"
              icon="📦"
              color={Colors.verify}
            // onPress={() => console.log('Order Delivered pressed')}
            />
            <DashboardCard
              title="Current Order"
              value={orderData?.todayOrdersCount}
              subtitle="Active deliveries"
              icon="🚚"
              color={Colors.orange}
              onPress={() =>
                navigation.navigate('BottomTabs', {
                  screen: 'Order',
                  params: {
                    order: orderData,
                  },
                })
              }
            />
          </View>

          <View style={styles.cardRow}>
            <DashboardCard
              title="Return Order"
              value={orderData?.todayReturnOrdersCount}
              subtitle="Pending returns"
              icon="↩️"
              color={Colors.red}
            // onPress={() => console.log('Return Order pressed')}
            />
          </View>
        </ScrollView>

        {/* <OrderRequestModal onAccept={handleAcceptOrder} /> */}
      </AppSkeleton>
      <Loader loading={isLoadingOrderList} />
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.white,
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(20),
    paddingHorizontal: scale(20),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  headerTitle: {
    fontSize: scale(24),
    fontFamily: fonts.bold,
    color: Colors.white,
    marginBottom: verticalScale(5),
  },
  headerSubtitle: {
    fontSize: scale(16),
    fontFamily: fonts.regular,
    color: Colors.white,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(20),
    flex: 1,
    marginHorizontal: scale(5),
    borderLeftWidth: scale(4),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  cardIcon: {
    fontSize: scale(24),
  },
  cardValue: {
    fontSize: scale(32),
    fontFamily: fonts.bold,
  },
  cardTitle: {
    fontSize: scale(16),
    fontFamily: fonts.semiBold,
    color: Colors.blackV2,
    marginBottom: verticalScale(5),
  },
  cardSubtitle: {
    fontSize: scale(14),
    fontFamily: fonts.regular,
    color: Colors.lightGrey,
  },
  quickActionsSection: {
    marginTop: verticalScale(30),
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: scale(20),
    fontFamily: fonts.bold,
    color: Colors.blackV2,
    marginBottom: verticalScale(15),
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    padding: scale(20),
    flex: 1,
    marginHorizontal: scale(5),
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
  },
  actionButtonIcon: {
    fontSize: scale(24),
    marginBottom: verticalScale(8),
  },
  actionButtonText: {
    fontSize: scale(14),
    fontFamily: fonts.medium,
    color: Colors.blackV2,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
  },
  refreshButton: {
    position: 'absolute',
    top: verticalScale(50),
    right: scale(20),
    backgroundColor: 'white',
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  refreshButtonText: {
    fontSize: scale(20),
  },
  headerImageContainer: {
    height: verticalScale(200),
    position: 'relative',
    marginTop: verticalScale(5),
  },
  headerImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerContent: {
    position: 'absolute',
    top: verticalScale(20),
    left: scale(20),
    right: scale(20),
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerIcon: {
    width: scale(50),
    height: scale(50),
    marginBottom: verticalScale(15),
  },
  headerImageTitle: {
    fontSize: scale(24),
    fontFamily: fonts.bold,
    color: Colors.white,
    marginBottom: verticalScale(5),
  },
  headerImageSubtitle: {
    fontSize: scale(16),
    fontFamily: fonts.regular,
    color: Colors.white,
    opacity: 0.9,
  },
});
