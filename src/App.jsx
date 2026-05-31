import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './todolist/NavBar';
import Home from './todolist/Home';
import TodoList from './todolist/TodoList';
import TodoViewer from './todolist/TodoViewer';
import Error from './todolist/Error';

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