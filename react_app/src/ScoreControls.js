import React, {Component} from 'react';
import "./ScoreControls.css";

class ScoreControls extends Component {

	scoreTwo = (event) => {
		let team = this.props.team.index;
		this.props.addPlay(
			{team: team, points: 'two', playType: 'score'}
		);
	}

	scoreThree = (event) => {
		let team = this.props.team.index;
		this.props.addPlay(
			{team: team, points: 'three', playType: 'score'}
		);
	}

	addMiss = (event) =>{
		this.props.addPlay({
			team: this.props.team.index, playType: 'miss',
		});
	}

	addRebound = (event) =>{
		let offensiveRebound = this.props.team.index === this.props.needRebound[1];
		let playType = offensiveRebound ? "offensive rebound" : "defensive rebound";
		this.props.addPlay({
			team: this.props.team.index, playType: playType,
		});
	}

	addTurnover = (event) => {
		this.props.addPlay({
			team: this.props.team.index, playType: 'turnover',
		});
	}

	render(){
		return(
			<div className="score-controls">
				{this.props.needRebound[0] &&
				  <button onClick={this.addRebound}>rebound</button>
				}
				{this.props.needRebound[0] ||
				<span>
					<button onClick={this.scoreTwo}>+{this.props.values.two}</button>				
					<button onClick={this.scoreThree}>+{this.props.values.three}</button>				
					<button onClick={this.addMiss}>miss</button>
					<button onClick={this.addTurnover}>TO</button>
				</span>
				}
			</div>
		)
	}
}

export default ScoreControls;
