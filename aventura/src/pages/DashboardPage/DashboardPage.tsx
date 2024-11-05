import React from 'react';
import { Container, Typography } from '@mui/material';
import AdminDashboard from '../../components/Admin/AdminDashboard';
import Navigation from '../../components/Navbar/Navigation';
import Footer from '../../components/Footer/Footer';
import HeroSection from '../../components/HeroSection/HeroSection';
import HeroImage from '../../assets/hero_image.avif';

const Dashboard: React.FC = () => {
  return (
    <>
      <Navigation />
      <HeroSection 
        searchTerm={''} 
        setSearchTerm={(String)} 
        showSearch={false} 
        imageUrl={HeroImage} 
        title={"Admin Dashboard"}
      />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <AdminDashboard />
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
