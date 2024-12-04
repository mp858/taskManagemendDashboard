import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskDashboard from './components/TaskDashboard';
import TaskDetail from './pages/TaskDetailPage';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<TaskDashboard />} />
        <Route path="/tasks" element={<TaskDashboard />} />
        <Route path="/tasks/:id" element={<TaskDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
