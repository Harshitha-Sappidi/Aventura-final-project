import React from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Grid, Box, Divider, IconButton, Button } from '@mui/material';
import { DateRange, Person, Comment, LocalOffer, Facebook, Twitter, Pinterest, LinkedIn, Share } from '@mui/icons-material';
import { Blog } from '../../../models/blog';
import './BlogCard.scss';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();

  const handleViewBlogClick = () => {
    navigate(`/blogs/${blog.id}`);
  };

  const handleShareClick = async () => {
    const currentUrl = window.location.href;
    const blogUrl = currentUrl.includes(blog.id) ? currentUrl : `${currentUrl}/${blog.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this article:',
          text: `"${blog.title}" by ${blog.author.name}:`,
          url: blogUrl,
        });
      } catch (err) {
        console.warn('Error sharing:', (err as Error).name, (err as Error).message);
      }
    } else {
      // Fallback: Copy URL to clipboard or show a message
      try {
        await navigator.clipboard.writeText(blogUrl);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <Card className="blog-card">
      <CardContent>
        <Typography className="title" variant="h5" component="div">
          {blog.title}
        </Typography>
        <Box mt={1}>
          <Grid container spacing={2} className="info">
            <Grid item className="info-item">
              <DateRange className="icon" fontSize="small" /> {blog.date}
            </Grid>
            <Grid item className="info-item">
              <Person className="icon" fontSize="small" /> {blog.author.name}
            </Grid>
            <Grid item className="info-item">
              <LocalOffer className="icon" fontSize="small" /> {blog.category}
            </Grid>
            <Grid item className="info-item">
              <Comment className="icon" fontSize="small" /> {blog.comments.length} {t("comments")}
            </Grid>
          </Grid>
        </Box>
        <CardMedia
          component="img"
          className="image"
          onClick={handleViewBlogClick}
          height="300"
          image={blog.imageUrl}
          alt={blog.title}
        />
      </CardContent>
      <CardContent>
        <Typography className="cardDescription" variant="body2" component="p">
          {blog.description}
        </Typography>
        <Box mt={2} className="tags-container">
          <LocalOffer className="icon" fontSize="small" /> <span className="tags-label">Tags:</span>
          <Box ml={1} className="tags">
            {blog.tags.map((tag) => (
              <Chip key={tag} label={tag} className="tag" />
            ))}
          </Box>
        </Box>
        <Divider className="divider" />
        <Box className="social-icons">
          <IconButton className="social-icon facebook">
            <Facebook />
          </IconButton>
          <span className="vertical-separator"></span>
          <IconButton className="social-icon twitter">
            <Twitter />
          </IconButton>
          <span className="vertical-separator"></span>
          <IconButton className="social-icon pinterest">
            <Pinterest />
          </IconButton>
          <span className="vertical-separator"></span>
          <IconButton className="social-icon linkedin">
            <LinkedIn />
          </IconButton>
          <span className="vertical-separator"></span>
          <Button
            onClick={handleShareClick}
            startIcon={<Share />}
            variant="contained"
            color="primary"
            sx={{ marginLeft: '10px' }}
          >
            Share
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
