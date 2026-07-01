import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';

// Data Dummy - Hanya produk yang memiliki harga lama (diskon)
const promoProducts = [
    { id: '1', name: 'Paracetamol 500mg', image: require('../../assets/paracetamol.jpeg'), newPrice: 8000, oldPrice: 10000 },
    { id: '2', name: 'Antangin JRG', image: require('../../assets/antangin jrg.jpeg'), newPrice: 25000, oldPrice: 30000 },
    { id: '6', name: 'Madu Herbal TJ', image: require('../../assets/madu herbal tj.jpeg'), newPrice: 45000, oldPrice: 50000 },
    { id: '10', categoryId: '4', name: 'Hansaplast', image: require('../../assets/hansaplast.jpeg'), newPrice: 15000, oldPrice: 18000 },
    { id: '11', categoryId: '5', name: 'Masker Medis', image: require('../../assets/masker medis.jpeg'), newPrice: 22000, oldPrice: 28000 },
    { id: '12', categoryId: '3', name: 'Vitamin C IPI', image: require('../../assets/vitamin c ipi.jpeg'), newPrice: 12500, oldPrice: 15000 },
];

export default function PromotionScreen({ navigation }) {
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = (item) => {
        addToCart(item);
        Alert.alert('Berhasil', `${item.name} telah ditambahkan ke keranjang.`);
    };

    const renderProductCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.cardContent}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.newPrice}>Rp{item.newPrice.toLocaleString('id-ID')}</Text>
                    {item.oldPrice && (
                        <Text style={styles.oldPrice}>Rp{item.oldPrice.toLocaleString('id-ID')}</Text>
                    )}
                </View>
                <TouchableOpacity style={styles.buyButton} onPress={() => handleAddToCart(item)}>
                    <Text style={styles.buyButtonText}>Beli</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Promo Spesial Untukmu</Text>
            </View>
            <FlatList
                data={promoProducts}
                renderItem={renderProductCard}
                keyExtractor={item => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Latar belakang abu-abu muda
    },
    header: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    headerTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        color: '#333',
        textAlign: 'center',
    },
    listContainer: {
        paddingHorizontal: 8,
        paddingTop: 16,
    },
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    productImage: {
        width: '100%',
        height: 140,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 12,
    },
    productName: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#333',
        height: 40, // Memberi ruang untuk 2 baris
    },
    priceContainer: {
        marginTop: 8,
        alignItems: 'flex-start',
    },
    newPrice: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        color: '#007AFF', // Warna biru utama
    },
    oldPrice: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#a9a9a9',
        textDecorationLine: 'line-through',
        marginTop: 2,
    },
    buyButton: {
        marginTop: 12,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    buyButtonText: {
        fontFamily: 'Poppins_700Bold',
        color: 'white',
        fontSize: 14,
    },
});
