import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {

    const isLoggedIn =false;// initial layter will be fetched from session context api aur from the jwt token saevd locally in clients browser
    return isLoggedIn?<Outlet/>:<Navigate to="/login"/>;
};
