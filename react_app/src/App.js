import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import './App.css';

import ScoreControls from './ScoreControls';
import Scoreboard from './Scoreboard';
import PlayByPlay from './PlayByPlay';
import TeamStats from './TeamStats.js';
 
class App extends Component {
	constructor(props){
    super(props);
		this.state = {
			statPlays: [],
			gamePoint: 15,
			pointValues: {"two":1,"three":2}, //need to factor this into the scoring
			teamNames: ['Team 1', 'Team 2'],
			endGameAcknowledged: false  //for showing/hiding modal, maybe also for disabling stat buttons?  think about this. how should the app act after game point reached?
		}
	}	
	
	acknowledgeEnd = () => {
    this.setState({endGameAcknowledged: true});
	}

	// a team scored a basket
	addPlay = (play) => {
		var newPlays = [ ...this.state.statPlays, play];
		console.log("in addScoringPlay");
		console.log(newPlays);
		this.setState({statPlays: newPlays, endGameAcknowledged: false}); //if they keep adding plays, maybe the game isn't over yet? even if past gamepoint
	}

	needRebound = () => {
		if( this.state.statPlays.length === 0){ return false }
		let lastPlayType = this.state.statPlays.slice(-1)[0].playType;
		return lastPlayType === "miss" || lastPlayType === "block" 
	}

	teamScore = (teamIndex) =>{
		/* return {name: ___, score: ___ } */
		let pointValues = this.state.pointValues;
		let teamScoringPlays = this.state.statPlays.filter(function(p){return p.team===teamIndex && p.playType==="score"});
		let totalScore = teamScoringPlays.reduce(function(prev,val){return prev + pointValues[val.points]}, 0);
		return {name:this.state.teamNames[teamIndex], score: totalScore};
	}

	winningTeam = () =>{
		console.log("in winningTeam");
		let scores = [this.teamScore(0),this.teamScore(1)];
		let sortedScores = scores.sort(function(a,b){return b.score - a.score}); //descending sort
		console.log(sortedScores);
		if(sortedScores[0].score - sortedScores[1].score >=2 && sortedScores[0].score >= this.state.gamePoint){
			console.log("WINNER");
			return sortedScores[0].name;
		}
		else{
			return false
		}
	}

	changeGamePoint = (ev) => {
		this.setState({gamePoint: ev.target.value});
	}


	render(){
		// break the endgame modal into its own component eventually
    return(
			<div>
			  <h1>game point: <input type="number" value={this.state.gamePoint} onChange={this.changeGamePoint}></input></h1>
					<div className={"modal" + (this.winningTeam() && !this.state.endGameAcknowledged ? " is-active": "")}>
				  	<div className="modal-background"></div>
					  <div className="modal-content">
						  <h1>{this.winningTeam()} is the winner</h1>
					  </div>
						<button className="modal-close" onClick={this.acknowledgeEnd}></button>
					</div>
			  	<Scoreboard gamepoint={this.state.gamePoint} teams={[this.teamScore(0),this.teamScore(1)]}/>
				<div>
					<ScoreControls values={this.state.pointValues} needRebound={this.needRebound()} addPlay={this.addPlay} team={{index:0, name: this.state.teamNames[0]}}></ScoreControls>					
					<ScoreControls values={this.state.pointValues} needRebound={this.needRebound()} addPlay={this.addPlay} team={{index:1, name: this.state.teamNames[1]}}></ScoreControls>
					<TeamStats team={{index:0, name:this.state.teamNames[0]}} plays={this.state.statPlays}></TeamStats>
					<PlayByPlay teamNames={this.state.teamNames} plays={this.state.statPlays}/>
					<TeamStats team={{index:1, name:this.state.teamNames[1]}} plays={this.state.statPlays}></TeamStats>
				</div>
			</div>
		)
	}

}

export default App;
