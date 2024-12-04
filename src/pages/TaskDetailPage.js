import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateTask, deleteTask } from '../features/tasks/tasksSlice';
import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';

const TaskDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the task from the Redux store
  // console.log("hello")
  const task = useSelector((state) =>
    // console.log(state.tasks.tasks.length);
    // for (let i=0;i<state.tasks.tasks.length;i++){
    //   console.log(state.tasks.tasks[i].id+' '+state.tasks.tasks[i].title)
    // }
    state.tasks.tasks.find((task) => task.id === id)
);
console.log(task)

  // Define state hooks with initial values
  const [title, setTitle] = React.useState(task?.title || '');
  const [description, setDescription] = React.useState(task?.description || '');
  const [dueDate, setDueDate] = React.useState(task?.dueDate || '');

  // Update state if `task` changes
  React.useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  // Handle update
  const handleUpdate = () => {
    dispatch(updateTask({ id, title, description, dueDate }));
    navigate('/');
  };

  // Handle delete
  const handleDelete = () => {
    dispatch(deleteTask(id));
    navigate('/');
  };

  // Render task details or "Task not found" message
  if (!task) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h5" color="error">
          Task not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/tasks')}>
          Go Back to Tasks
        </Button>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Task Details
        </Typography>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          fullWidth
          margin="normal"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default TaskDetailPage;
