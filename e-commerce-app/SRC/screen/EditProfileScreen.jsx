import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function EditProfileScreen({ navigation }) {
    const { userInfo } = useAuth();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Profil Pengguna',
            headerShown: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: '#F8F9FA' },
            headerShadowVisible: false,
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                
                {/* Kartu Informasi Profil */}
                <View style={styles.profileCard}>
                    
                    {/* Header: Foto & Nama Utama */}
                    <View style={styles.cardHeader}>
                        <View style={styles.avatarContainer}>
                            <Ionicons name="person" size={40} color="white" />
                        </View>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.headerName}>{userInfo?.email?.split('@')[0] || 'Pengguna'}</Text>
                            <Text style={styles.headerStatus}>Member Aktif</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Detail Informasi */}
                    <View style={styles.infoSection}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Nama Lengkap</Text>
                            <Text style={styles.infoValue}>{userInfo?.email?.split('@')[0] || '-'}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>ID Akun</Text>
                            <Text style={styles.infoValue}>{userInfo?.id || 'USER-88291'}</Text>
                        </View>

                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Alamat Email</Text>
                            <Text style={styles.infoValue}>{userInfo?.email || '-'}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    scrollContent: { padding: 20 },
    profileCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerTextContainer: {
        flex: 1,
    },
    headerName: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        color: '#333',
    },
    headerStatus: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#666',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginBottom: 24,
    },
    infoSection: {
        // Container for details
    },
    infoItem: {
        marginBottom: 20,
    },
    infoLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#888',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoValue: {
        fontFamily: 'Poppins_400Regular', // Menggunakan Regular agar mudah dibaca namun tetap rapi
        fontSize: 16,
        color: '#333',
    },
});
