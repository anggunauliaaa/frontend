import React, { createContext, useState, useContext } from 'react';

export const OrderContext = createContext();

const initialOrders = {
    unpaid: [
        { id: 'ORD001', name: 'Paracetamol 500mg', image: require('../../assets/paracetamol.jpeg'), quantity: 2, paymentMethod: 'VA', paymentDetails: { total: 16000, copyLabel: 'Virtual Account', paymentCode: '8808123456789', deadline: '23 Nov 2025, 14:55', instructions: 'Lakukan pembayaran ke BCA Virtual Account.' } },
    ],
    packed: [
        { id: 'ORD002', name: 'Antangin JRG', image: require('../../assets/antangin jrg.jpeg'), quantity: 1, eta: 'Selesai dalam 1-2 jam' },
    ],
    shipped: [
        { id: 'ORD003', name: 'Madu Herbal TJ', image: require('../../assets/madu herbal tj.jpeg'), resi: 'MDM-123456789', courier: 'JNE Express', location: 'Gudang Palembang', eta: '2-3 hari', progress: 2 },
    ],
    completed: [
        { id: 'ORD004', name: 'Hansaplast', image: require('../../assets/hansaplast.jpeg'), date: '18 Nov 2025', price: 15000 },
        { id: 'ORD005', name: 'Vitamin C IPI', image: require('../../assets/vitamin c ipi.jpeg'), date: '15 Nov 2025', price: 12500 },
    ],
};

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(initialOrders);

    // Fungsi untuk memindahkan pesanan dari 'unpaid' ke 'packed'
    const markAsPaidAndMoveToPacked = (orderId) => {
        const orderToMove = orders.unpaid.find(o => o.id === orderId);
        if (orderToMove) {
            setOrders(prevOrders => ({
                ...prevOrders,
                unpaid: prevOrders.unpaid.filter(o => o.id !== orderId),
                packed: [{ ...orderToMove, eta: 'Selesai dalam 1-2 jam' }, ...prevOrders.packed],
            }));
        }
    };

    const createOrder = (orderData) => {
        const { products, paymentMethod, total, shippingAddress } = orderData;

        const newOrderBase = {
            id: `MEDIMART-${Date.now()}`,
            name: products.length > 1 ? `${products[0].name} & lainnya` : products[0].name,
            image: products[0].image, // Ambil gambar produk pertama sebagai representasi
            quantity: products.reduce((sum, item) => sum + item.quantity, 0),
            products: products,
            shippingAddress: shippingAddress,
        };

        if (paymentMethod === 'COD') {
            const newPackedOrder = { ...newOrderBase, eta: 'Selesai dalam 1-2 jam' };
            setOrders(prev => ({ ...prev, packed: [newPackedOrder, ...prev.packed] }));
            return { ...newPackedOrder, status: 'Dikemas' };
        } else {
            const newUnpaidOrder = {
                ...newOrderBase,
                paymentMethod: paymentMethod,
                paymentDetails: {
                    total: total,
                    copyLabel: 'Virtual Account',
                    paymentCode: `8808${Math.floor(100000000 + Math.random() * 900000000)}`,
                    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString('id-ID'),
                    instructions: `Lakukan pembayaran ke ${paymentMethod} Virtual Account sebelum batas waktu.`
                }
            };
            setOrders(prev => ({ ...prev, unpaid: [newUnpaidOrder, ...prev.unpaid] }));
            return { ...newUnpaidOrder, status: 'Belum Bayar' };
        }
    };

    // Simulasi admin mengubah status dari 'packed' ke 'shipped'
    const markAsShipped = (orderId) => {
        const orderToMove = orders.packed.find(o => o.id === orderId);
        if (orderToMove) {
            setOrders(prevOrders => ({
                ...prevOrders,
                packed: prevOrders.packed.filter(o => o.id !== orderId),
                shipped: [{ ...orderToMove, resi: `MDM-${Math.floor(100000000 + Math.random() * 900000000)}`, courier: 'J&T Express', location: 'Gudang Jakarta', eta: '1-2 hari', progress: 1 }, ...prevOrders.shipped],
            }));
        }
    };

    // Simulasi paket sampai dan pindah ke 'completed'
    const markAsCompleted = (orderId) => {
        const orderToMove = orders.shipped.find(o => o.id === orderId);
        if (orderToMove) {
            setOrders(prevOrders => ({
                ...prevOrders,
                shipped: prevOrders.shipped.filter(o => o.id !== orderId),
                completed: [{ ...orderToMove, date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }, ...prevOrders.completed],
            }));
        }
    };

    const value = {
        orders,
        createOrder,
        markAsPaidAndMoveToPacked,
        markAsShipped,
        markAsCompleted,
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => useContext(OrderContext);
