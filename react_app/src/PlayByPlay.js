import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./PlayByPlay.css";

class PlayByPlay extends Component {
	displayPlays = () => {
		let teamNames = this.props.teamNames;
		let pointValues = this.props.pointValues;
		let numPlays = this.props.plays.length;
		if(numPlays) {
			return this.props.plays.map(function(d, i) {
				return <div className={'play ' +(i===numPlays-1 && 'last-play')}
						key={i}>
							{teamNames[d.team]} - {d.playType} {pointValues[d.points]} 
						</div>;
			});
		}else{
			return <div className="play">No plays yet</div>;
		}
	}

	componentDidMount() {
		// console.log(ReactDOM.findDOMNode(this));
		let div = ReactDOM.findDOMNode(this).querySelector('.play-by-play-list');
		div.scrollTop = div.scrollHeight;
	}

	render() {
		return(
			<div className='play-by-play'>
				Play-by-Play:
				<div className='play-by-play-list'>
					{this.displayPlays() || <div>no plays yet</div>}
				</div>
			</div>
		);
	}

}

export default PlayByPlay;
