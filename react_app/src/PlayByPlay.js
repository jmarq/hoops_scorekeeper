import React, { Component } from 'react';

class PlayByPlay extends Component {
	displayPlays = () => {
		let teamNames = this.props.teamNames;
		return this.props.plays.map(function(d,i){
			return <div key={i}>{teamNames[d.team]} - {d.playType} {d.points}</div>
		})
	}

	render(){
		return(
			<div>stat plays: {this.displayPlays()}</div>
		)
	}

}

export default PlayByPlay;