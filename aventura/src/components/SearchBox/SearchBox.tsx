import React from 'react';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBox.scss';
import { t } from 'i18next';

interface SearchBoxProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ searchTerm, setSearchTerm, onSearch }) => {
    return (
        <div className="search-box">
            <TextField
                fullWidth
                variant="outlined"
                placeholder={t("search_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default SearchBox;
