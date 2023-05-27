import React from 'react';
import {Navigate} from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, isLoggedIn, ...props  }) => {
	console.log(isLoggedIn)
	return (
		<div>
			isLoggedIn ? <Component {...props} /> : <Navigate to="/login" replace/>
		</div>
	);
};

export default ProtectedRouteElement;