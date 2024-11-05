import React from 'react';
import { Grid } from '@mui/material';
import PackageCard from '../PackageCard/PackageCard';
import {Package} from '../../models/package';

interface PackageListProps {
    packages: Package[];
}

const PackageList: React.FC<PackageListProps> = ({ packages }) => {

    return (
        <Grid container spacing={3}>
            {packages.map((packageItem) => (
                <Grid item xs={12} key={packageItem.id}>
                    <PackageCard packageItem={packageItem} />
                </Grid>
            ))}
        </Grid>
    );
};

export default PackageList;
