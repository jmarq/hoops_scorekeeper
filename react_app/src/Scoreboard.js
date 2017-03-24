import React, {Component} from 'react';
import './Scoreboard.css';

class ScoreDisplay extends Component{
	render() {
		return(
			<div className="score-display">
				<h2>{this.props.team.name}</h2>
				<h1>{this.props.team.score}</h1>
				<progress className="progress"
				value={this.props.team.score} max={this.props.gamepoint}>
				</progress>
			</div>
		);
	}
}


class Scoreboard extends Component {
	render() {
		return(
			<div className="scoreboard">
				<ScoreDisplay
				gamepoint={this.props.gamepoint} team={this.props.teams[0]}/>
				<div className="undo-wrap">
					<button onClick={this.props.undo}>undo</button>
				</div>
				<ScoreDisplay
				gamepoint={this.props.gamepoint} team={this.props.teams[1]}/>
			</div>
		);
	}
}

export default Scoreboard;

