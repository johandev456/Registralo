import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AutomationForm from "./pages/AutomationForm";
import AutomationDetail from "./pages/AutomationDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App(){
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