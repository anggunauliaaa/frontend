import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TambahProdukScreen({ navigation }) {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    // Mengatur header
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Tambah Produk Baru',
            headerShown: true,
        });
    }, [navigation]);

    const handleAddProduct = () => {
        if (!productName || !category || !price || !stock) {
            Alert.alert('Error', 'Semua field wajib diisi!');
            return;
        }
        // Logika untuk menambah produk ke database/state
        Alert.alert('Sukses', `Produk '${productName}' berhasil ditambahkan.`);
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Nama Produk</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Paracetamol 500mg"
                        value={productName}
                        onChangeText={setProductName}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Kategori</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: Obat Demam"
                        value={category}
                        onChangeText={setCategory}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Harga</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: 15000"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Stok Awal</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Contoh: 100"
                        value={stock}
                        onChangeText={setStock}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Foto Produk</Text>
                    <TouchableOpacity style={styles.imagePicker}>
                        <Ionicons name="camera-outline" size={24} color="#666" />
                        <Text style={styles.imagePickerText}>Pilih Foto</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleAddProduct}>
                    <Text style={styles.submitButtonText}>Simpan Produk</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
    container: { padding: 20 },
    formGroup: { marginBottom: 16 },
    label: { fontFamily: 'Poppins_700Bold', fontSize: 14, color: '#333', marginBottom: 8 },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
    },
    imagePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        justifyContent: 'center',
    },
    imagePickerText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#666', marginLeft: 8 },
    submitButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 24,
    },
    submitButtonText: { color: 'white', fontFamily: 'Poppins_700Bold', fontSize: 16 },
});

