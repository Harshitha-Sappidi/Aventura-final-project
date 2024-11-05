import React from 'react';
import { Box, Avatar, Typography, Divider } from '@mui/material';
import { Blog } from '../../../models/blog';
import { t } from 'i18next';
import './AboutAuthor.scss';

interface AboutAuthorProps {
  blog: Blog;
}

const AboutAuthor: React.FC<AboutAuthorProps> = ({ blog }) => {
  const { author } = blog;

  return (
    <Box className="aboutAuthorContainer">
      <Typography variant="h6" component="h2" gutterBottom>
        {t("about_author")}
      </Typography>
      <Box className="dividerContainer">
        <div className="blueLine"></div>
        <Divider />
      </Box>
      <Box className="authorInfo">
        <Avatar
          alt={author.name}
          src={author.profilePicture}
          className="authorAvatar"
        />
        <Box className="authorText">
          <Typography variant="h6" component="h3">
            {author.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {author.bio}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutAuthor;
