import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register } = useAuth();

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Kesalahan', 'Semua kolom harus diisi.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Kesalahan', 'Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }
    register(name, email, password);
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Buat Akun Baru</Text>
      <Text style={styles.subtitle}>Daftar untuk mulai berbelanja di MediMart.</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={22} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Nama Lengkap"
          style={styles.input}
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={22} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Email atau Nomor HP"
          style={styles.input}
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Kata Sandi"
          style={styles.input}
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={22} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Konfirmasi Kata Sandi"
          style={styles.input}
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
        <Text style={styles.registerButtonText}>Daftar Sekarang</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 55,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
  },
});
