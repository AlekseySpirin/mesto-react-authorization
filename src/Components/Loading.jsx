import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
	return (
		<div className="loading">
			<FaSpinner className="loading-icon" />
		</div>
	);
};

export default Loading;