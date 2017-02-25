import React, { Component } from 'react';

class ScoreControls extends Component {

	scoreTwo = (event) => {
		console.log("in scoreTwo");
		var team = this.props.team.index;
		var points = 2;
		this.props.addPlay(
			{team: team, points: points, playType:"score"}
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
			<div>
			  <p>{this.props.team.name}</p>
				{this.props.needRebound &&
				  <button onClick={this.rebound}>rebound</button>
				}
				{this.props.needRebound ||
				<span>
					<button onClick={this.scoreTwo}>+2</button>				
					<button onClick={this.addMiss}>miss</button>
				</span>
				}
			</div>
		)
	}
}

export default ScoreControls;