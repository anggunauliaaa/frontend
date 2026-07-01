import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

import ProductCard from '../components/ProductCard.jsx';
import { CartContext } from '../context/CartContext';

// Data Dummy Kategori
const categories = [
    { id: '1', name: 'Obat Demam', icon: 'thermometer' },
    { id: '2', name: 'Obat Batuk', icon: 'lungs' },
    { id: '3', name: 'Vitamin', icon: 'pill' },
    { id: '4', name: 'Obat Luka', icon: 'bandage' },
    { id: '5', name: 'Alkes', icon: 'stethoscope' },
    { id: '6', name: 'Alergi', icon: 'allergy' },
    { id: '7', name: 'Imun Booster', icon: 'shield-check-outline' },
    { id: '8', name: 'Herbal', icon: 'leaf' },
];

export default function HomeScreen({ navigation }) {

    const { getCartItemCount } = useContext(CartContext);

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {

            const response = await axios.get(
                'http://192.168.1.5:8000/api/obat'
            );

            console.log('HASIL API :');
            console.log(response.data);

            setProducts(response.data);

        } catch (error) {

            console.log('ERROR AXIOS');
            console.log(error);

        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <ScrollView style={styles.container}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.searchBar}
                        onPress={() => navigation.navigate('Cari')}
                        activeOpacity={0.8}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="search" size={20} color="#007AFF" />
                            <Text style={styles.searchInputPlaceholder}>
                                Cari obat, vitamin, & alkes...
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cartButton}
                        onPress={() => navigation.navigate('Cart')}
                    >
                        <Ionicons name="cart-outline" size={28} color="#007AFF" />

                        {getCartItemCount() > 0 && (
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>
                                    {getCartItemCount()}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={styles.categoryContainer}>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.categoryItem}
                                onPress={() =>
                                    navigation.navigate('Category', {
                                        categoryId: item.id,
                                        categoryName: item.name,
                                    })
                                }
                            >
                                <MaterialCommunityIcons
                                    name={item.icon}
                                    size={28}
                                    color="#007AFF"
                                />
                                <Text style={styles.categoryText}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.id}
                        numColumns={4}
                        scrollEnabled={false}
                    />
                </View>

                {/* Banner */}
                <View style={styles.promoBanner}>
                    <View style={styles.promoTextContainer}>
                        <Text style={styles.promoTitle}>Promo Sehat</Text>
                        <Text style={styles.promoSubtitle}>
                            Diskon hingga 20%
                        </Text>
                    </View>

                    <Image
                        source={require('../../assets/promo.png')}
                        style={styles.promoImage}
                    />
                </View>

                {/* Produk */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        Produk Populer
                    </Text>

                    <View style={styles.productGrid}>
                        {products.map((item, index) => (
                            <ProductCard
                                key={index}
                                item={item}
                            />
                        ))}
                    </View>
                </View>

                {/* Rekomendasi */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>
                        Rekomendasi Untukmu
                    </Text>

                    <FlatList
                        data={[...products].reverse()}
                        renderItem={({ item }) => (
                            <ProductCard item={item} />
                        )}
                        keyExtractor={(item, index) =>
                            index.toString()
                        }
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 8,
                        }}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9F5FF',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    searchInputPlaceholder: {
        flex: 1,
        marginLeft: 10,
        color: '#007AFF',
    },
    cartButton: {
        marginLeft: 15,
    },
    cartBadge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: '#007AFF',
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    categoryContainer: {
        padding: 16,
        backgroundColor: 'white',
    },
    categoryItem: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
    },
    categoryText: {
        fontSize: 11,
        textAlign: 'center',
        marginTop: 5,
        color: '#333',
    },
    promoBanner: {
        margin: 16,
        padding: 20,
        backgroundColor: '#007AFF',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    promoTextContainer: {
        flex: 1,
    },
    promoTitle: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
    promoSubtitle: {
        fontSize: 14,
        color: 'white',
    },
    promoImage: {
        width: 100,
        height: 80,
        borderRadius: 10,
        marginLeft: 16,
    },
    sectionContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginHorizontal: 16,
        marginBottom: 10,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});