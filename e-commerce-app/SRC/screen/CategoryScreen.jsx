import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';

// Data Dummy - idealnya ini akan datang dari state global atau API
const products = [
    { id: '1', categoryId: '1', name: 'Paracetamol 500mg', image: require('../../assets/paracetamol.jpeg'), newPrice: 8000, oldPrice: 10000, discount: 20 },
    { id: '2', categoryId: '1', name: 'Panadol Extra', image: require('../../assets/panadol extra.jpeg'), newPrice: 12000 },
    { id: '3', categoryId: '2', name: 'Antangin JRG', image: require('../../assets/antangin jrg.jpeg'), newPrice: 25000, oldPrice: 30000, discount: 17 },
    { id: '4', categoryId: '2', name: 'Tolak Angin Cair', image: require('../../assets/tolakangin.jpeg'), newPrice: 4000 },
    { id: '5', categoryId: '3', name: 'Vitamin C IPI', image: require('../../assets/vitamin c ipi.jpeg'), newPrice: 15000 },
    { id: '6', categoryId: '3', name: 'Madu Herbal TJ', image: require('../../assets/madu herbal tj.jpeg'), newPrice: 45000, oldPrice: 50000, discount: 10 },
    { id: '7', categoryId: '4', name: 'Betadine Antiseptic', image: require('../../assets/betadine antiseptic.jpeg'), newPrice: 32000 },
    { id: '8', categoryId: '4', name: 'Hansaplast Roll', image: require('../../assets/hansaplast.jpeg'), newPrice: 18000 },
    { id: '9', categoryId: '5', name: 'Masker Medis Sensi', image: require('../../assets/masker medis.jpeg'), newPrice: 28000 },
    { id: '10', categoryId: '6', name: 'Cetrizine Tablet', image: require('../../assets/cetrizine.jpeg'),newPrice: 10.000 },
];

export default function CategoryScreen({ route, navigation }) {
  const { categoryId, categoryName } = route.params;

  // Mengatur judul header secara dinamis
  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerTitleStyle: {
        fontFamily: 'Poppins_700Bold',
        color: '#333',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, categoryName]);

  // Filter produk berdasarkan categoryId
  const filteredProducts = products.filter(p => p.categoryId === categoryId);

  const renderContent = () => {
    if (filteredProducts.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Belum ada produk untuk kategori ini.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#faf5f6',
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#a9a9a9',
  },
});