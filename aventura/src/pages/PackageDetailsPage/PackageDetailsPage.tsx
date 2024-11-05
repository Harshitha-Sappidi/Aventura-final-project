import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeroSection from '../../components/HeroSection/HeroSection';
import TabsSection from '../../components/TabSection/TabSection';
import BookingForm from '../../components/BookingForm/BookingForm';
import { Package, ReviewItem } from '../../models/package';
import { fetchPackageById, updatePackage } from '../../services/package-service';
import './PackageDetailsPage.scss';
import PriceTag from '../../components/PriceTag/PriceTag';
import HeroImage from '../../assets/hero_image.avif';
import ReviewSection from '../../components/ReviewSection/ReviewSection';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cart-slice';
import Navigation from '../../components/Navbar/Navigation';
import Footer from '../../components/Footer/Footer';

const PackageDetailsPage = () => {
    const { t } = useTranslation();  // Initialize the translation function
    const { id } = useParams<{ id: string }>();
    const [packageDetails, setPackageDetails] = useState<Package | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const dispatch = useDispatch();

    useEffect(() => {
        const loadPackageDetails = async () => {
            try {
                const fetchedPackage = await fetchPackageById(id);
                setPackageDetails(fetchedPackage);
            } catch (err) {
                setError(t('fetch_package_error'));
            } finally {
                setLoading(false);
            }
        };

        loadPackageDetails();
    }, [id, t]);  // Include `t` in the dependency array to ensure translations are updated if the language changes

    const handleAddReview = async (newReview: ReviewItem) => {
        if (!packageDetails) return;

        const updatedPackage = {
            ...packageDetails,
            reviewItems: [...packageDetails.reviewItems, newReview],
        };

        try {
            const updated = await updatePackage(updatedPackage);
            setPackageDetails(updated);
        } catch (err) {
            console.error(t('update_package_error'), err);
        }
    };

    const handleBookNow = () => {
        if (packageDetails) {
            const cartItem = {
                _id: packageDetails.id,
                name: packageDetails.title,
                price: packageDetails.newPrice,
                quantity: 1,  // Default quantity
                availableQuantity: packageDetails.ticketCount,  // Assuming a default available quantity
                image: packageDetails.cardImage,  // Assuming packageDetails has a cardImage property
                type: 'package',  // Indicate that this is a package
            };
            dispatch(addToCart(cartItem));
        }
    };

    if (loading) return <div>{t('loading')}</div>;
    if (error) return <div>{t('error')}: {error}</div>;

    return (
        <Box className="package-details-container">
            {packageDetails && (
                <>
                    <Navigation />
                    <HeroSection 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm} 
                        showSearch={false} 
                        imageUrl={packageDetails.cardImage} 
                        title={packageDetails.title}
                    />
                    <Box className="details-container">
                        <Box className="details-left-container">
                            <TabsSection packageDetails={packageDetails} />
                            <ReviewSection reviews={packageDetails.reviewItems} onAddReview={handleAddReview} />
                        </Box>
                        <Box className="booking-container">
                            <PriceTag price={packageDetails.newPrice} description={t('one_tour_per_person')} />
                            <BookingForm packageDetails={packageDetails} />
                        </Box>
                    </Box>
                    <Footer />
                </>
            )}
        </Box>
    );
};

export default PackageDetailsPage;
