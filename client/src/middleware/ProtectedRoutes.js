import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwt from 'jwt-decode'
import Home from '../pages/welcome'

export const useAuth = () => {
    return localStorage.getItem('accessToken')?.toString()
}

export const useSession = () => {
    const session = useAuth();

    const decodedSession = session ? jwt(session) : null
    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate('/home', { replace: true })
        }
    }, [navigate, session])

    return decodedSession
}

const ProtectedRoutes = () => {
    const isAuthorized = useAuth();
    return isAuthorized ? <Outlet /> : <Home />
}

export default ProtectedRoutes
