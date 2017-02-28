import React, { Component } from 'react';
import "./ScoreControls.css";

class ScoreControls extends Component {


	scoreTwo = (event) => {
		var team = this.props.team.index;
		this.props.addPlay(
			{team: team, points:"two", playType:"score"}
		);				
	}

	scoreThree = (event) => {
		var team = this.props.team.index;
		this.props.addPlay(
			{team: team, points:"three", playType:"score"}
		);				
	}

	addMiss = (event) =>{
    this.props.addPlay({
			team: this.props.team.index, playType: "miss"
		});
	}

	rebound = (event) =>{
		this.props.addPlay({
			team:this.props.team.index, playType: "rebound"
		});
	}

	render(){
		return(
			<div className="score-controls">
				{this.props.needRebound &&
				  <button onClick={this.rebound}>rebound</button>
				}
				{this.props.needRebound ||
				<span>
					<button onClick={this.scoreTwo}>+{this.props.values.two}</button>				
					<button onClick={this.scoreThree}>+{this.props.values.three}</button>				
					<button onClick={this.addMiss}>miss</button>
				</span>
				}
				<p>
				<button className="undo-play" onClick={this.props.undo}>undo</button>
				</p>
			</div>
		)
	}
}

export default ScoreControls;
