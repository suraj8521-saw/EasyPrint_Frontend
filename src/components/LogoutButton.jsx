import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
export default function LogoutButton() {
 const { logout } = useAuth(); const navigate = useNavigate();
 return <button className="icon-button logout-button" title="Logout" aria-label="Logout" onClick={() => { logout(); navigate('/auth/login', { replace: true }); }}><LogOut size={22}/></button>;
}
