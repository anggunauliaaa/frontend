import React from 'react';
import { View, Text, StyleSheet, StatusBar, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const BackgroundIcon = ({ name, size, top, left, right, bottom, rotation, opacity = 0.1 }) => (
    <MaterialCommunityIcons
        name={name}
        size={size}
        color="#007AFF"
        style={{
            position: 'absolute',
            top,
            left,
            right,
            bottom,
            opacity,
            transform: [{ rotate: `${rotation}deg` }],
        }}
    />
);

export default function SplashScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

            {/* Decorative Background Icons */}
            <BackgroundIcon name="pill" size={80} top="10%" left="10%" rotation={-15} />
            <BackgroundIcon name="medical-bag" size={60} top="20%" right="15%" rotation={10} />
            <BackgroundIcon name="bandage" size={70} bottom="25%" left="5%" rotation={20} />
            <BackgroundIcon name="heart-pulse" size={90} bottom="5%" right="10%" rotation={-10} />
            <BackgroundIcon name="dna" size={100} top="40%" left="-5%" rotation={-25} opacity={0.05} />
            <BackgroundIcon name="microscope" size={100} bottom="40%" right="-10%" rotation={15} opacity={0.05} />


            <View style={styles.content}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../../assets/logo_medimart.png')} 
                        style={{ width: 100, height: 100, resizeMode: 'contain' }}
                    />
                </View>
                <Text style={styles.title}>MediMart</Text>
                <Text style={styles.subtitle}>Solusi Obat Terpercaya</Text>
            </View>

            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Latar belakang putih bersih
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#E9F5FF', // Biru sangat lembut
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 42,
        fontFamily: 'Poppins_700Bold',
        color: '#007AFF', // Warna biru utama
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#666',
        marginTop: 4,
    },
    loader: {
        position: 'absolute',
        bottom: 80,
    },
});
