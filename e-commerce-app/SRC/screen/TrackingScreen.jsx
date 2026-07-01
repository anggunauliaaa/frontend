import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const TrackingTimeline = ({ label, timestamp, isLast = false, isActive = false }) => (
    <View style={styles.timelineItem}>
        <View style={styles.timelineIconContainer}>
            <View style={[styles.timelineCircle, isActive && styles.timelineCircleActive]} />
            {!isLast && <View style={[styles.timelineLine, isActive && styles.timelineLineActive]} />}
        </View>
        <View style={styles.timelineContent}>
            <Text style={[styles.timelineLabel, isActive && styles.timelineLabelActive]}>{label}</Text>
            {timestamp && <Text style={styles.timelineTimestamp}>{timestamp}</Text>}
        </View>
    </View>
);

export default function TrackingScreen({ route, navigation }) {
    const { order } = route.params;

    const timelineData = [
        { label: 'Pesanan dikirim dari gudang', timestamp: '22 Nov 2025, 10:00', active: true },
        { label: 'Paket telah tiba di hub Jakarta', timestamp: '22 Nov 2025, 18:30', active: true },
        { label: 'Paket sedang dalam perjalanan ke alamatmu', timestamp: null, active: false },
        { label: 'Kurir akan segera mengantarkan paket', timestamp: null, active: false },
    ];

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Lacak Pesanan',
            headerShown: true,
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 16 }}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Kurir</Text>
                        <Text style={styles.infoValue}>{order.courier}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>No. Resi</Text>
                        <Text style={styles.infoValue}>{order.resi}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Estimasi Tiba</Text>
                        <Text style={styles.infoValue}>{order.eta}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Riwayat Perjalanan</Text>
                    {timelineData.map((item, index) => (
                        <TrackingTimeline
                            key={index}
                            label={item.label}
                            timestamp={item.timestamp}
                            isActive={item.active}
                            isLast={index === timelineData.length - 1}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#F8F9FA' },
    container: { padding: 16 },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    sectionTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 14,
        color: '#333',
    },
    // Timeline styles
    timelineItem: {
        flexDirection: 'row',
    },
    timelineIconContainer: {
        alignItems: 'center',
        marginRight: 12,
    },
    timelineCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#D0D0D0',
    },
    timelineCircleActive: {
        backgroundColor: '#28A745',
    },
    timelineLine: {
        flex: 1,
        width: 2,
        backgroundColor: '#D0D0D0',
    },
    timelineContent: {
        flex: 1,
        paddingBottom: 20,
    },
    timelineLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#666',
    },
    timelineLabelActive: {
        fontFamily: 'Poppins_700Bold',
        color: '#333',
    },
    timelineTimestamp: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
});
