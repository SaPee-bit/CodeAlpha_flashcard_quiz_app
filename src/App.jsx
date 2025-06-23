import React from 'react'
import { Card, CardContent} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminFlashcard from "./pages/AdminFlashcard";
import UserFlashcard from "./pages/UserFlashcard";
import Login from "./pages/Login";
import './App.css'

// Tailwind CSS is used for styling this component. Ensure Tailwind is configured in your project.

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminFlashcard />} />
        <Route path="/" element={<UserFlashcard />} />
      </Routes>
    </Router>
  )
}
export default App