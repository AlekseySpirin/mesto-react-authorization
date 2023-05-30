import React from 'react';
import {FaSpinner} from 'react-icons/fa';
import './styles/Loading.css';

const Loading = () => {
	return (
		<div className="loading">
			<FaSpinner className="loading-icon"/>
		</div>
	);
};

export default Loading;