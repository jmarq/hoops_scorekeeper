import React, { Component } from 'react';
import './TeamStats.css';

class TeamStats extends Component{
	// props should be statPlays, team = {index: __, name: ____}

	countPlayType = (playType) => {
		let obj = {
			team: this.props.team.index,
			playType: playType,
		};
		return this.filterPlaysByObject(obj).length;
	}

	filterPlaysByObject = (obj) => {
		let filterFunction = (d) => {
			let objKeys = Object.keys(obj);
			for( let i = 0; i < objKeys.length; i+=1 ) {
				let key = objKeys[i];
				if(obj[key] !== d[key]) {
					return false;
				}
			}
			return true;
		};
		return this.props.plays.filter(filterFunction);
	}

	totalRebounds = () => {
		let offensive = this.countPlayType('offensive rebound');
		let defensive = this.countPlayType('defensive rebound');
		return offensive + defensive;
	}

	turnovers = () => {
		// return this.countPlayType('turnover');
		let obj = {
			team: this.props.team.index,
			playType: 'turnover',
		};
		return this.filterPlaysByObject(obj).length;
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

	twoPointers = () => {
		let obj = {
			team: this.props.team.index,
			playType: 'score',
			points: 'two',
		};
		return this.filterPlaysByObject(obj).length;
	}

	threePointers = () => {
		let obj = {
			team: this.props.team.index,
			playType: 'score',
			points: 'three',
		};
		return this.filterPlaysByObject(obj).length;
	}


	render() {
		return(
			<div className={"team-stats team"+this.props.team.index}>
				<h1>{this.props.team.name}</h1>
				<table className="table">
					<tbody>
						<tr>
							<td>Shot Percentage</td>
							<td>{this.shotPercentage()}</td>
						</tr>
						<tr>
							<td>2PFGM</td>
							<td>{this.twoPointers()}</td>
						</tr>
						<tr>
							<td>3PFGM</td>
							<td>{this.threePointers()}</td>
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
