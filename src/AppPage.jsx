import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Home from './Home';
import TodoList from './TodoList';
import TodoViewer from './TodoViewer';
import Error from './Error';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todolist" element={<TodoList />} />
        <Route path="/todolist/:id" element={<TodoViewer />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}