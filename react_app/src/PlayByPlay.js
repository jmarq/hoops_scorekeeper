import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./PlayByPlay.css";

class PlayByPlay extends Component {
	displayPlays = () => {
		let teamNames = this.props.teamNames;
		let pointValues = this.props.pointValues;
		if(this.props.plays.length){
			return this.props.plays.map(function(d,i){
				return <div className="play" key={i}>{teamNames[d.team]} - {d.playType} {pointValues[d.points]}</div>
			})
		}
		else{
			return <div className="play">No plays yet</div>
		}
	}

	componentDidUpdate(){
		console.log(ReactDOM.findDOMNode(this));
		let div = ReactDOM.findDOMNode(this);
		div.scrollTop = div.scrollHeight;
	}

	render(){
		return(
			<div className="play-by-play">
				Play-by-Play: 
				{this.displayPlays() || <div>no plays yet</div>}
			</div>
		)
	}

}

export default PlayByPlay;
