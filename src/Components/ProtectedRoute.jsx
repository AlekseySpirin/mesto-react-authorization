import React from 'react';
import {Navigate} from "react-router-dom";

const ProtectedRouteElement = ({element: Component, isLoggedIn, ...props}) => {
	console.log(isLoggedIn);
	return (
		
		isLoggedIn ? <Component {...props} /> : <Navigate to="/login" replace/>
	
	);
};

export default ProtectedRouteElement;