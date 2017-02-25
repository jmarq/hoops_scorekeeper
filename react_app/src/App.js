import React, { Component } from 'react';
import './App.css';

import ScoreControls from './ScoreControls';
import Scoreboard from './Scoreboard';
import PlayByPlay from './PlayByPlay';
 
class App extends Component {
	constructor(props){
    super(props);
		this.state = {
			statPlays: [],
			gamePoint: 15,
			pointValues: {"two":2,"three":3}, //need to factor this into the scoring
			teamNames: ['Team 1', 'Team 2']
		}
	}	
	
	// a team scored a basket
	addPlay = (play) => {
		var newPlays = [ ...this.state.statPlays, play];
		console.log("in addScoringPlay");
		console.log(newPlays);
		this.setState({statPlays: newPlays});
	}

	needRebound = () => {
		if( this.state.statPlays.length === 0){ return false }
		let lastPlayType = this.state.statPlays.slice(-1)[0].playType;
		return lastPlayType === "miss" || lastPlayType === "block" 
	}

	teamScore = (teamIndex) =>{
		/* return {name: ___, score: ___ } */
		let teamScoringPlays = this.state.statPlays.filter(function(p){return p.team===teamIndex && p.playType==="score"});
		let totalScore = teamScoringPlays.reduce(function(prev,val){return prev + val.points}, 0);
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


	render(){
    return(
			<div>
			  <h1>game point {this.state.gamePoint}</h1>
			  {this.winningTeam() ? <h1>{this.winningTeam()} is the winner</h1>: ""}
			  	<Scoreboard teams={[this.teamScore(0),this.teamScore(1)]}/>
				<div>
					<ScoreControls needRebound={this.needRebound()} addPlay={this.addPlay} team={{index:0, name: this.state.teamNames[0]}}></ScoreControls>					
					<ScoreControls needRebound={this.needRebound()} addPlay={this.addPlay} team={{index:1, name: this.state.teamNames[1]}}></ScoreControls>					
					<PlayByPlay teamNames={this.state.teamNames} plays={this.state.statPlays}/>
				</div>
			</div>
		)
	}

}

export default App;
