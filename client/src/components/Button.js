import React from 'react';

const Button = (props) => {
	return(
		<button
			style= {props.style}
      id = {props.id}
			className= {
				props.type === "primary" ? "btn btn-primary" : "btn btn-secondary"
			}
			onClick= {props.action}>
			{props.title}
		</button>
	);
}

export default Button;
