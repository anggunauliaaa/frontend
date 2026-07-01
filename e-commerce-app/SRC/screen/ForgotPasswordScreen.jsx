import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        if (!email) {
            Alert.alert('Error', 'Silakan masukkan alamat email Anda.');
            return;
        }
        // Logika untuk mengirim email reset password (simulasi)
        console.log('Mengirim email reset ke:', email);
        Alert.alert(
            'Permintaan Terkirim',
            `Jika email ${email} terdaftar, kami telah mengirimkan instruksi untuk mengatur ulang kata sandi Anda.`,
            [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Ionicons name="key-outline" size={80} color="#007AFF" style={{ marginBottom: 20 }} />
                <Text style={styles.title}>Lupa Kata Sandi?</Text>
                <Text style={styles.subtitle}>Jangan khawatir! Masukkan email Anda di bawah ini untuk menerima instruksi pengaturan ulang kata sandi.</Text>

                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={22} color="#888" style={styles.icon} />
                    <TextInput
                        placeholder="Email Anda"
                        style={styles.input}
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword} activeOpacity={0.8}>
                    <Text style={styles.resetButtonText}>Kirim Instruksi</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
    backButton: { position: 'absolute', top: 20, left: 20, zIndex: 1 },
    title: { fontSize: 26, fontFamily: 'Poppins_700Bold', color: '#333', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 16, fontFamily: 'Poppins_400Regular', color: '#666', marginBottom: 40, textAlign: 'center' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '100%',
        paddingHorizontal: 15,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    icon: { marginRight: 10 },
    input: {
        flex: 1,
        height: 55,
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#333',
    },
    resetButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        width: '100%',
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
        elevation: 10,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    resetButtonText: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
    },
});

export default ForgotPasswordScreen;
