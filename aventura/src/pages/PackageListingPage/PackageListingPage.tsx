import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PackageList from '../../components/PackageList/PackageList';
import { Package } from '../../models/package'; 
import { fetchPackages } from '../../services/package-service'; 
import { Box, Typography } from '@mui/material';
import FilterComponent from '../../components/FilterComponent/FilterComponent';
import SortComponent from '../../components/SortComponent/SortComponent';
import './PackageListingPage.scss';
import HeroSection from '../../components/HeroSection/HeroSection';
import HeroImage from '../../assets/package-listing-hero-3.jpg';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navbar/Navigation';

const PackageListingPage = () => {
    const { t } = useTranslation();
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState<any>({
        priceRange: [100, 10000],
        destination: '',
        daysRange: [1, 10],
        rating: [1, 5],
        difficulty: '',
    });
    const [sortBy, setSortBy] = useState<string>('');

    useEffect(() => {
        const loadPackages = async () => {
            try {
                const fetchedPackages = await fetchPackages();
                console.log('fetchedPackages: ', fetchedPackages);
                setPackages(fetchedPackages);
            } catch (err) {
                setError(t('fetch_error'));
            } finally {
                setLoading(false);
            }
        };

        loadPackages();
    }, [t]);

    if (loading) return <div>{t('loading')}</div>;
    if (error) return <div>{t('error')}: {error}</div>;

    const filteredPackages = packages.filter(pkg => {   
        const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              pkg.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilters = (
            pkg.newPrice >= filters.priceRange[0] && pkg.newPrice <= filters.priceRange[1] &&
            (filters.destination === '' || pkg.destination.country === filters.destination || filters.destination === 'All') &&
            pkg.duration >= filters.daysRange[0] && pkg.duration <= filters.daysRange[1] &&
            pkg.ratings >= filters.rating[0] && pkg.ratings <= filters.rating[1] &&
            (filters.difficulty === '' || pkg.level === filters.difficulty || filters.difficulty === 'All')
        );

        return matchesSearch && matchesFilters;
    });

    const sortedPackages = filteredPackages.sort((a, b) => {
        if (sortBy === 'price-asc') {
            return a.newPrice - b.newPrice;
        } else if (sortBy === 'price-desc') {
            return b.newPrice - a.newPrice;
        } else if (sortBy === 'title-asc') {
            return a.title.localeCompare(b.title);
        } else if (sortBy === 'title-desc') {
            return b.title.localeCompare(a.title);
        } else if (sortBy === 'rating-asc') {
            return a.ratings - b.ratings;
        } else if (sortBy === 'rating-desc') {
            return b.ratings - a.ratings;
        } else {
            return 0;
        }
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navigation />
            <Box sx={{ flex: 1 }}>
                <HeroSection 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    showSearch={true} 
                    imageUrl={HeroImage} 
                    title={t('explore_our_packages')} 
                />
                <Box className="list-container">
                    <Box className="results-container">
                        <Typography className="results-count">
                            {t('showing')} {sortedPackages.length} {t('results')}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box className="package-list-container">
                            <PackageList packages={sortedPackages} />
                        </Box>
                        <Box className="filter-container">
                            <SortComponent sortBy={sortBy} setSortBy={setSortBy} />
                            <FilterComponent filters={filters} setFilters={setFilters} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default PackageListingPage;
