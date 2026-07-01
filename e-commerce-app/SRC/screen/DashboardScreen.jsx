import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

// Komponen Kartu Metrik yang dapat digunakan kembali
const MetricCard = ({ title, value, icon, color, highlight, onPress }) => (
    <Pressable
        style={({ pressed }) => [
            styles.metricCard,
            highlight && styles.highlightCard,
            { transform: [{ scale: pressed ? 0.98 : 1 }] }
        ]}
        onPress={onPress}
    >
        <MaterialCommunityIcons name={icon} size={28} color={highlight ? 'white' : color} />
        <Text style={[styles.metricTitle, highlight && styles.highlightText]}>{title}</Text>
        <Text style={[styles.metricValue, highlight && styles.highlightValue]}>{value}</Text>
    </Pressable>
);

export default function DashboardScreen({ navigation }) {
    const screenWidth = Dimensions.get('window').width;

    const chartData = {
        labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        datasets: [{
            data: [20, 45, 28, 80, 99, 43, 60],
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            strokeWidth: 3
        }]
    };

    const criticalStock = [
        { id: '1', name: 'Bodrex', stock: 7 },
        { id: '2', name: 'Paracetamol', stock: 5 },
    ];

    const expiringSoon = [
        { id: '1', name: 'Paracetamol', expiry: '30 Des 2025' },
        { id: '2', name: 'Vitamin C', expiry: '15 Jan 2026' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.dashboardTitle}>Dashboard Medimart</Text>

                {/* Key Metrics */}
                <View style={styles.metricsGrid}>
                    <MetricCard title="Penjualan" value="Rp 12.500.000" icon="chart-line" highlight />
                    <MetricCard title="Stok Menipis" value="12 item" icon="archive-alert-outline" color="#FF9500" />
                    <MetricCard title="Transaksi" value="180 transaksi" icon="swap-horizontal-bold" color="#007AFF" />
                    <MetricCard title="Produk Terlaris" value="Paracetamol" icon="trophy-award" color="#34C759" />
                </View>

                {/* Sales Trend Chart */}
                <View style={styles.chartContainer}>
                    <Text style={styles.sectionTitle}>Tren Penjualan 7 Hari Terakhir</Text>
                    <LineChart
                        data={chartData}
                        width={screenWidth - 32} // Lebar layar dikurangi padding
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                    />
                </View>

                {/* Widgets */}
                <View style={styles.widgetsContainer}>
                    <View style={[styles.widget, { marginRight: 8 }]}>
                        <Text style={styles.widgetTitle}>Stok Kritis</Text>
                        <ScrollView>
                            {criticalStock.map(item => (
                                <View key={item.id} style={styles.widgetItem}>
                                    <Text style={styles.widgetItemText}>{item.name} - <Text style={styles.warningText}>{item.stock} pcs</Text></Text>
                                    <TouchableOpacity style={styles.addButton}>
                                        <Ionicons name="add" size={14} color="#007AFF" />
                                        <Text style={styles.addButtonText}>Tambah</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                    <View style={[styles.widget, { marginLeft: 8 }]}>
                        <Text style={styles.widgetTitle}>Segera Kadaluarsa</Text>
                        <ScrollView>
                            {expiringSoon.map(item => (
                                <View key={item.id} style={styles.widgetItem}>
                                    <Text style={styles.widgetItemText}>{item.name} - <Text style={styles.dangerText}>Exp {item.expiry}</Text></Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <Text style={styles.sectionTitle}>Aksi Cepat</Text>
                    <View style={styles.actionsGrid}>
                        <Pressable
                            style={styles.actionButton}
                            onPress={() => navigation.navigate('KelolaStok')}
                            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: true }}
                        >
                            <View style={styles.actionIconContainer}>
                                <MaterialCommunityIcons name="package-variant-closed" size={30} color="white" />
                            </View>
                            <Text style={styles.actionLabel}>Kelola Stok</Text>
                        </Pressable>
                        <Pressable
                            style={styles.actionButton}
                            onPress={() => navigation.navigate('TambahProduk')}
                            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: true }}
                        >
                            <View style={styles.actionIconContainer}>
                                <Ionicons name="add-circle-outline" size={30} color="white" />
                            </View>
                            <Text style={styles.actionLabel}>Tambah Produk</Text>
                        </Pressable>
                        <Pressable
                            style={styles.actionButton}
                            onPress={() => navigation.navigate('MainApp', { screen: 'Pesanan' })}
                            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)', borderless: true }}
                        >
                            <View style={styles.actionIconContainer}>
                                <Ionicons name="cube-outline" size={30} color="white" />
                            </View>
                            <Text style={styles.actionLabel}>Cek Pesanan</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: '#007AFF'
    }
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    container: {
        padding: 16,
    },
    dashboardTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    metricCard: {
        width: '48%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        alignItems: 'flex-start',
    },
    highlightCard: {
        backgroundColor: '#007AFF',
    },
    metricTitle: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    metricValue: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
        color: '#333',
        marginTop: 4,
    },
    highlightText: {
        color: 'rgba(255, 255, 255, 0.8)',
    },
    highlightValue: {
        color: 'white',
        fontSize: 20,
    },
    chartContainer: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
    widgetsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    widget: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        height: 150,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    widgetTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 14,
        marginBottom: 8,
    },
    widgetItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    widgetItemText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 13,
    },
    warningText: {
        color: '#FF9500',
        fontFamily: 'Poppins_700Bold',
    },
    dangerText: {
        color: '#FF3B30',
        fontFamily: 'Poppins_700Bold',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F1FF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    addButtonText: {
        color: '#007AFF',
        fontFamily: 'Poppins_700Bold',
        fontSize: 12,
        marginLeft: 4,
    },
    quickActionsContainer: {
        marginBottom: 20,
    },
    actionsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    actionButton: {
        alignItems: 'center',
    },
    actionIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        elevation: 3,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
    },
    actionLabel: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#333',
    },
});
