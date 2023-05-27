import React from 'react';
import {Navigate} from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
	return (
		<div>
			props.loggedIn ? <Component {...props} /> : <Navigate to="/login" replace/>
		</div>
	);
};

export default ProtectedRouteElement;