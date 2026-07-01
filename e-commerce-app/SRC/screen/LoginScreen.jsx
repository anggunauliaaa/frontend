import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../../assets/logo_medimart.png')} style={styles.logoImage} />
        <Text style={styles.title}>Selamat Datang di MediMart</Text>
        <Text style={styles.subtitle}>Solusi Obat Terpercaya</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={22} color="#888" style={styles.icon} />
          <TextInput
            placeholder="Email atau Nama Pengguna"
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

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Lupa Kata Sandi?</Text>
        </TouchableOpacity>

        <View style={styles.socialLoginContainer}>
          <Text style={styles.socialLoginText}>Atau masuk dengan</Text>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity style={styles.socialIconWrapper} onPress={() => Alert.alert('Login Google', 'Fitur ini belum diimplementasikan.')}>
              <Image source={require('../../assets/google.png')} style={styles.socialIconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconWrapper} onPress={() => Alert.alert('Login Facebook', 'Fitur ini belum diimplementasikan.')}>
              <Image source={require('../../assets/facebook.png')} style={styles.socialIconImage} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Belum punya akun? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Daftar di sini</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E9F5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
    textAlign: 'center',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 10,
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  loginButtonText: {
    color: 'white',
    fontFamily: 'Poppins_700Bold',
    fontSize: 16,
  },
  forgotPassword: {
    marginTop: 20,
    color: '#007AFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
  },
  socialLoginContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  socialLoginText: {
    fontSize: 13,
    color: '#a9a9a9',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIconWrapper: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    elevation: 3,
  },
  socialIconImage: {
    width: 24,
    height: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
  registerText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 14,
    color: '#007AFF',
  },
   logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 32,
  },
});
