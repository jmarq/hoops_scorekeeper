import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./PlayByPlay.css";

class PlayByPlay extends Component {
	displayPlays = () => {
		let teamNames = this.props.teamNames;
		return this.props.plays.map(function(d,i){
			return <div key={i}>{teamNames[d.team]} - {d.playType} {d.points}</div>
		})
	}

	componentDidUpdate(){
		console.log(ReactDOM.findDOMNode(this));
		ReactDOM.findDOMNode(this).querySelector("div:last-of-type").scrollIntoView();
	}

	render(){
		return(
			<div className="play-by-play">
				stat plays: 
				{this.displayPlays()}
			</div>
		)
	}

}

export default PlayByPlay;
