import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleComplete } from '../features/tasks/tasksSlice';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Chip,
} from '@mui/material';

const TaskList = ({ searchTerm }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const filter = useSelector((state) => state.tasks.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentDate = new Date();

  const filteredTasks = tasks.filter((task) => {
    const isOverdue = new Date(task.dueDate) < currentDate && !task.completed;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

    if (filter === 'COMPLETED') return task.completed && matchesSearch;
    if (filter === 'PENDING') return !task.completed && !isOverdue && matchesSearch;
    if (filter === 'OVERDUE') return isOverdue && matchesSearch;
    return matchesSearch; // For "All Tasks"
  });

  return (
    <Grid container spacing={2}>
      {filteredTasks.map((task) => (
        <Grid item xs={12} md={6} key={task.id}>
          <Card sx={{ borderLeft: `5px solid ${task.completed ? '#4CAF50' : '#FFC107'}` }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {task.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {task.description}
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                Due Date: {task.dueDate}
              </Typography>
              <Chip
                label={
                  new Date(task.dueDate) < currentDate && !task.completed
                    ? 'Overdue'
                    : task.completed
                    ? 'Completed'
                    : 'Pending'
                }
                color={
                  new Date(task.dueDate) < currentDate && !task.completed
                    ? 'error'
                    : task.completed
                    ? 'success'
                    : 'warning'
                }
              />
            </CardContent>
            <CardActions>
              <Button
               size="small"
               variant="outlined"
               color="primary"
               onClick={() => navigate(`/tasks/${task.id}`)} // Ensure task.id is correct
              >
                View Details
              </Button>
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={() => dispatch(toggleComplete(task.id))}
              >
                {task.completed ? 'Mark Pending' : 'Mark Completed'}
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
