import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const GuideSection = ({ title, icon, children }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Ionicons name={icon} size={22} color="#007AFF" />
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <View style={styles.sectionContent}>
            {children}
        </View>
    </View>
);

const GuidePoint = ({ text }) => (
    <Text style={styles.pointText}>• {text}</Text>
);

export default function UserGuideScreen({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Petunjuk Pengguna',
            headerShown: true,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.mainTitle}>Selamat Datang di Medimart!</Text>
                <Text style={styles.subtitle}>Berikut adalah panduan lengkap untuk menggunakan aplikasi kami.</Text>

                <GuideSection title="🔐 Akun Pengguna" icon="person-circle-outline">
                    <GuidePoint text="Registrasi: Buat akun baru melalui halaman 'Register' dengan mengisi nama, email, dan password." />
                    <GuidePoint text="Login: Masuk ke akun Anda menggunakan email dan password yang telah terdaftar." />
                </GuideSection>

                <GuideSection title="🔍 Mencari Produk" icon="search-outline">
                    <GuidePoint text="Gunakan bar pencarian di tab 'Cari' untuk menemukan produk berdasarkan nama." />
                    <GuidePoint text="Jelajahi produk berdasarkan kategori yang tersedia di halaman 'Beranda'." />
                </GuideSection>

                <GuideSection title="📦 Detail & Keranjang" icon="cube-outline">
                    <GuidePoint text="Klik pada produk untuk melihat detail lengkap, deskripsi, dan harga." />
                    <GuidePoint text="Tekan tombol 'Tambah ke Keranjang' untuk menyimpan produk yang ingin Anda beli." />
                    <GuidePoint text="Tekan 'Beli Sekarang' untuk langsung menuju ke halaman checkout dengan produk tersebut." />
                </GuideSection>

                <GuideSection title="🛒 Proses Checkout" icon="cart-outline">
                    <GuidePoint text="Buka keranjang Anda, pilih produk yang ingin dibeli dengan mencentangnya." />
                    <GuidePoint text="Tekan tombol 'Checkout', isi alamat, dan pilih metode pembayaran (COD, Transfer, dll.)." />
                    <GuidePoint text="Selesaikan pesanan dengan menekan 'Buat Pesanan'." />
                </GuideSection>

                <GuideSection title="💳 Pembayaran & Status Pesanan" icon="wallet-outline">
                    <GuidePoint text="Jika memilih transfer/VA, Anda akan diarahkan ke halaman instruksi pembayaran." />
                    <GuidePoint text="Status pesanan dapat dipantau di tab 'Pesanan' yang terbagi menjadi 'Belum Bayar', 'Dikemas', 'Dikirim', dan 'Selesai'." />
                    <GuidePoint text="Jika memilih COD, pesanan akan langsung masuk ke status 'Dikemas'." />
                </GuideSection>

                <GuideSection title="👤 Menu Lainnya" icon="apps-outline">
                    <GuidePoint text="Tab 'Promosi': Temukan berbagai diskon dan penawaran menarik." />
                    <GuidePoint text="Tab 'Akun': Kelola profil, alamat, dan lihat riwayat pesanan Anda." />
                </GuideSection>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white' },
    container: { padding: 20, paddingBottom: 40 },
    mainTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#333',
    },
    subtitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        marginBottom: 24,
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        padding: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 8,
        marginBottom: 8,
    },
    sectionTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        marginLeft: 10,
        color: '#007AFF',
    },
    sectionContent: {},
    pointText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
        marginBottom: 4,
    },
});