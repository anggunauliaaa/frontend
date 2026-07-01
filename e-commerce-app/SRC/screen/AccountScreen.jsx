import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const AccountScreen = ({ navigation }) => {
    const { userInfo, logout } = useAuth();

    // Menyembunyikan header default
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    const handleLogout = () => {
        Alert.alert(
            'Keluar',
            'Apakah Anda yakin ingin keluar?',
            [
                { text: 'Batal', style: 'cancel' },
                { text: 'Keluar', style: 'destructive', onPress: logout }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="person-circle-outline" size={80} color="#007AFF" />
                <Text style={styles.userName}>{userInfo?.email?.split('@')[0] || 'Pengguna'}</Text>
                <Text style={styles.userEmail}>{userInfo?.email || 'email@example.com'}</Text>
            </View>

            <View style={styles.menuContainer}>
                {/* Tambahkan item menu lain di sini jika perlu */}
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
                    <Ionicons name="person-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>Profil Saya</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UserGuide')}>
                    <Ionicons name="help-circle-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>Petunjuk Pengguna</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('HelpCenter')}>
                    <Ionicons name="headset-outline" size={24} color="#333" />
                    <Text style={styles.menuText}>Bantuan</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 3,
        borderColor: '#007AFF',
    },
    userName: { fontFamily: 'Poppins_700Bold', fontSize: 22, color: '#333', marginTop: 10 },
    userEmail: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#666' },
    menuContainer: { marginTop: 20 },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuText: { fontFamily: 'Poppins_400Regular', fontSize: 16, color: '#333', marginLeft: 15 },
    logoutButton: {
        margin: 20,
        backgroundColor: '#DC3545',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
    },
});

export default AccountScreen;
