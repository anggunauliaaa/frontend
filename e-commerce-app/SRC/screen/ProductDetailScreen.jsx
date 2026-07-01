import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

// Data Dummy untuk produk terkait
const relatedProducts = [
    { id: '7', categoryId: '3', name: 'Vitamin C IPI', image: require('../../assets/vitamin c ipi.jpeg'), newPrice: 15000 },
    { id: '8', categoryId: '5', name: 'Masker Medis', image: require('../../assets/masker medis.jpeg'), newPrice: 28000 },
    { id: '9', categoryId: '4', name: 'Hansaplast', image: require('../../assets/hansaplast.jpeg'), newPrice: 18000 },
    { id: '2', categoryId: '2', name: 'Antangin JRG', image: require('../../assets/antangin jrg.jpeg'), newPrice: 25000, oldPrice: 30000, discount: 17 },
];

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const { addToCart } = useCart();

    // Mengatur judul header secara dinamis
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: product.name,
            headerShown: true,
            headerTitleStyle: {
                fontFamily: 'Poppins_700Bold',
                color: '#333',
                fontSize: 16,
            },
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16, marginRight: 10 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
            ),
        });
    }, [navigation, product]);

    const handleAddToCart = () => {
        addToCart(product);
    };

    const handleBuyNow = () => {
        navigation.navigate('Checkout', { productsToCheckout: [{ ...product, quantity: 1 }] });
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView>
                {/* Gambar Produk */}
                {product.image ? (
                    <Image source={product.image} style={styles.productImage} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.imagePlaceholderText}>Image Segera Hadir</Text>
                    </View>
                )}

                <View style={styles.detailsContainer}>
                    {/* Info Produk */}
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.newPrice}>Rp{(product.price || product.newPrice).toLocaleString('id-ID')}</Text>
                        {product.oldPrice && <Text style={styles.oldPrice}>Rp{product.oldPrice.toLocaleString('id-ID')}</Text>}
                    </View>
                    <View style={styles.stockInfo}>
                        <Text style={styles.stockText}>Stok: <Text style={{ color: '#28A745' }}>Tersedia</Text></Text>
                    </View>

                    {/* Deskripsi Produk */}
                    <View style={styles.descriptionSection}>
                        <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
                        <Text style={styles.descriptionText}>
                            {product.name} adalah obat yang digunakan untuk meredakan gejala demam dan nyeri ringan hingga sedang.
                        </Text>

                        <Text style={styles.subSectionTitle}>Komposisi</Text>
                        <Text style={styles.descriptionText}>Setiap tablet mengandung Paracetamol 500 mg (contoh dummy).</Text>

                        <Text style={styles.subSectionTitle}>Manfaat dan Kegunaan</Text>
                        <Text style={styles.descriptionText}>- Meredakan sakit kepala dan sakit gigi.{"\n"}- Menurunkan demam.</Text>

                        <Text style={styles.subSectionTitle}>Aturan Pakai</Text>
                        <Text style={styles.descriptionText}>Dewasa: 1-2 tablet, 3-4 kali sehari. Anak-anak: Sesuai petunjuk dokter.</Text>

                        <Text style={styles.subSectionTitle}>Peringatan</Text>
                        <Text style={styles.descriptionText}>Hati-hati penggunaan pada penderita gangguan fungsi hati dan ginjal.</Text>
                    </View>
                </View>

                {/* Produk Terkait */}
                <View style={styles.relatedProductsSection}>
                    <Text style={styles.sectionTitle}>Produk Terkait</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 8 }}>
                        {relatedProducts.map(item => <ProductCard key={item.id} item={item} />)}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Tombol Aksi */}
            <View style={styles.bottomActions}>
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <MaterialCommunityIcons name="cart-plus" size={22} color="white" />
                    <Text style={styles.actionButtonText}>Tambah ke Keranjang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
                    <Text style={styles.actionButtonText}>Beli Sekarang</Text>
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
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    imagePlaceholder: {
        width: '100%',
        height: 300,
        backgroundColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#888',
    },
    detailsContainer: {
        padding: 16,
        backgroundColor: 'white',
    },
    productName: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 22,
        color: '#333',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    newPrice: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#007AFF',
        marginRight: 10,
    },
    oldPrice: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#a9a9a9',
        textDecorationLine: 'line-through',
    },
    stockInfo: {
        marginTop: 8,
        backgroundColor: '#E9F5FF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    stockText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#007AFF',
    },
    descriptionSection: {
        marginTop: 20,
    },
    sectionTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    subSectionTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 14,
        color: '#555',
        marginTop: 15,
        marginBottom: 5,
    },
    descriptionText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#666',
        lineHeight: 22,
    },
    relatedProductsSection: {
        marginTop: 10,
        paddingTop: 10,
        backgroundColor: '#F8F9FA',
    },
    bottomActions: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    addToCartButton: {
        flex: 1,
        backgroundColor: '#28A745',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 5,
    },
    buyNowButton: {
        flex: 1,
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    actionButtonText: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        marginLeft: 8,
    },
});

export default ProductDetailScreen;
