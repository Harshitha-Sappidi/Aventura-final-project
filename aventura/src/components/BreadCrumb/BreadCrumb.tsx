import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import './BreadCrumb.scss';

interface BreadcrumbProps {
  category: string;
  productName: string;
}

const Breadcrumb = ({ category, productName }: BreadcrumbProps) => {
  const { t } = useTranslation(); // Use translation hook

  return (
    <div className="breadcrumb">
      <Link to="/" className="breadcrumb-link">{t('home')}</Link>
      <span className="breadcrumb-separator">/</span>
      <Link to="/products" className="breadcrumb-link">{t('products')}</Link>
      <span className="breadcrumb-separator">/</span>
      <Typography variant="subtitle2">{productName}</Typography>
    </div>
  );
};

export default Breadcrumb;
