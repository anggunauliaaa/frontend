import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

const CheckoutScreen = ({ route, navigation }) => {
  const { removeFromCart, getDiscount, getShippingCost } = useCart();
  const { createOrder } = useOrders();
  // Tambahkan pengecekan untuk memastikan route.params tidak undefined
  const { productsToCheckout = [], totals = {} } = route.params || {};
  
  // Hitung ulang subtotal di sini untuk memastikan akurasi
  const subtotal = productsToCheckout.reduce((sum, item) => sum + (item.newPrice * item.quantity), 0);
  const totalDiscount = productsToCheckout.reduce((sum, item) => item.oldPrice ? sum + (item.oldPrice - item.newPrice) * item.quantity : sum, 0);
  const shipping = totals.shipping || 10000; // Gunakan ongkir dari totals atau default
  const total = subtotal - totalDiscount + shipping;
  
  const [shippingAddress, setShippingAddress] = useState({
    name: 'John Doe',
    phone: '081234567890',
    address: 'Jl. Contoh No. 123, Kota Contoh, Provinsi Contoh, 12345',
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');

  const handlePlaceOrder = async () => {
    // 1. Buat objek pesanan
    const orderData = {
      products: productsToCheckout,
      paymentMethod: selectedPaymentMethod,
      total: total,
      shippingAddress: shippingAddress,
    };

    // 2. Panggil createOrder dari context
    const newOrder = await createOrder(orderData);

    if (!newOrder) {
      Alert.alert('Gagal', 'Terjadi kesalahan saat memproses pesanan.');
      return;
    }

    // 3. Hapus item yang sudah di-checkout dari keranjang
    productsToCheckout.forEach(item => removeFromCart(item.id));

    // 4. Navigasi berdasarkan metode pembayaran
    if (newOrder?.status === 'Dikemas') { // COD
      Alert.alert('Pesanan Berhasil!', 'Pesanan Anda dengan metode COD sedang disiapkan.');
      navigation.popToTop();
      navigation.navigate('MainApp', { screen: 'Pesanan', params: { screen: 'Dikemas' } });
    } else { // Metode pembayaran lain
      if (!newOrder?.paymentDetails) {
        Alert.alert('Gagal', 'Detail pembayaran tidak ditemukan.');
        return;
      }
      navigation.replace('PaymentInstruction', {
        order: newOrder,
      });
    }
  };

  const paymentMethods = [
    { key: 'COD', label: 'Cash On Delivery (COD)' },
    { key: 'Transfer Bank', label: 'Transfer Bank' },
    { key: 'OVO', label: 'Dompet Digital (OVO)' },
    { key: 'DANA', label: 'Dompet Digital (DANA)' },
    { key: 'GoPay', label: 'Dompet Digital (GoPay)' },
    { key: 'BRI', label: 'Virtual Account (BRI)' },
    { key: 'BCA', label: 'Virtual Account (BCA)' },
    { key: 'Mandiri', label: 'Virtual Account (Mandiri)' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Order Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
          {productsToCheckout.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <Text style={styles.orderItemName}>{item.name} (x{item.quantity})</Text>
              <Text style={styles.orderItemPrice}>Rp{(item.newPrice * item.quantity).toLocaleString('id-ID')}</Text>
            </View>
          ))}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>Rp{subtotal.toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Potongan Harga</Text>
            <Text style={[styles.summaryValue, styles.discountValue]}>- Rp{totalDiscount.toLocaleString('id-ID')}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Ongkos Kirim</Text>
            <Text style={styles.summaryValue}>Rp{shipping.toLocaleString('id-ID')}</Text>
          </View>
          <View style={[styles.summaryRow, styles.grandTotalRow]}>
            <Text style={styles.grandTotalLabel}>Total Akhir</Text>
            <Text style={styles.grandTotalValue}>Rp{total.toLocaleString('id-ID')}</Text>
          </View>
        </View>

        {/* Shipping Address */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Lengkap"
            value={shippingAddress.name}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nomor Telepon"
            value={shippingAddress.phone}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, phone: text })}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat Lengkap"
            value={shippingAddress.address}
            onChangeText={(text) => setShippingAddress({ ...shippingAddress, address: text })}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.key}
              style={styles.paymentMethodOption}
              onPress={() => setSelectedPaymentMethod(method.key)}
            >
              <MaterialCommunityIcons
                name={selectedPaymentMethod === method.key ? 'radiobox-marked' : 'radiobox-blank'}
                size={24}
                color={selectedPaymentMethod === method.key ? '#007AFF' : '#A9A9A9'}
              />
              <Text style={styles.paymentMethodText}>{method.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.bottomBarTotal}>
          <Text style={styles.bottomBarTotalLabel}>Total Pembayaran</Text>
          <Text style={styles.bottomBarTotalValue}>Rp{total.toLocaleString('id-ID')}</Text>
        </View>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderButtonText}>Buat Pesanan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 100, // Make space for bottom bar
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  orderItemName: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  orderItemPrice: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  summaryLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
  },
  discountValue: {
    color: '#28A745', // Green for discount
  },
  grandTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    marginTop: 10,
  },
  grandTotalLabel: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#333',
  },
  grandTotalValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
    color: '#007AFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
  },
  paymentMethodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  paymentMethodText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  bottomBarTotal: {
    flex: 1,
  },
  bottomBarTotalLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#666',
  },
  bottomBarTotalValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 18,
    color: '#007AFF',
  },
  placeOrderButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  placeOrderButtonText: {
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;
