import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Fungsi untuk menambah produk ke keranjang
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if (existingItem) {
                // Jika produk sudah ada, tingkatkan kuantitasnya
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Jika produk baru, tambahkan ke keranjang dengan kuantitas 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        Alert.alert('Berhasil', `${product.name} telah ditambahkan ke keranjang.`);
    };

    // Fungsi untuk memperbarui kuantitas produk
    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            // Jika kuantitas kurang dari 1, hapus produk dari keranjang
            removeFromCart(productId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    // Fungsi untuk menghapus produk dari keranjang
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    // Fungsi untuk mengosongkan keranjang (biasanya setelah checkout)
    const clearCart = () => {
        setCartItems([]);
    };

    // Fungsi untuk mendapatkan total item di keranjang
    const getCartItemCount = () => {
        // Menjumlahkan kuantitas dari setiap item di keranjang
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Fungsi placeholder untuk mendapatkan diskon
    // Anda perlu mengimplementasikan logika diskon yang sebenarnya di sini
    const getDiscount = () => {
        return 0; // Contoh: tidak ada diskon untuk saat ini
    };

    // Fungsi placeholder untuk mendapatkan biaya pengiriman
    // Anda perlu mengimplementasikan logika biaya pengiriman yang sebenarnya di sini
    const getShippingCost = () => {
        // Contoh: biaya pengiriman tetap 10000.
        // Logika bisa lebih kompleks, misal berdasarkan berat, lokasi, dll.
        return 10000;
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeFromCart,
            getCartItemCount,
            getDiscount,
            getShippingCost,
            clearCart // Tambahkan fungsi clearCart ke context
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
