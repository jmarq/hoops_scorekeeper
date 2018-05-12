import React, {Component} from 'react';
import './Scoreboard.css';

class ScoreDisplay extends Component{
	render() {
		let score = this.props.team.score;
		return(
			<div className={'score-display team'+this.props.team.index}>
				<h2>{this.props.team.name}</h2>
				<h1>
					{/* pad with 0 if single digit */}
					{((''+score).length<2 ? '0' : '')+score}
				</h1>
				<progress className="progress"
				value={score} max={this.props.gamepoint}>
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
					<p>game to {this.props.gamepoint}</p>
					<button onClick={this.props.undo}>undo</button>
				</div>
				<ScoreDisplay
				gamepoint={this.props.gamepoint} team={this.props.teams[1]}/>
			</div>
		);
	}
}

export default Scoreboard;

