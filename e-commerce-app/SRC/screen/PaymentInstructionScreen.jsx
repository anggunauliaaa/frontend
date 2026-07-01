import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Clipboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useOrders } from '../context/OrderContext';

export default function PaymentInstructionScreen({ route, navigation }) {
    const params = route.params || {};
    // Handle jika data dikirim sebagai { order: ... } (dari Checkout) atau langsung objek order (dari History)
    const order = params.order || (params.paymentDetails ? params : null);
    const { markAsPaidAndMoveToPacked } = useOrders();

    // Guard Clause: Mencegah crash jika order atau paymentDetails undefined
    if (!order?.paymentDetails) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={{ textAlign: 'center', marginTop: 20 }}>Data pesanan tidak valid.</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: '#007AFF', textAlign: 'center', marginTop: 10 }}>Kembali</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const { paymentDetails } = order;

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        Alert.alert('Disalin', `${paymentDetails.copyLabel} berhasil disalin ke clipboard.`);
    };

    const handlePaymentConfirmation = () => {
        markAsPaidAndMoveToPacked(order.id);
        // Arahkan ke navigator MainApp, lalu ke tab Pesanan, dan teruskan parameter untuk membuka tab 'Dikemas'
        navigation.navigate('MainApp', { 
            screen: 'Pesanan', 
            params: { screen: 'Dikemas' } // Setelah bayar, status menjadi 'Dikemas'
        });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="checkmark-circle" size={60} color="#28A745" />
                    <Text style={styles.headerTitle}>Pesanan Diterima!</Text>
                    <Text style={styles.headerSubtitle}>Segera selesaikan pembayaran sebelum batas waktu agar pesananmu dapat diproses.</Text>
                </View>

                <View style={styles.detailsCard}>
                    <Text style={styles.sectionTitle}>Detail Pembayaran</Text>
                    
                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Total Pembayaran</Text>
                        <Text style={styles.totalValue}>Rp{paymentDetails.total.toLocaleString('id-ID')}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>{paymentDetails.copyLabel}</Text>
                        <View style={styles.copyContainer}>
                            <Text style={styles.copyValue}>{paymentDetails.paymentCode}</Text>
                            <TouchableOpacity onPress={() => copyToClipboard(paymentDetails.paymentCode)}>
                                <Ionicons name="copy-outline" size={22} color="#007AFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {paymentDetails.accountName && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Atas Nama</Text>
                            <Text style={styles.detailValue}>{paymentDetails.accountName}</Text>
                        </View>
                    )}

                    <View style={styles.deadlineContainer}>
                        <Ionicons name="time-outline" size={16} color="#DC3545" />
                        <Text style={styles.deadlineText}>Batas Waktu Pembayaran: {paymentDetails.deadline}</Text>
                    </View>
                </View>

                <View style={styles.instructionCard}>
                    <Text style={styles.sectionTitle}>Instruksi</Text>
                    <Text style={styles.instructionText}>{paymentDetails.instructions}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.doneButton} onPress={handlePaymentConfirmation}>
                <Text style={styles.doneButtonText}>Saya Sudah Bayar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
    container: { flex: 1, padding: 16 },
    header: { alignItems: 'center', marginBottom: 24 },
    headerTitle: { fontFamily: 'Poppins_700Bold', fontSize: 22, color: '#333', marginTop: 12 },
    headerSubtitle: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#666', textAlign: 'center', marginTop: 4 },
    
    detailsCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, elevation: 2 },
    sectionTitle: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#333', marginBottom: 12 },
    
    detailRow: { marginBottom: 12 },
    detailLabel: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#666', marginBottom: 4 },
    detailValue: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#333' },
    totalValue: { fontFamily: 'Poppins_700Bold', fontSize: 20, color: '#007AFF' },
    
    copyContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F0F0F0', padding: 10, borderRadius: 8 },
    copyValue: { fontFamily: 'Poppins_700Bold', fontSize: 16, color: '#333' },
    
    deadlineContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF4F4', padding: 10, borderRadius: 8, marginTop: 8 },
    deadlineText: { fontFamily: 'Poppins_400Regular', fontSize: 13, color: '#DC3545', marginLeft: 8 },

    instructionCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, elevation: 2 },
    instructionText: { fontFamily: 'Poppins_400Regular', fontSize: 14, color: '#666', lineHeight: 22 },

    doneButton: { backgroundColor: '#007AFF', borderRadius: 10, paddingVertical: 15, margin: 16, alignItems: 'center' },
    doneButtonText: { color: 'white', fontFamily: 'Poppins_700Bold', fontSize: 16 },
});
