import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display';
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { AuthProvider, useAuth } from './SRC/context/AuthContext';
import { SearchProvider } from './SRC/context/SearchContext';
import { CartProvider, useCart } from './SRC/context/CartContext';
import { OrderProvider } from './SRC/context/OrderContext';


// Import screens
import SplashScreen from './SRC/screen/SplashScreen.jsx';
import LoginScreen from './SRC/screen/LoginScreen.jsx';
import RegisterScreen from './SRC/screen/RegisterScreen.jsx';
import HomeScreen from './SRC/screen/HomeScreen.jsx';
import CartScreen from './SRC/screen/CartScreen.jsx';
import SearchScreen from './SRC/screen/SearchScreen.jsx';
import PromotionScreen from './SRC/screen/promotionScreen.jsx';
import CheckoutScreen from './SRC/screen/CheckoutScreen.jsx';
import PaymentInstructionScreen from './SRC/screen/PaymentInstructionScreen.jsx';
import TrackingScreen from './SRC/screen/TrackingScreen.jsx';
import OrderScreen from './SRC/screen/OrderScreen.jsx';
import CategoryScreen from './SRC/screen/CategoryScreen.jsx';
import ProductDetailScreen from './SRC/screen/ProductDetailScreen.jsx';
import AccountScreen from './SRC/screen/AccountScreen.jsx';
import KelolaStokScreen from './SRC/screen/KelolaStokScreen.jsx';
import TambahProdukScreen from './SRC/screen/TambahProdukScreen.jsx';
import UserGuideScreen from './SRC/screen/UserGuideScreen.jsx';
import HelpCenterScreen from './SRC/screen/HelpCenterScreen.jsx';
import ForgotPasswordScreen from './SRC/screen/ForgotPasswordScreen.jsx';
import EditProfileScreen from './SRC/screen/EditProfileScreen.jsx';

import DashboardScreen from './SRC/screen/DashboardScreen.jsx'; // Import Dashboard
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainAppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Beranda') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cari') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Promosi') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Pesanan') {
            iconName = focused ? 'cube' : 'cube-outline';
          } else if (route.name === 'Akun') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarLabelStyle: { fontFamily: 'Poppins_400Regular' }
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Beranda" component={HomeScreen} />
      <Tab.Screen name="Cari" component={SearchScreen} />
      <Tab.Screen name="Promosi" component={PromotionScreen} />
      <Tab.Screen name="Pesanan" component={OrderScreen} />
      <Tab.Screen name="Akun" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function AppNavigation() {
  const { userToken, isLoading } = useAuth();
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  let [fontsLoaded] = useFonts({
    PlayfairDisplay_400Regular,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 2000); // Delay 2 detik (2000 ms)
    return () => clearTimeout(timer);
  }, []);

  // Tampilkan layar loading sampai font selesai dimuat
  if (isLoading || !fontsLoaded || isSplashVisible) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          // Tumpukan Autentikasi (jika tidak login)
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        ) : (
          // Tumpukan Aplikasi Utama (jika sudah login)
          <>
            <Stack.Screen name="MainApp" component={MainAppTabs} />
            <Stack.Screen name="Category" component={CategoryScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: true, title: 'Keranjang Belanja' }} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: true, title: 'Checkout' }} />
            <Stack.Screen name="PaymentInstruction" component={PaymentInstructionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Tracking" component={TrackingScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="KelolaStok" component={KelolaStokScreen} />
            <Stack.Screen name="TambahProduk" component={TambahProdukScreen} />
            <Stack.Screen name="UserGuide" component={UserGuideScreen} options={{ headerShown: true }} />
            <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SearchProvider>
        <OrderProvider>
          <CartProvider>
            <SafeAreaProvider>
              <AppNavigation />
            </SafeAreaProvider>
          </CartProvider>
        </OrderProvider>
      </SearchProvider>
    </AuthProvider>
  );
}
