import React, { Component } from 'react';
import "./SetupControls.css";

class SetupControls extends Component{
	render(){
		return(
			<div className="setup-controls">
				<label className="label">Game Point</label>
				<p className="control">
					<input className="input" type="number" defaultValue={this.props.state.gamePoint} onBlur={this.props.handlers.gamePoint}></input>
				</p>
				<label className="label">Twos Worth</label>
				<p className="control">
					<input className="input" type="number" defaultValue={this.props.state.pointValues.two} onBlur={this.props.handlers.twoValue}></input>
				</p>
				<label className="label">Threes Worth</label>
				<p className="control">
					<input className="input" type="number" defaultValue={this.props.state.pointValues.three} onBlur={this.props.handlers.threeValue}></input>
				</p>
				<p className="control">
					<button className="button" onClick={this.props.handlers.reset}>Reset Game</button>
				</p>
		  </div>
		);
	}
}

export default SetupControls;