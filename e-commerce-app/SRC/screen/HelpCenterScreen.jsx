import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const FAQ_DATA = [
    {
        question: 'Bagaimana cara checkout?',
        answer: 'Pilih produk di keranjang Anda, tekan tombol "Checkout", isi alamat pengiriman, pilih metode pembayaran, lalu tekan "Buat Pesanan".'
    },
    {
        question: 'Mengapa pembayaran saya gagal?',
        answer: 'Pembayaran bisa gagal karena beberapa alasan: saldo tidak cukup, koneksi internet terputus, atau batas waktu pembayaran habis. Silakan coba lagi atau gunakan metode pembayaran lain.'
    },
    {
        question: 'Bagaimana cara melacak pesanan saya?',
        answer: 'Anda dapat melacak status pesanan Anda di tab "Pesanan". Di sana, Anda akan melihat status pesanan Anda, apakah sedang dikemas, dikirim, atau sudah selesai.'
    },
];

const FaqItem = ({ question, answer }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={styles.faqContainer}>
            <TouchableOpacity style={styles.faqHeader} onPress={() => setExpanded(!expanded)}>
                <Text style={styles.faqQuestion}>❓ {question}</Text>
                <Ionicons name={expanded ? 'chevron-up-outline' : 'chevron-down-outline'} size={20} color="#666" />
            </TouchableOpacity>
            {expanded && (
                <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswer}>{answer}</Text>
                </View>
            )}
        </View>
    );
};

export default function HelpCenterScreen({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Pusat Bantuan',
            headerShown: true,
        });
    }, [navigation]);

    const handleContactAdmin = () => {
        // Ganti dengan nomor WhatsApp atau email admin Anda
        const phoneNumber = '6281234567890';
        const message = 'Halo Admin Medimart, saya butuh bantuan.';
        const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        Linking.canOpenURL(url)
            .then(supported => {
                if (supported) {
                    return Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'WhatsApp tidak terinstall di perangkat Anda.');
                }
            })
            .catch(err => console.error('An error occurred', err));
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.mainTitle}>Pertanyaan Umum (FAQ)</Text>
                {FAQ_DATA.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.contactButton} onPress={handleContactAdmin}>
                    <Ionicons name="logo-whatsapp" size={22} color="white" />
                    <Text style={styles.contactButtonText}>Hubungi Admin</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white' },
    container: { padding: 20 },
    mainTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        marginBottom: 16,
        color: '#333',
    },
    faqContainer: {
        backgroundColor: '#F8F9FA',
        borderRadius: 10,
        marginBottom: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#EFEFEF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    faqQuestion: {
        flex: 1,
        fontFamily: 'Poppins_700Bold',
        fontSize: 15,
        color: '#333',
    },
    faqAnswerContainer: {
        paddingTop: 10,
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#EAEAEA',
    },
    faqAnswer: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#555',
        lineHeight: 22,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    contactButton: {
        backgroundColor: '#28A745',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    contactButtonText: {
        color: 'white',
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        marginLeft: 10,
    },
});

