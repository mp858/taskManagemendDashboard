import { createSlice } from '@reduxjs/toolkit';
let nextId = 1;
const initialState = {
  tasks: [],
  filter: 'ALL',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
        id: String(nextId++), // Assign a unique string ID
      };
      state.tasks.push(newTask);
    },
     // Action to update a task
     updateTask: (state, action) => {
      const { id, title, description, dueDate } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex], // Keep the existing properties
          title,                    // Update title
          description,              // Update description
          dueDate,                  // Update due date
        };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, updateTask, deleteTask, toggleComplete, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
