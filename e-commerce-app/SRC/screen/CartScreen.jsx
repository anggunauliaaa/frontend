import React, { useState, useMemo, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';

// Komponen untuk Checkbox kustom
const Checkbox = ({ value, onValueChange }) => (
    <TouchableOpacity onPress={onValueChange}>
        <MaterialCommunityIcons 
            name={value ? 'checkbox-marked' : 'checkbox-blank-outline'} 
            size={24} 
            color="#007AFF" 
        />
    </TouchableOpacity>
);

export default function CartScreen() {
    const navigation = useNavigation();
    const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);
    const [selectedItems, setSelectedItems] = useState(new Set());

    const isAllSelected = useMemo(() => 
        cartItems.length > 0 && selectedItems.size === cartItems.length,
        [cartItems, selectedItems]
    );

    // Toggle "Pilih Semua"
    const handleSelectAll = () => {
        const newSelectedItems = new Set();
        if (!isAllSelected) {
            cartItems.forEach(item => newSelectedItems.add(item.id));
        }
        setSelectedItems(newSelectedItems);
    };

    // Toggle item individual
    const handleSelectItem = (itemId) => {
        const newSelectedItems = new Set(selectedItems);
        if (newSelectedItems.has(itemId)) {
            newSelectedItems.delete(itemId);
        } else {
            newSelectedItems.add(itemId);
        }
        setSelectedItems(newSelectedItems);
    };

    // Kalkulasi total
    const { subtotal, totalDiscount, shipping, total } = useMemo(() => {
        let subtotal = 0;
        let totalDiscount = 0;
        const shipping = selectedItems.size > 0 ? 15000 : 0; // Contoh ongkir tetap

        cartItems.forEach(item => {
            if (selectedItems.has(item.id)) {
                subtotal += item.newPrice * item.quantity;
                if (item.oldPrice) {
                    totalDiscount += (item.oldPrice - item.newPrice) * item.quantity;
                }
            }
        });

        return {
            subtotal,
            totalDiscount,
            shipping,
            total: subtotal + shipping,
        };
    }, [cartItems, selectedItems]);

    // Navigasi ke Checkout
    const handleCheckout = () => {
        const productsToCheckout = cartItems.filter(item => selectedItems.has(item.id));
        navigation.navigate('Checkout', { 
            productsToCheckout,
            totals: { subtotal, totalDiscount, shipping, total }
        });
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Checkbox 
                value={selectedItems.has(item.id)}
                onValueChange={() => handleSelectItem(item.id)}
            />
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemPrice}>Rp{(item.newPrice || 0).toLocaleString('id-ID')}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.quantityButton}>
                        <Ionicons name="remove" size={18} color="#007AFF" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
                        <Ionicons name="add" size={18} color="#007AFF" />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={22} color="#FF3B30" />
            </TouchableOpacity>
        </View>
    );

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.emptyContainer}>
                    <Ionicons name="cart-outline" size={80} color="#a9a9a9" />
                    <Text style={styles.emptyText}>Keranjang Anda kosong</Text>
                    <Text style={styles.emptySubText}>Ayo, isi dengan produk kesehatan pilihanmu!</Text>
                    <TouchableOpacity style={styles.shopButton} onPress={() => navigation.navigate('MainApp', { screen: 'Beranda' })}>
                        <Text style={styles.shopButtonText}>Mulai Belanja</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.selectAllContainer}>
                <Checkbox value={isAllSelected} onValueChange={handleSelectAll} />
                <Text style={styles.selectAllText}>Pilih Semua</Text>
            </View>
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>Rp{subtotal.toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Diskon</Text>
                    <Text style={styles.summaryValueDiscount}>- Rp{totalDiscount.toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Ongkos Kirim</Text>
                    <Text style={styles.summaryValue}>Rp{shipping.toLocaleString('id-ID')}</Text>
                </View>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>Rp{total.toLocaleString('id-ID')}</Text>
                </View>
                <TouchableOpacity 
                    style={[styles.checkoutButton, selectedItems.size === 0 && styles.checkoutButtonDisabled]}
                    onPress={handleCheckout}
                    disabled={selectedItems.size === 0}
                >
                    <Text style={styles.checkoutButtonText}>Checkout ({selectedItems.size})</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
    listContainer: { paddingHorizontal: 16, paddingBottom: 8 },
    // Empty State
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    emptyText: { fontFamily: 'Poppins_700Bold', fontSize: 20, color: '#333', marginTop: 16 },
    emptySubText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#888', marginTop: 8, textAlign: 'center' },
    shopButton: { marginTop: 24, backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10 },
    shopButtonText: { fontFamily: 'Poppins_700Bold', color: 'white', fontSize: 16 },
    // Select All
    selectAllContainer: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
    selectAllText: { marginLeft: 12, fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#333' },
    // Cart Item
    itemContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 12, elevation: 1 },
    itemImage: { width: 70, height: 70, borderRadius: 8, marginHorizontal: 12 },
    itemDetails: { flex: 1, justifyContent: 'space-between' },
    itemName: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#333' },
    itemPrice: { fontFamily: 'Poppins_700Bold', fontSize: 15, color: '#007AFF', marginVertical: 4 },
    quantityContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, alignSelf: 'flex-start' },
    quantityButton: { padding: 6 },
    quantityText: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#333', paddingHorizontal: 12 },
    deleteButton: { padding: 8 },
    // Summary
    summaryContainer: { backgroundColor: 'white', padding: 16, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    summaryLabel: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#666' },
    summaryValue: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#333' },
    summaryValueDiscount: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#28A745' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
    totalLabel: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#333' },
    totalValue: { fontFamily: 'Poppins_700Bold', fontSize: 18, color: '#007AFF' },
    // Checkout Button
    checkoutButton: { backgroundColor: '#007AFF', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
    checkoutButtonDisabled: { backgroundColor: '#a9a9a9' },
    checkoutButtonText: { color: 'white', fontFamily: 'Poppins_700Bold', fontSize: 16 },
});
