import React from 'react';
import { Box, Typography, Divider, List, ListItem } from '@mui/material';
import { t } from 'i18next';
import { Blog } from '../../../models/blog';
import './ByCategory.scss'; 

interface ByCategoryProps {
  blogs: Blog[];
  onCategoryClick: (category: string) => void;
}

const ByCategory: React.FC<ByCategoryProps> = ({ blogs, onCategoryClick }) => {
  const getCategoryCounts = (blogs: Blog[]) => {
    const categoryCounts: Record<string, number> = {};
    blogs.forEach((blog) => {
      if (categoryCounts[blog.category]) {
        categoryCounts[blog.category]++;
      } else {
        categoryCounts[blog.category] = 1;
      }
    });
    return categoryCounts;
  };

  const categoryCounts = getCategoryCounts(blogs);

  return (
    <Box className="byCategoryContainer">
      <Typography variant="h6" component="h2" gutterBottom className="blogCategoryTitle">
        {t("categoriesBlog")}
      </Typography>
      <Box className="dividerContainer">
        <div className="blueLine"></div>
        <Divider />
      </Box>

      <List>
        {Object.entries(categoryCounts).map(([category, count]) => (
          <ListItem
            key={category}
            className="categoryItem"
            onClick={() => onCategoryClick(category)}
          >
            <Box className="categoryContent">
              <Typography className="categoryName">{category}</Typography>
              <Typography className="categoryCount">({count})</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ByCategory;
