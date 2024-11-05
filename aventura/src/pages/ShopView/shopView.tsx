import React, { useState } from 'react';
import { Box, Grid, Container } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import ProductList from '../../components/ProductList/ProductList';
import Cart from '../../components/CartComponent/CartComponent';
import FilterByPrice from '../../components/Filter/FilterComponent';
import SortingDropdown from '../../components/Sorting/SortingDropdown';
import ProductCategories from '../../components/ProductCategory/ProductCategory';
import TopRatedProducts from '../../components/TopRatedProducts/TopRatedProducts';

import Footer from '../../components/Footer/Footer.tsx';
import './shopView.scss'; 
import backgroundImage from '../../assets/canada.jpg';
import Navigation from "../../components/Navbar/Navigation.tsx";
import HeroSection from '../../components/HeroSection/HeroSection.tsx';


function ShopView() {
  const [selectedOption, setSelectedOption] = useState<string>('default');
  const [priceRange, setPriceRange] = useState<number[]>([10, 1000]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as string);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (newValue: number[]) => {
    setPriceRange(newValue);
  };

  return (
    <>
    <Navigation/>
    <HeroSection 
          searchTerm={''} 
          setSearchTerm={(String)} 
          showSearch={false} 
          imageUrl={backgroundImage} 
          title={"shop"}
      />
    <Container className="shop-container">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8} lg={9}>
          <Box className="product-list-container">
            <ProductList
              sortingOption={selectedOption}
              priceRange={priceRange}
              selectedCategory={selectedCategory}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Box className="sidebar">
            <Box className="sidebar-component">
              <Cart />
            </Box>
            <Box className="shop-header">
              <SortingDropdown
                selectedOption={selectedOption}
                handleSortChange={handleSortChange}
              />
            </Box>
            <Box className="sidebar-component">
              <FilterByPrice priceRange={priceRange} onPriceChange={handlePriceChange} />
            </Box>
            <Box className="sidebar-component">
              <ProductCategories
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
              />
            </Box>
            <Box className="sidebar-component">
              <TopRatedProducts page="detailView" />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
    <Footer />
    </>
  );
}

export default ShopView;
