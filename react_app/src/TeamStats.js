import React, { Component } from 'react';
import './TeamStats.css';

class TeamStats extends Component{
	// props should be statPlays, team = {index: __, name: ____}

	countPlayType = (playType) => {
		let count = 0;
		let plays = this.props.plays;
		let teamIndex = this.props.team.index;
		for( let i = 0; i<plays.length; i +=1 ) {
			if( plays[i].playType === playType && plays[i].team === teamIndex ) {
				count += 1;
			}
		}
		return count;
	}

	totalRebounds = () => {
		let offensive = this.countPlayType('offensive rebound');
		let defensive = this.countPlayType('defensive rebound');
		return offensive + defensive;
	}

	turnovers = () => {
		return this.countPlayType('turnover');
	}

	shotPercentage = () => {
		let makes = this.countPlayType('score');
		let misses = this.countPlayType('miss');
		let total = makes + misses;
		let percentage = 0;
		if( total ) {
			percentage = makes / total * 100;
		}
		let roundedPercentage = ''+percentage.toFixed(2)+'%';
		let stringFraction = ''+makes+'/'+total;
		return roundedPercentage+' ('+stringFraction+')';
	}


	render() {
		return(
			<div className="team-stats">
				<h1>{this.props.team.name}</h1>
				<table className="table">
					<tbody>
						<tr>
							<td>Shot Percentage</td>
							<td>{this.shotPercentage()}</td>
						</tr>
						<tr>
							<td>Offensive Rebounds</td>
							<td>{this.countPlayType('offensive rebound')}</td>
						</tr>
						<tr>
							<td>Defensive Rebounds</td>
							<td>{this.countPlayType('defensive rebound')}</td>
						</tr>
						<tr>
							<td>Total Rebounds</td>
							<td>{this.totalRebounds()}</td>
						</tr>
						<tr>
							<td>Turnovers</td>
							<td>{this.turnovers()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}


export default TeamStats;
