import React, {useEffect, useState} from 'react';
import {Package} from '../../models/package.ts';
import Hero from "../../components/Hero/Hero.tsx";
import ExploreActivitySection from "../../components/ExploreActivity/ExploreActivitySection.tsx";
import Navigation from "../../components/Navbar/Navigation.tsx";
import PopularToursList from '../../components/PopularToursList/PopularToursList.tsx';
import FindByDestination from '../../components/FindByDestination/FindByDestination.tsx';
import Testimonials from "../../components/Testimonials/Testimonials.tsx";
import Footer from '../../components/Footer/Footer.tsx';
import {fetchFiveStarPackages} from '../../services/package-service.ts';
import NewsletterSubscription from '../../components/NewsletterSubscription/NewsletterSubscription.tsx';
import i18n from "../../i18n";
import {useTranslation} from "react-i18next";

const Home: React.FC = () => {
    const [user, setUser] = useState(null);
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [language, setLanguage] = React.useState({
        checked: true,
    });

    // Declaring t variable for translation
    const {t} = useTranslation("common");

    const translate = () => {
        console.log("checked", language.checked);
        setLanguage({
            checked: !language.checked,
        });
    };

    // TODO:uncoment this code

    useEffect(() => {
        const loadPackages = async () => {
            try {
                const fetchedPackages = await fetchFiveStarPackages();
                setPackages(fetchedPackages);
            } catch (err) {
                setError('Failed to fetch five star packages');
            } finally {
                setLoading(false);
            }
        };
        loadPackages();
        if (language.checked) {
            i18n.changeLanguage("en").then(() => console.log("changed to en"));
        } else {
            i18n.changeLanguage("ta").then(() => console.log("changed to ta"));
        }
    }, [language]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/*<Navigation setUser={setUser}/>*/}
            <Navigation translatePage={translate}/>
            <Hero/>
            <ExploreActivitySection/>
            <PopularToursList packages={packages}/>
            <FindByDestination/>
            {/* <Testimonials/> */}
            <NewsletterSubscription/>
            <Footer/>
        </div>
    );
};

export default Home;
