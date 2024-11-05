import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Alert, Grid } from '@mui/material';
import BlogList from '../../components/Blogs/BlogsList/BlogsList';
import ByCategory from '../../components/Blogs/FilterByCategory/ByCategory';
import BlogTags from '../../components/Blogs/BlogTags/BlogTags';
import { Blog } from '../../models/blog';
import { fetchAllBlogs } from '../../services/blog-service';
import { useBlogFilter } from '../../context/BlogFiterContext';
import backgroundImage from '../../assets/canada.jpg';
import HeroSection from '../../components/HeroSection/HeroSection';
import Navigation from '../../components/Navbar/Navigation';
import Footer from '../../components/Footer/Footer';

import './BlogListPage.scss';


const BlogListPage: React.FC = () => {
  const { selectedTag, selectedCategory, setSelectedTag, setSelectedCategory } = useBlogFilter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlogs = await fetchAllBlogs();
        setBlogs(fetchedBlogs);
      } catch (err) {
        setError('Failed to fetch blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedTag(null);
  };

  const filteredBlogs = selectedTag
    ? blogs.filter(blog => blog.tags.includes(selectedTag))
    : selectedCategory
      ? blogs.filter(blog => blog.category === selectedCategory)
      : blogs;

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  const title = selectedCategory ? `Category: ${selectedCategory}` : selectedTag ? `Tag: ${selectedTag}` : "Blog";
  const description = "We share stories and give advice";
  return (
    <>
    <Navigation/>
    <HeroSection 
          searchTerm={''} 
          setSearchTerm={(String)} 
          showSearch={false} 
          imageUrl={backgroundImage} 
          title={title}
      />
    <Container className='blog-list-container'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <BlogList blogs={filteredBlogs} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ByCategory blogs={blogs} onCategoryClick={handleCategoryClick} />
            </Grid>
            <Grid item xs={12}>
              <BlogTags blogs={blogs} onTagClick={handleTagClick} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    <Footer/>
    </>
  );
};

export default BlogListPage;
