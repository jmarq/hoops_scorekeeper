import React, { Component } from 'react';
import './TeamStats.css';

class TeamStats extends Component{
	// props should be statPlays, team = {index: __, name: ____}

	countPlayType = (playType) => {
		let count = 0;
		let plays = this.props.plays;
		let teamIndex = this.props.team.index;
		for( let i = 0; i<plays.length; i+=1){
			if( plays[i].playType === playType && plays[i].team === teamIndex ){
				count += 1;
			}
		}
		return count;
	}
	rebounds = () => {
		return this.countPlayType("rebound");
	}

	shotPercentage = () => {
		let makes = this.countPlayType("score");
		let misses = this.countPlayType("miss");
		let total = makes + misses;
		let percentage = 0;
		if( total ){
			percentage = makes / total * 100;
		}
		let roundedPercentage = ""+percentage.toFixed(2)+"%";
		let stringFraction = ""+makes+"/"+total;
		return roundedPercentage+" ("+stringFraction+")";
	}



	render(){
		return(
			<div className="team-stats">
				<h1>stats for {this.props.team.name}</h1>
				<table className="table">
					<tbody>
						<tr>
							<td>Shot Percentage</td>
							<td>{this.shotPercentage()}</td>
						</tr>
						<tr>
							<td>Rebounds</td>
							<td>{this.rebounds()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}


export default TeamStats;