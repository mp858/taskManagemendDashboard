import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteTask, updateTask } from '../features/tasks/tasksSlice';
import { TextField, Button, Stack, Typography, Alert } from '@mui/material';

const TaskDetails = () => {
  const { id } = useParams(); // Task ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ensure the ID is converted to the correct type (number or string) based on your Redux store
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === id || task.id === Number(id))
  );

  // If task is not found, show an error message
  if (!task) {
    return (
      <Stack spacing={2} sx={{ padding: 4, alignItems: 'center' }}>
        <Alert severity="error">Task not found!</Alert>
        <Button variant="contained" color="primary" onClick={() => navigate('/tasks')}>
          Back to Dashboard
        </Button>
      </Stack>
    );
  }

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleUpdate = () => {
    dispatch(updateTask({ id: task.id, title, description, dueDate }));
    navigate('/tasks');
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    navigate('/tasks');
  };

  return (
    <Stack spacing={2} sx={{ padding: 4 }}>
      <Typography variant="h4" color="primary">
        Task Details
      </Typography>
      <TextField
        label="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        fullWidth
      />
      <TextField
        label="Due Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
      />
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Task
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete Task
        </Button>
      </Stack>
    </Stack>
  );
};

export default TaskDetails;
