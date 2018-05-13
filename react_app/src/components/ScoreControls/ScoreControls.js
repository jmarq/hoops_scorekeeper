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
		let playType = offensiveRebound ? 'offensive rebound' : 'defensive rebound';
		this.props.addPlay({
			team: this.props.team.index, playType: playType,
		});
	}

	addTurnover = (event) => {
		this.props.addPlay({
			team: this.props.team.index, playType: 'turnover',
		});
	}

	render() {
		return(
			<div className={'score-controls score-controls--team'+this.props.team.index}>
				{this.props.needRebound[0] &&
					<button className="score-controls__button--rebound" onClick={this.addRebound}>
						{this.props.needRebound[1]===this.props.team.index ? 'o. ' : 'd. '}
						rebound
					</button>
				}
				{this.props.needRebound[0] ||
				<span>
					<button className='score-controls__button' onClick={this.scoreTwo}>+{this.props.values.two}</button>
					<button className='score-controls__button' onClick={this.scoreThree}>+{this.props.values.three}</button>
					<button className='score-controls__button score-controls__button--bad-play' onClick={this.addMiss}>miss</button>
					<button className='score-controls__button score-controls__button--bad-play' onClick={this.addTurnover}>TO</button>
				</span>
				}
			</div>
		);
	}
}

export default ScoreControls;
