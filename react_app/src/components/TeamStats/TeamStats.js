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
			<div className={'team-stats team-stats--team'+this.props.team.index}>
				<h1 className={'team-stats__team-name team-stats__team-name--team'+this.props.team.index}>{this.props.team.name}</h1>
				<table className='team-stats__table'>
					<tbody>
						<tr className='team-stats__row'>
							<td className='team-stats__cell'>Shot Percentage</td>
							<td className='team-stats__cell'>{this.shotPercentage()}</td>
						</tr>
						<tr className='team-stats__row'>
							<td className='team-stats__cell'>2PFGM</td>
							<td className='team-stats__cell'>{this.twoPointers()}</td>
						</tr>
						<tr className='team-stats__row'>
							<td className='team-stats__cell'>3PFGM</td>
							<td className='team-stats__cell'>{this.threePointers()}</td>
						</tr>
						<tr className='team-stats__row'>
							<td className='team-stats__cell'>Offensive Rebounds</td>
							<td className='team-stats__cell'>{this.countPlayType('offensive rebound')}</td>
						</tr>
						<tr className='team-stats__row'>
							<td className='team-stats__cell'>Defensive Rebounds</td>
							<td className='team-stats__cell'>{this.countPlayType('defensive rebound')}</td>
						</tr>
						<tr className='team-stats__row'>
							<td className='team-stats__cell'>Total Rebounds</td>
							<td className='team-stats__cell'>{this.totalRebounds()}</td>
						</tr>
						<tr className='team-stats__row'>
							<td className='team-stats__cell'>Turnovers</td>
							<td className='team-stats__cell'>{this.turnovers()}</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}


export default TeamStats;
