import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const TaskSearchBar = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label="Search by Title"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearch}
      />
    </Box>
  );
};

export default TaskSearchBar;
