import React, { useState } from 'react';
import { Button, Stack, TextField, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setFilter } from '../features/tasks/tasksSlice';

const TaskFilters = ({ onSearch }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass search term to parent
  };

  return (
    <Stack spacing={2} sx={{ mb: 2 }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => dispatch(setFilter('ALL'))}
            sx={{ width: '100%' }}
          >
            All Tasks
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={() => dispatch(setFilter('COMPLETED'))}
            sx={{ width: '100%' }}
          >
            Completed
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => dispatch(setFilter('PENDING'))}
            sx={{ width: '100%' }}
          >
            Pending
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={() => dispatch(setFilter('OVERDUE'))}
            sx={{ width: '100%' }}
          >
            Overdue
          </Button>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          {/* <TextField
            label="Search by Title"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{
              maxWidth: '100%',
              marginTop: '10px',
            }}
          /> */}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default TaskFilters;
