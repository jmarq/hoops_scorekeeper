import React, { Component } from 'react';
import "./SetupControls.css";

class SetupControls extends Component{
	render(){
		return(
			<div className="setup-controls">
				gamepoint: {this.props.state.gamePoint}
				<label className="label">Game Point</label>
				<p className="control">
					<input className="input" type="number" value={this.props.state.gamePoint} onChange={this.props.handlers.gamePoint}></input>
				</p>
				<label className="label">Twos Worth</label>
				<p className="control">
					<input className="input" type="number" value={this.props.state.pointValues.two} onChange={this.props.handlers.twoValue}></input>
				</p>
				<label className="label">Threes Worth</label>
				<p className="control">
					<input className="input" type="number" value={this.props.state.pointValues.three} onChange={this.props.handlers.threeValue}></input>
				</p>
				<p className="control">
					<button className="button" onClick={this.props.handlers.reset}>Reset Game</button>
				</p>
		  </div>
		);
	}
}

export default SetupControls;