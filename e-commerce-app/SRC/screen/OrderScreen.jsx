import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';

// --- KOMPONEN TAB ---

const UnpaidScreen = () => {
    const navigation = useNavigation();
    const { orders } = useOrders();

    const handlePayNow = (order) => {
        // Arahkan ke halaman instruksi pembayaran dengan detail dari pesanan
        navigation.navigate('PaymentInstruction', { paymentDetails: order.paymentDetails });
    };

    return (<FlatList
        data={orders.unpaid}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <Image source={item.image} style={styles.productImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productInfo}>Jumlah: {item.quantity}</Text>
                    <Text style={styles.totalPriceLabel}>Total Harga:</Text>
                    <Text style={styles.totalPriceValue}>Rp{(item.paymentDetails?.total || 0).toLocaleString('id-ID')}</Text>
                </View>
                <TouchableOpacity style={styles.payButton} onPress={() => handlePayNow(item)}>
                    <Text style={styles.payButtonText}>Bayar Sekarang</Text>
                </TouchableOpacity>
            </View>
        )}
    />);
};

const PackedScreen = () => {
    const { orders } = useOrders();
    return (<FlatList
        data={orders.packed}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <View style={styles.statusHeader}>
                    <MaterialCommunityIcons name="package-variant-closed" size={20} color="#FFA500" />
                    <Text style={styles.statusTextPacked}>Sedang Dikemas</Text>
                </View>
                <View style={styles.cardBody}>
                    <Image source={item.image} style={styles.productImageSmall} />
                    <View style={styles.cardContent}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productInfo}>Jumlah: {item.quantity}</Text>
                        <Text style={styles.productInfo}>Estimasi: {item.eta}</Text>
                    </View>
                </View>
            </View>
        )}
    />);
};

const ShippedScreen = () => {
    const navigation = useNavigation();
    const { orders } = useOrders();

    const handleTrackOrder = (order) => {
        navigation.navigate('Tracking', { order });
    };
    return (<FlatList
        data={orders.shipped}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <View style={styles.statusHeader}>
                    <MaterialCommunityIcons name="truck-delivery-outline" size={20} color="#007AFF" />
                    <Text style={styles.statusTextShipped}>Sedang Dikirim</Text>
                </View>
                 <View style={styles.cardBody}>
                    <Image source={item.image} style={styles.productImageSmall} />
                    <View style={styles.cardContent}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productInfo}>No. Resi: {item.resi}</Text>
                    </View>
                </View>
                <View style={styles.trackingContainer}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressStep, item.progress >= 1 && styles.progressStepActive]}>
                            <View style={[styles.progressCircle, item.progress >= 1 && styles.progressCircleActive]} />
                            <Text style={styles.progressLabel}>Dikirim</Text>
                        </View>
                        <View style={[styles.progressLine, item.progress >= 2 && styles.progressLineActive]} />
                        <View style={[styles.progressStep, item.progress >= 2 && styles.progressStepActive]}>
                            <View style={[styles.progressCircle, item.progress >= 2 && styles.progressCircleActive]} />
                            <Text style={styles.progressLabel}>Menuju Alamat</Text>
                        </View>
                        <View style={[styles.progressLine, item.progress >= 3 && styles.progressLineActive]} />
                        <View style={[styles.progressStep, item.progress >= 3 && styles.progressStepActive]}>
                            <View style={[styles.progressCircle, item.progress >= 3 && styles.progressCircleActive]} />
                            <Text style={styles.progressLabel}>Tiba</Text>
                        </View>
                    </View>
                    <Text style={styles.locationText}><Ionicons name="location-sharp" size={14} /> Paket sedang berada di <Text style={{fontFamily: 'Poppins_700Bold'}}>{item.location}</Text></Text>
                    <Text style={styles.etaText}>Perkiraan tiba: {item.eta}</Text>
                </View>
                <TouchableOpacity style={styles.trackButton} onPress={() => handleTrackOrder(item)}>
                    <Text style={styles.trackButtonText}>Lacak</Text>
                </TouchableOpacity>
            </View>
        )}
    />);
};

const CompletedScreen = () => {
    const navigation = useNavigation();
    const { orders } = useOrders();
    const { addToCart } = useCart();

    const handleBuyAgain = (item) => {
        // Buat objek baru yang kompatibel dengan keranjang
        const productToAdd = {
            ...item,
            newPrice: item.price, // Ubah 'price' menjadi 'newPrice'
        };
        addToCart(productToAdd);
        navigation.navigate('Cart');
    };
    return (<FlatList
        data={orders.completed}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
            <View style={styles.card}>
                <View style={styles.statusHeader}>
                    <Ionicons name="checkmark-circle" size={20} color="#28A745" />
                    <Text style={styles.statusTextCompleted}>Selesai</Text>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <View style={styles.cardBody}>
                    <Image source={item.image} style={styles.productImageSmall} />
                    <View style={styles.cardContent}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.totalPriceValue}>Rp{item.price.toLocaleString('id-ID')}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.buyAgainButton} onPress={() => handleBuyAgain(item)}>
                    <Text style={styles.buyAgainButtonText}>Beli Lagi</Text>
                </TouchableOpacity>
            </View>
        )}
    />);
};

const Tab = createMaterialTopTabNavigator();

export default function OrderScreen() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Pesanan Saya</Text>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#007AFF',
                    tabBarInactiveTintColor: 'gray',
                    tabBarLabelStyle: { fontFamily: 'Poppins_700Bold', fontSize: 12, textTransform: 'none' },
                    tabBarIndicatorStyle: { backgroundColor: '#007AFF', height: 3 },
                    tabBarStyle: { backgroundColor: 'white' },
                }}
            >
                <Tab.Screen name="Belum Bayar" component={UnpaidScreen} />
                <Tab.Screen name="Dikemas" component={PackedScreen} />
                <Tab.Screen name="Dikirim" component={ShippedScreen} />
                <Tab.Screen name="Selesai" component={CompletedScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

// --- STYLES ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white' },
    header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 20, color: '#333', textAlign: 'center' },
    listContainer: { padding: 16, backgroundColor: '#F8F9FA' },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    // Card Content
    cardBody: { flexDirection: 'row', alignItems: 'center' },
    productImage: { width: 100, height: 100, borderRadius: 8, marginRight: 16 },
    productImageSmall: { width: 70, height: 70, borderRadius: 8, marginRight: 16 },
    cardContent: { flex: 1 },
    productName: { fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#333', marginBottom: 4 },
    productInfo: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#666' },
    totalPriceLabel: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#666', marginTop: 8 },
    totalPriceValue: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#333' },
    
    // Status
    statusHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 8 },
    statusTextPacked: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#FFA500', marginLeft: 8 },
    statusTextShipped: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#007AFF', marginLeft: 8 },
    statusTextCompleted: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#28A745', marginLeft: 8 },
    dateText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#666', marginLeft: 'auto' },

    // Buttons
    payButton: { backgroundColor: '#007AFF', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 16 },
    payButtonText: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: 'white' },
    buyAgainButton: { borderColor: '#007AFF', borderWidth: 1.5, borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 16 },
    buyAgainButtonText: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#007AFF' },
    trackButton: { backgroundColor: '#E9F5FF', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 16 },
    trackButtonText: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#007AFF' },

    // Tracking Section
    trackingContainer: { marginTop: 16, padding: 12, backgroundColor: '#F8F9FA', borderRadius: 8 },
    progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    progressStep: { alignItems: 'center', opacity: 0.5 },
    progressStepActive: { opacity: 1 },
    progressCircle: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#D0D0D0', marginBottom: 6 },
    progressCircleActive: { backgroundColor: '#28A745' },
    progressLine: { flex: 1, height: 3, backgroundColor: '#D0D0D0' },
    progressLineActive: { backgroundColor: '#28A745' },
    progressLabel: { fontFamily: 'Poppins_400Regular', fontSize: 10, color: '#666' },
    locationText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#333', textAlign: 'center' },
    etaText: { fontFamily: 'Poppins_400Regular', fontSize: 12, color: '#666', textAlign: 'center', marginTop: 4 },
});
