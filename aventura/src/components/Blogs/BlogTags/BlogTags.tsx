import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Blog } from '../../../models/blog';
import { t } from 'i18next';
import './BlogTags.scss';


interface BlogTagsProps {
  blogs: Blog[];
  onTagClick: (tag: string) => void; // Add the onTagClick prop
}

const BlogTags: React.FC<BlogTagsProps> = ({ blogs, onTagClick }) => {
  // Extract unique tags from the blogs
  const extractTags = (blogs: Blog[]): string[] => {
    const allTags = blogs.flatMap(blog => blog.tags);
    return Array.from(new Set(allTags)); // Remove duplicates
  };

  const tags = extractTags(blogs);

  return (
    <Box className="blogTagsContainer">
      <Typography variant="h6" component="h2" gutterBottom className="blogTagsTitle">
        {t("tags")}
      </Typography>
      <Box className="dividerContainer">
        <div className="blueLine"></div>
        <Divider />
      </Box>
      <Box className="tagsList">
        {tags.map((tag) => (
          <Box
            key={tag}
            className="tagItem"
            onClick={() => onTagClick(tag)} // Call the onTagClick handler
          >
            {tag}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BlogTags;
