import React, {Component} from 'react';
import './Scoreboard.css';

class ScoreDisplay extends Component{
  render() {
    let score = this.props.team.score;
    return(
      <div className={'score-display score-display--team'+this.props.team.index}>
        <h2 className={'score-display__team-name score-display__team-name--team'+this.props.team.index}>{this.props.team.name}</h2>
        <h1 className={'score-display__score score-display__score--team'+this.props.team.index}>
          {/* pad with 0 if single digit */}
          {((''+score).length<2 ? '0' : '')+score}
        </h1>
        <progress className={'progress score-display__progress score-display__progress--team'+this.props.team.index}
        value={score} max={this.props.gamepoint}>
        </progress>
      </div>
    );
  }
}


class Scoreboard extends Component {
  render() {
    return(
      <div className="scoreboard">
        <ScoreDisplay
        gamepoint={this.props.gamepoint} team={this.props.teams[0]}/>
        <div className="scoreboard__undo-wrap">
          <p className='scoreboard__game-point'>game to {this.props.gamepoint}</p>
          <button className='scoreboard__undo-button' onClick={this.props.undo}>undo</button>
        </div>
        <ScoreDisplay
        gamepoint={this.props.gamepoint} team={this.props.teams[1]}/>
      </div>
    );
  }
}

export default Scoreboard;

