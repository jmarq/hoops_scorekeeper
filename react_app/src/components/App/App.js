import React, {Component} from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import {connect} from 'react-redux';

import ScoreControls from '../ScoreControls/ScoreControls';
import Scoreboard from '../Scoreboard/Scoreboard';
import PlayByPlay from '../PlayByPlay/PlayByPlay';
import TeamStats from '../TeamStats/TeamStats.js';
import Tabs from '../Tabs/Tabs.js';
import SetupControls from '../SetupControls/SetupControls.js';
import ReduxSetupControls from '../SetupControls/ReduxSetupControls.js';

import {defaultSettings} from '../../reducers';
import {
			addPlay, undoPlay, resetGame, resetSettings,
			updateSettings, acknowledgeEndGame, resetEndGame, changeTab,
		} from '../../actions.js';
import {initialize} from 'redux-form';

export class App extends Component {

	constructor(props) {
		super(props);
		console.log(props.settings);
	}

	handleTab = (ev) => {
		this.props.actions.changeTab(ev.target.getAttribute('data-tab'));
	}


	// for dynamically showing/hiding the rebound buttons.
	// rebounds are only necessary after misses (and blocks)
	// returns [true/false, team index of team that shot the ball]
	needRebound = () => {
		if( this.props.statPlays.length === 0) {
			return [false, undefined];
		}
		let lastPlay = this.props.statPlays.slice(-1)[0];
		if (lastPlay.playType === 'miss') {
			return [true, lastPlay.team];
		}else {
			return [false, undefined];
		}
	}


	// look at statPlays to figure out how many points a team has.
	teamScore = (teamIndex) =>{
		/* return {name: ___, score: ___ } */
		let pointValues = this.props.settings.pointValues;
		let teamScoringPlays = this.props.statPlays.filter(function(p) {
			return p.team === teamIndex && p.playType === 'score';
		});
		let totalScore = teamScoringPlays.reduce(function(prev, val) {
			return prev + Number(pointValues[val.points]);
		}, 0);
		return {
			index: teamIndex,
			name: this.props.settings.teamNames[teamIndex],
			score: totalScore,
		};
	}

	// look at team scores and game point to see if anyone has won yet.
	// "win by two" is assumed, though that should eventually become an option
	winningTeam = () =>{
		// console.log("in winningTeam");
		let scores = [this.teamScore(0), this.teamScore(1)];
		let sortedScores = scores.sort(function(a, b) {
			return b.score - a.score;
		}); // descending sort
		// console.log(sortedScores);
		let differenceThreshold = this.props.settings.winByTwo ?
			(sortedScores[0].score - sortedScores[1].score >=2) :
			(sortedScores[0].score > sortedScores[1].score);
		// console.log(differenceThreshold);
		if(sortedScores[0].score >= this.props.settings.gamePoint
		&& differenceThreshold) {
			// console.log("WINNER");
			return sortedScores[0].name;
		}else{
			return false;
		}
	}

	renderLastPlay = () => {
		let numStatPlays = this.props.statPlays.length;
		let last = '';
		if(numStatPlays) {
			let lastPlay = this.props.statPlays[numStatPlays-1];
			// render a string using lastPlay
			// {teamNames[d.team]} - {d.playType} {pointValues[d.points]}
			let team = this.props.settings.teamNames[lastPlay.team];
			let type = lastPlay.playType;
			let points = this.props.settings.pointValues[lastPlay.points] || '';
			last = `${team} - ${type} ${points}`;
		}else {
			last = 'no plays yet';
		}
		return last;
	}

// TODO: work this into redux.
// should endgame acknowledgment be part of redux store?
	reset = (ev) => {
		if(confirm('Are you sure you want to reset the game?')) {
			this.props.actions.reset();
		}
	}

// submit handler for the settings form
	reduxSettingsSubmit = (values) => {
		let settingsObject = {
			gamePoint: Number(values.gamePoint),
			teamNames: [values.team1Name, values.team2Name],
			pointValues: {
				two: Number(values.twosWorth),
				three: Number(values.threesWorth),
			},
			winByTwo: values.winByTwo,
		};
		this.props.actions.updateSettings(settingsObject);
	}

	// which tab is active? what do we show for that tab?
	//   there is probably a better way to do this.
	// also, the number and length of props passed is getting sort of cumbersome.
	//   consider how to address this.
	// maybe there should be a wrapper component for each switch case?
	tabContent = () => {
		switch(this.props.activeTab) {

			case 'setup':
				return(
					<div>
						<ReduxSetupControls
						onSubmit={this.reduxSettingsSubmit}
						defaultSettings={this.props.actions.resetSettings}
						resetGame={this.props.actions.resetGame}
						extra={this.props.settings}
						initialValues={{
							team1Name: this.props.settings.teamNames[0],
							team2Name: this.props.settings.teamNames[1],
							gamePoint: ''+this.props.settings.gamePoint,
							twosWorth: ''+this.props.settings.pointValues.two,
							threesWorth: ''+this.props.settings.pointValues.three,
							winByTwo: this.props.settings.winByTwo,
						}}
						/>
					</div>
				);

			case 'score':
				return(
					<div>
						<div>
							<Scoreboard gamepoint={this.props.settings.gamePoint}
							undo={this.props.actions.undoPlay}
							teams={[this.teamScore(0), this.teamScore(1)]}/>
						</div>
						<div className="score-tab-last-play">
						last: {this.renderLastPlay()}
						</div>
						<div>
							<ScoreControls
							values={this.props.settings.pointValues}
							needRebound={this.needRebound()}
							addPlay={this.props.actions.addPlay}
							team={{index: 0, name: this.props.settings.teamNames[0]}}>
							</ScoreControls>
							<ScoreControls
							values={this.props.settings.pointValues}
							needRebound={this.needRebound()}
							addPlay={this.props.actions.addPlay}
							team={{index: 1, name: this.props.settings.teamNames[1]}}>
							</ScoreControls>
						</div>
					</div>
				);

			case 'stats':
				return(
					<div>
						<TeamStats team={{index: 0, name: this.props.settings.teamNames[0]}}
						plays={this.props.statPlays}></TeamStats>
						<TeamStats team={{index: 1, name: this.props.settings.teamNames[1]}}
						plays={this.props.statPlays}></TeamStats>
					</div>
				);

			case 'plays':
				return(
					<PlayByPlay teamNames={this.props.settings.teamNames}
					plays={this.props.statPlays}
					pointValues={this.props.settings.pointValues}/>
				);

			default:
				return '';

		}
	}

	render() {
		// break the endgame modal and gamepoint input into
		//   their own components eventually
    return(
			<div>

				<div className={'modal' + (this.winningTeam() &&
					!this.props.endGameAcknowledged ? ' is-active': '')}>
					<div className='modal-background'></div>
					<div className="modal-content">
						<h1>{this.winningTeam()} is the winner</h1>
					</div>
					<button className="modal-close"
					onClick={this.props.actions.acknowledgeEndGame}></button>
				</div>
				<Tabs activeTab={this.props.activeTab} handler={this.handleTab}></Tabs>
				{ this.tabContent() }

			</div>
		);
	}

}


function mapStateToProps(state, ownProps) {
	return {
		settings: state.settings,
		statPlays: state.plays,
		endGameAcknowledged: state.endGameAcknowledged,
		activeTab: state.activeTab,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			addPlay: (playObject) => {
				dispatch(addPlay(playObject));
			},
			undoPlay: () => {
				dispatch(undoPlay());
			},
			resetGame: () => {
				dispatch(resetGame());
			},
			updateSettings: (settingsObject) => {
				dispatch(updateSettings(settingsObject));
			},
			resetSettings: () => {
				dispatch(initialize('setupControls', {

							team1Name: defaultSettings.teamNames[0],
							team2Name: defaultSettings.teamNames[1],
							gamePoint: ''+defaultSettings.gamePoint,
							twosWorth: ''+defaultSettings.pointValues.two,
							threesWorth: ''+defaultSettings.pointValues.three,
							winByTwo: defaultSettings.winByTwo,
				}));
			},
			acknowledgeEndGame: () => {
				dispatch(acknowledgeEndGame());
			},
			changeTab: (tabName) => {
				dispatch(changeTab(tabName));
			},
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
