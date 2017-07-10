import React, { Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import './SetupControls.css';

// maybe this could be a container component? why?
//    to avoid cumbersome passing of props.
//    wrapper component doesn't need change handlers,
//    it just has them for the sake of passing them down here
//   why not?  it doesn't really introduce any further state...
const SetupControls = props => {
	const {handleSubmit, pristine, reset, submitting, defaultSettings} = props;
	return(
		<div className="setup-controls">
			<form onSubmit={handleSubmit}>
				<div className="control">
					<label htmlFor="team1Name" className="label">Team 1</label>
					<div>
						<Field
						name="team1Name"
						className="input"
						id="team1Name"
						component="input"
						type="text"
						placeholder="Team 1"
						/>
					</div>
				</div>
				<div className="control">
					<label htmlFor="team2Name" className="label">Team 2</label>
					<div>
						<Field
						name="team2Name"
						component="input"
						className="input"
						id="team2Name"
						type="text"
						placeholder="Team 2"
						/>
					</div>
				</div>
				<div className="control">
					<label htmlFor="gamePoint" className="label">Game Point</label>
					<div>
						<Field
						name="gamePoint"
						component="input"
						className="input"
						id="gamePoint"
						type="number"
						placeholder="Game Point"
						/>
					</div>
				</div>
				<div className="control">
					<label htmlFor="twosWorth" className="label">Twos Worth</label>
					<div>
						<Field
						name="twosWorth"
						component="input"
						className="input"
						id="twosWorth"
						type="number"
						placeholder="Twos Worth"
						/>
					</div>
				</div>
				<div className="control">
					<label htmlFor="threesWorth" className="label">Threes Worth</label>
					<div>
						<Field
						name="threesWorth"
						component="input"
						className="input"
						id="threesWorth"
						type="number"
						placeholder="Threes Worth"
						/>
					</div>
				</div>
				<div>
					<button className="button" type="submit" disabled={submitting}>Submit</button>
					<button className="button" type="button" disabled={submitting} onClick={defaultSettings}>
						Default Settings
					</button>
				</div>
			</form>
		</div>
	);
};

export default reduxForm({
	form: "setupControls",
	destroyOnUnmount: false
})(SetupControls);
