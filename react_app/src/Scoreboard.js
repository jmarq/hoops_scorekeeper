import React, { Component } from 'react';
import "./Scoreboard.css";

class ScoreDisplay extends Component{
	render(){
		return(
			<div className="score-display">
				<h2>{this.props.team.name}</h2>
				<h1>{this.props.team.score}</h1>
			</div>
		)
	}
}


class Scoreboard extends Component{
	render(){
		return(
			<div className="scoreboard">
				<ScoreDisplay team={this.props.teams[0]}/>
				<ScoreDisplay team={this.props.teams[1]}/>
			</div>
		)
	}
}

export default Scoreboard;

