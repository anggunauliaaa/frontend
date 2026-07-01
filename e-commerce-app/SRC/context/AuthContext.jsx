import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    // Cek status login saat aplikasi dibuka
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userToken = await AsyncStorage.getItem('userToken');
            let userInfo = await AsyncStorage.getItem('userInfo');
            
            if (userInfo) {
                userInfo = JSON.parse(userInfo);
            }

            if (userToken) {
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            setIsLoading(false);
        } catch (e) {
            console.log(`isLoggedIn error ${e}`);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    // Fungsi Login: Simpan token dan data user ke storage
    const login = async (token, user) => {
        setIsLoading(true);
        setUserToken(token);
        setUserInfo(user);
        try {
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(user));
        } catch (e) {
            console.log('Login error saving to storage', e);
        }
        setIsLoading(false);
    };

    // Fungsi Logout: Hapus data dari storage
    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserInfo(null);
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userInfo');
        } catch (e) {
            console.log('Logout error removing from storage', e);
        }
        setIsLoading(false);
    };

    // Fungsi Update Profil: Update state dan storage
    const updateUserInfo = async (newUserInfo) => {
        setUserInfo(newUserInfo);
        try {
            await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo));
        } catch (e) {
            console.log('Update user info error', e);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, updateUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
