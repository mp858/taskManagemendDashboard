import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, TextField } from '@mui/material';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskFilters from './TaskFilters';

const TaskDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ color: '#1976D2', fontWeight: 'bold' }}>
        Task Management Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Search Tasks by Title"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
        </Grid>
        
        {/* Task Filters and List */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <TaskFilters />
            <TaskList searchTerm={searchTerm} />
          </Paper>
        </Grid>

        {/* Add Task Form */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ color: '#1976D2', fontWeight: 'bold' }}>
              Add New Task
            </Typography>
            <AddTaskForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaskDashboard;
