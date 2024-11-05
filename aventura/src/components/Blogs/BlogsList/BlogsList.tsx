import React from 'react';
import { Box, Typography } from '@mui/material';
import BlogCard from '../BlogCard/BlogCard';
import { Blog } from '../../../models/blog';
import { t } from 'i18next';
import './BlogList.scss';


interface BlogListProps {
  blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <Box className="blog-list">
      {blogs.length === 0 ? (
        <Typography>{t("blogdescription")}</Typography>
      ) : (
        blogs.map((blog) => (
          <Box key={blog.id} mb={3}>
            <BlogCard blog={blog} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default BlogList;
