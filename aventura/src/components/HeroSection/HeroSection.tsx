import React from 'react';
import './HeroSection.scss';
import SearchBox from '../SearchBox/SearchBox';

interface HeroSectionProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    showSearch?: boolean;
    imageUrl: string;
    title: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ searchTerm, setSearchTerm, showSearch = true, imageUrl, title }) => {
    return (
        <div className="hero-section" style={{ backgroundImage: `url(${imageUrl})` }}>
            <h1>{title}</h1>
            {showSearch && <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={() => {}} />}
        </div>
    );
};

export default HeroSection;
