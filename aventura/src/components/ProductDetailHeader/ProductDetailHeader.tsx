import React from 'react';
import { Typography } from '@mui/material';
import Breadcrumb from '../BreadCrumb/BreadCrumb';
import './ProductDetailHeader.scss';

interface ProductDetailHeaderProps {
  category: string;
  productName: string;
}

const ProductDetailHeader = ({ category, productName }: ProductDetailHeaderProps) => {
  return (
    <div className="product-detail-header">
      <Typography variant="h4" className="product-title">{productName}</Typography>
      <Breadcrumb category={category} productName={productName} />
    </div>
  );
}

export default ProductDetailHeader;
