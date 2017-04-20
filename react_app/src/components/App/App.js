import React, {Component} from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import ScoreControls from '../ScoreControls/ScoreControls';
import Scoreboard from '../Scoreboard/Scoreboard';
import PlayByPlay from '../PlayByPlay/PlayByPlay';
import TeamStats from '../TeamStats/TeamStats.js';
import Tabs from '../Tabs/Tabs.js';
import SetupControls from '../SetupControls/SetupControls.js';

class App extends Component {
	constructor(props) {
    super(props);
		this.state = {
			statPlays: [],
			//maybe put these next three items in their own settings container object in the redux store?
			//	what kind of actions?  generic actions that have a key and a value? 
			//	specific actions for each nested value?  changeTeam2?  changeTeam(2,val)? changeSetting("teamNames.2", val)
			//    changeSetting("teamNames", [])
			gamePoint: 15,
			pointValues: {'two': 1, 'three': 2},
			teamNames: ['Team 1', 'Team 2'],
			// for showing/hiding modal, maybe also for disabling stat buttons?
			// think about this. how should the app act after game point reached?
			endGameAcknowledged: false,
			activeTab: 'setup',
		};
	}

	// user has closed the "winner" modal.
	acknowledgeEnd = () => {
		this.setState({endGameAcknowledged: true});
	}

	// for adding to statPlays.
	// this could be an action, maybe?  it affects two different state variables...
	//   how would it work with combineReducers syntax?  
	addPlay = (play) => {
		let newPlays = [...this.state.statPlays, play];
		// console.log("in addScoringPlay");
		// console.log(newPlays);
		this.setState({statPlays: newPlays, endGameAcknowledged: false});
		// if they keep adding plays, maybe the game isn't over yet?
		// even if past gamepoint
	}

	// for dynamically showing/hiding the rebound buttons.
	// rebounds are only necessary after misses (and blocks)
	// returns [true/false, team index of team that shot the ball]
	needRebound = () => {
		if( this.state.statPlays.length === 0) {
			return [false, undefined];
		}
		let lastPlay = this.state.statPlays.slice(-1)[0];
		if (lastPlay.playType === 'miss') {
			return [true, lastPlay.team];
		}else {
			return [false, undefined];
		}
	}


	// look at statPlays to figure out how many points a team has.
	teamScore = (teamIndex) =>{
		/* return {name: ___, score: ___ } */
		let pointValues = this.state.pointValues;
		let teamScoringPlays = this.state.statPlays.filter(function(p) {
			return p.team === teamIndex && p.playType === 'score';
		});
		let totalScore = teamScoringPlays.reduce(function(prev, val) {
			return prev + pointValues[val.points];
		}, 0);
		return {name: this.state.teamNames[teamIndex], score: totalScore};
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
		if(sortedScores[0].score - sortedScores[1].score >=2 &&
			sortedScores[0].score >= this.state.gamePoint) {
			// console.log("WINNER");
			return sortedScores[0].name;
		}else{
			return false;
		}
	}

	renderLastPlay = () => {
		let numStatPlays = this.state.statPlays.length;
		let last = '';
		if(numStatPlays) {
			let lastPlay = this.state.statPlays[numStatPlays-1];
			// render a string using lastPlay
			// {teamNames[d.team]} - {d.playType} {pointValues[d.points]}
			let team = this.state.teamNames[lastPlay.team];
			let type = lastPlay.playType;
			let points = this.state.pointValues[lastPlay.points] || '';
			last = `${team} - ${type} ${points}`;
		}else {
			last = 'no plays yet';
		}
		return last;
	}


	// several event handlers here that will be passed down as props,
	// the handlers change the "main" state.
	// for redux, these should use dispatch functions,
	//   passed in as props when connect()ing the component
	//   to update the redux store instead of the local state.
	//   redux store values will get passed into this component as props
	changeGamePoint = (ev) => {
		this.setState({
			gamePoint: Number(ev.target.value),
			endGameAcknowledged: false,
		});
	}

	changeTwo = (ev) => {
		this.setState({
			pointValues: {
				two: Number(ev.target.value),
				three: this.state.pointValues.three,
			},
		});
	}

	changeThree = (ev) => {
		this.setState({
			pointValues: {
				two: this.state.pointValues.two,
				three: Number(ev.target.value),
			},
		});
	}

	changeTeamOne = (ev) => {
		this.setState({teamNames: [ev.target.value, this.state.teamNames[1]]});
	}

	changeTeamTwo = (ev) => {
		this.setState({teamNames: [this.state.teamNames[0], ev.target.value]});
	}

	handleTab = (ev) => {
		this.setState({activeTab: ev.target.getAttribute('data-tab')});
	}

	undoPlay = (ev) => {
		this.setState({statPlays: this.state.statPlays.slice(0, -1)});
	}

	reset = (ev) => {
		if(confirm('Are you sure you want to reset the game?')) {
			this.setState({
				statPlays: [],
				endGameAcknowledged: false,
			});
		}
	}

	propsForSetup = () => {
		return {
			handlers: {
				reset: this.reset,
				twoValue: this.changeTwo,
				threeValue: this.changeThree,
				gamePoint: this.changeGamePoint,
				teamOne: this.changeTeamOne,
				teamTwo: this.changeTeamTwo,
			},
			state: {
				gamePoint: this.state.gamePoint,
				pointValues: this.state.pointValues,
				teamNames: this.state.teamNames,
			},

		};
	}

	// which tab is active? what do we show for that tab?
	//   there is probably a better way to do this.
	// also, the number and length of props passed is getting sort of cumbersome.
	//   consider how to address this.
	// maybe there should be a wrapper component for each switch case?
	tabContent = () => {
		switch(this.state.activeTab) {

			case 'setup':
				return(
					<SetupControls {...this.propsForSetup()}></SetupControls>
				);

			case 'score':
				return(
					<div>
						<div>
							<Scoreboard gamepoint={this.state.gamePoint}
							undo={this.undoPlay}
							teams={[this.teamScore(0), this.teamScore(1)]}/>
						</div>
						<div className="score-tab-last-play">
						last: {this.renderLastPlay()}
						</div>
						<div>
							<ScoreControls
							values={this.state.pointValues}
							needRebound={this.needRebound()} addPlay={this.addPlay}
							team={{index: 0, name: this.state.teamNames[0]}}>
							</ScoreControls>
							<ScoreControls
							values={this.state.pointValues}
							needRebound={this.needRebound()} addPlay={this.addPlay}
							team={{index: 1, name: this.state.teamNames[1]}}>
							</ScoreControls>
						</div>
					</div>
				);

			case 'stats':
				return(
					<div>
						<TeamStats team={{index: 0, name: this.state.teamNames[0]}}
						plays={this.state.statPlays}></TeamStats>
						<TeamStats team={{index: 1, name: this.state.teamNames[1]}}
						plays={this.state.statPlays}></TeamStats>
					</div>
				);

			case 'plays':
				return(
					<PlayByPlay teamNames={this.state.teamNames}
					plays={this.state.statPlays} pointValues={this.state.pointValues}/>
				);

			default:
				return '';

		}
	}

	render(){
		// break the endgame modal and gamepoint input into
		//   their own components eventually
    return(
			<div>

				<div className={'modal' + (this.winningTeam() &&
					!this.state.endGameAcknowledged ? ' is-active': '')}>
				<div className='modal-background'></div>
				<div className="modal-content">
					<h1>{this.winningTeam()} is the winner</h1>
				</div>
					<button className="modal-close"
					onClick={this.acknowledgeEnd}></button>
				</div>
				<Tabs activeTab={this.state.activeTab} handler={this.handleTab}></Tabs>
				{ this.tabContent() }

			</div>
		);
	}

}

export default App;