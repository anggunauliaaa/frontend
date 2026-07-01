import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CartContext } from '../context/CartContext';


const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const { addToCart } = useContext(CartContext);

  const handleBuyNow = () => {
    // Arahkan langsung ke Checkout dengan produk ini
    navigation.navigate('Checkout', { productsToCheckout: [{ ...item, quantity: 1 }] });
  };

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { product: item })} activeOpacity={0.9}>
      <View>
        {item.image ? (
          <Image source={item.image} style={styles.productImage} />
        ) : (
          <View style={styles.imagePlaceholder}><Text style={styles.imagePlaceholderText}>Image Segera Hadir</Text></View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.productName} numberOfLines={2}>{item.nama_obat}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.newPrice}>Rp{item.harga.toLocaleString('id-ID')}</Text>
            {item.oldPrice && <Text style={styles.oldPrice}>Rp{item.oldPrice.toLocaleString('id-ID')}</Text>}
          </View>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <MaterialCommunityIcons name="cart-plus" size={18} color="white" />
            <Text style={styles.addToCartButtonText}>Tambah</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
            <Text style={styles.buyButtonText}>Beli Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    overflow: 'hidden',
    width: 160,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#888',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
  },
  infoContainer: {
    padding: 10,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#333',
    marginBottom: 5,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  newPrice: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#007AFF',
    marginRight: 8,
  },
  oldPrice: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#a9a9a9',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#28A745', // Green for add to cart
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  addToCartButtonText: {
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
    marginLeft: 5,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
  },
});

export default ProductCard;