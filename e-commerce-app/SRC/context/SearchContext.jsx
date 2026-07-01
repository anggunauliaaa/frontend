import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

// Menggunakan data produk dan kategori yang konsisten dengan HomeScreen
const categories = [
    { id: '1', name: 'Obat Demam' },
    { id: '2', name: 'Obat Batuk' },
    { id: '3', name: 'Vitamin' },
    { id: '4', name: 'Obat Luka' },
    { id: '5', name: 'Alkes' },
    { id: '6', name: 'Alergi' },
    { id: '7', name: 'Imun Booster' },
    { id: '8', name: 'Herbal' },
];

const allProducts = [
    { id: '1', categoryId: '1', name: 'Paracetamol 500mg', image: require('../../assets/paracetamol.jpeg'), price: 8000, oldPrice: 10000, discount: 20 },
    { id: '2', categoryId: '2', name: 'Antangin JRG', image: require('../../assets/antangin jrg.jpeg'), price: 25000, oldPrice: 30000, discount: 17 },
    { id: '3', categoryId: '2', name: 'Tolak Angin Cair', image: require('../../assets/tolakangin.jpeg'), price: 4000 },
    { id: '4', categoryId: '4', name: 'Betadine Antiseptic', image: require('../../assets/betadine antiseptic.jpeg'), price: 32000 },
    { id: '5', categoryId: '1', name: 'Panadol Extra', image: require('../../assets/panadol extra.jpeg'), price: 12000 },
    { id: '6', categoryId: '3', name: 'Madu Herbal TJ', image: require('../../assets/madu herbal tj.jpeg'), price: 45000, oldPrice: 50000, discount: 10 },
    { id: '7', categoryId: '3', name: 'Vitamin C IPI', image: require('../../assets/vitamin c ipi.jpeg'), price: 15000 },
    { id: '8', categoryId: '5', name: 'Masker Medis', image: require('../../assets/masker medis.jpeg'), price: 28000 },
    { id: '9', categoryId: '4', name: 'Hansaplast', image: require('../../assets/hansaplast.jpeg'), price: 18000 },
];

export const useSearch = () => {
    return useContext(SearchContext);
};

const SearchProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const searchProducts = async (query) => {
        const trimmedQuery = query.trim().toLowerCase();
        if (!trimmedQuery) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        setError(null);
        
        // Simulasi pemanggilan API dengan timeout
        setTimeout(() => {
            const categoryMap = categories.reduce((map, category) => {
                map[category.id] = category.name.toLowerCase();
                return map;
            }, {});

            const filteredProducts = allProducts.filter(product => {
                const productName = product.name.toLowerCase();
                const categoryName = categoryMap[product.categoryId] || '';

                return productName.includes(trimmedQuery) || categoryName.includes(trimmedQuery);
            });
            setResults(filteredProducts);
            setIsLoading(false);
        }, 300); // delay 300ms untuk simulasi
    };

    const value = {
        results,
        isLoading,
        error,
        searchProducts,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
};

export { SearchProvider };
