import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSearch } from '../context/SearchContext';

const SearchScreen = () => {
    const navigation = useNavigation();
    const [query, setQuery] = useState('');
    const { searchProducts, results, isLoading, error } = useSearch();

    const handleSearch = (text) => {
        setQuery(text);
        searchProducts(text); // Langsung cari setiap kali teks berubah
    };

    const renderProductItem = ({ item }) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#007AFF" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Cari obat, vitamin, & alkes..."
                    value={query}
                    onChangeText={handleSearch}
                    autoFocus={true}
                />
            </View>

            {isLoading ? (
                <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
            ) : error ? (
                <Text style={styles.messageText}>{error}</Text>
            ) : results.length === 0 && query.length > 0 ? (
                <Text style={styles.messageText}>Produk tidak ditemukan.</Text>
            ) : (
                <FlatList
                    data={results}
                    renderItem={renderProductItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.resultsList}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E9F5FF', // Warna sesuai tema di HomeScreen
        borderRadius: 20, // Border radius sesuai tema
        margin: 15,
        paddingHorizontal: 10,
        paddingVertical: 8, // Padding vertikal agar lebih seimbang
    },
    searchIcon: { marginRight: 10 },
    input: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#007AFF',
    },
    messageText: { textAlign: 'center', marginTop: 20, color: 'gray', fontFamily: 'Poppins_400Regular' },
    resultsList: { paddingHorizontal: 15 },
    productItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    productImage: { width: 70, height: 70, borderRadius: 5, marginRight: 15 },
    productInfo: { flex: 1, justifyContent: 'center' },
    productName: { fontSize: 16, fontFamily: 'Poppins_400Regular' },
    productPrice: { fontSize: 14, color: '#888', marginTop: 4 },
});

export default SearchScreen;
