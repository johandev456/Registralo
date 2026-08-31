import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AutomationForm from "./pages/AutomationForm";
import AutomationDetail from "./pages/AutomationDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import { verifyActiveSession } from './services/auth.service';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

function App(){
  const setUser = useAuthStore((state)=>state.setUser)
  useEffect(() => {
    verifyActiveSession()
      .then((username) => setUser({ username }))
      .catch(() => {}) // si no hay cookie, queda null y ProtectedRoute redirige
  }, [])
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/automations/new" element={<AutomationForm />} />
          <Route path="/automations/:id" element={<AutomationDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}