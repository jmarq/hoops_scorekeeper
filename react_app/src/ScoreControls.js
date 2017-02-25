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
			  <p>{this.props.team.name}</p>
				{this.props.needRebound &&
				  <button onClick={this.rebound}>rebound</button>
				}
				{this.props.needRebound ||
				<span>
					<button onClick={this.scoreTwo}>+2</button>				
					<button onClick={this.scoreThree}>+3</button>				
					<button onClick={this.addMiss}>miss</button>
				</span>
				}
			</div>
		)
	}
}

export default ScoreControls;
