import React, { Component } from 'react';
import "./SetupControls.css";

class SetupControls extends Component{
	render(){
		return(
			<div className="setup-controls">
				<label className="label">Game Point</label>
				<p className="control">
					<input className="input" type="number" value={this.props.gamePoint} onChange={this.props.handleGamePoint}></input>
				</p>
				<label className="label">Twos Worth</label>
				<p className="control">
					<input className="input" type="number" value={this.props.pointValues.two} onChange={this.props.handleTwoValue}></input>
				</p>
				<label className="label">Threes Worth</label>
				<p className="control">
					<input className="input" type="number" value={this.props.pointValues.three} onChange={this.props.handleThreeValue}></input>
				</p>
				<p className="control">
					<button className="button" onClick={this.props.reset}>Reset Game</button>
				</p>
		  </div>
		);
	}
}

export default SetupControls;