import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import BlogCard from '../../components/Blogs/BlogCard/BlogCard';
import ByCategory from '../../components/Blogs/FilterByCategory/ByCategory';
import BlogTags from '../../components/Blogs/BlogTags/BlogTags';
import AboutAuthor from '../../components/Blogs/AboutAuthor/AboutAuthor';
import CommentSection from '../../components/Blogs/CommentsContainer/CommentSection';
import { Blog, CommentItem } from '../../models/blog';
import { fetchAllBlogs, fetchBlogById, updateBlog } from '../../services/blog-service';
import { useBlogFilter } from '../../context/BlogFiterContext';
import Navigation from '../../components/Navbar/Navigation';
import HeroSection from '../../components/HeroSection/HeroSection';
import backgroundImage from '../../assets/canada.jpg';
import Footer from '../../components/Footer/Footer';

const BlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSelectedTag, setSelectedCategory } = useBlogFilter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlogs = await fetchAllBlogs();
        setBlogs(fetchedBlogs);
        if (id) {
          const fetchedBlog = await fetchBlogById(id);
          setBlog(fetchedBlog);
          setComments(fetchedBlog.comments || []);
        }
      } catch (err) {
        setError('Failed to fetch blog or blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedCategory(null);
    navigate('/blogs');
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedTag(null);
    navigate('/blogs');
  };

  const handleAddComment = async (newComment: Omit<CommentItem, 'commentId' | 'date'>) => {
    if (!blog) return;

    const updatedBlog = {
      ...blog,
      comments: [
        ...comments,
        {
          ...newComment,
          commentId: `${blog.blogId}-com${(comments.length + 1).toString().padStart(3, '0')}`,
          date: new Date().toISOString()
        }
      ]
    };

    try {
      const updated = await updateBlog(updatedBlog);
      setBlog(updated);
      setComments(updated.comments || []);
    } catch (err) {
      console.error('Failed to update blog with new comment', err);
      setError('Failed to add comment. Please try again later.');
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!blog) return <Typography variant="h6">No blog data available.</Typography>;

  return (
    <>
    <Navigation/>
    <HeroSection 
          searchTerm={''} 
          setSearchTerm={(String)} 
          showSearch={false} 
          imageUrl={backgroundImage} 
          title={"Blogs"}
      />
    
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <BlogCard blog={blog} />
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
        <Grid item xs={12}>
          <Grid container spacing={2} direction="column">
            <Grid item xs={12}>
              <AboutAuthor blog={blog} />
            </Grid>
            <Grid item xs={12}>
              <CommentSection
                comments={comments}
                onAddComment={handleAddComment}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    <Footer/>
    </>
    
  );
};

export default BlogPage;
