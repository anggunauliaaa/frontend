import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Data dummy untuk produk
const dummyProducts = [
    { id: '1', name: 'Paracetamol 500mg', stock: 150, image: require('../../assets/paracetamol.jpeg')},
    { id: '2', name: 'Antangin JRG', stock: 75, image: require('../../assets/antangin jrg.jpeg')},
    { id: '3', name: 'Bodrex', stock: 7, image: require('../../assets/bodrex.png')},
    { id: '4', name: 'Vitamin C IPI', stock: 200, image: require('../../assets/vitamin c ipi.jpeg')},
];

const ProductStockItem = ({ item }) => (
    <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
            <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.itemStock}>Stok: <Text style={item.stock < 10 ? styles.lowStock : styles.normalStock}>{item.stock}</Text></Text>
        </View>
        <View style={styles.itemActions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => alert(`Edit ${item.name}`)}>
                <Ionicons name="pencil-outline" size={20} color="#007AFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => alert(`Tambah stok ${item.name}`)}>
                <Ionicons name="add-circle-outline" size={22} color="#28A745" />
            </TouchableOpacity>
        </View>
    </View>
);

export default function KelolaStokScreen({ navigation }) {
    // Mengatur header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Kelola Stok',
            headerShown: true,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <FlatList
                data={dummyProducts}
                renderItem={({ item }) => <ProductStockItem item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <Text style={styles.headerTitle}>Daftar Produk</Text>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
    listContainer: { padding: 16 },
    headerTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 12,
    },
    itemName: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 15,
        color: '#333',
    },
    itemStock: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    lowStock: {
        color: '#FF3B30',
        fontFamily: 'Poppins_700Bold',
    },
    normalStock: {
        color: '#28A745',
        fontFamily: 'Poppins_700Bold',
    },
    itemActions: {
        flexDirection: 'row',
    },
    actionButton: {
        padding: 8,
        marginLeft: 8,
    },
});;