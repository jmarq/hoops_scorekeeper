import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './PlayByPlay.css';
import MarginChart from '../MarginChart/MarginChart';

class PlayByPlay extends Component {
  displayPlays = () => {
    let teamNames = this.props.teamNames;
    let pointValues = this.props.pointValues;
    let numPlays = this.props.plays.length;
    if(numPlays) {
      return this.props.plays.map(function(d, i) {
        return <div
                className={'play-by-play__play' +(i===numPlays-1 ? ' play-by-play__play--last-play' : '')}
                key={i}>
                <span className={'play__team-name play__team-name--team'+d.team}>
                  {teamNames[d.team]}
                </span> - {d.playType} {pointValues[d.points]}
              </div>;
      });
    }else{
      return <div className="play-by-play__play play-by-play__play--empty">No plays yet</div>;
    }
  }

  scoringPlays = () => {
    return this.props.plays.filter(function(d) {
      return d.playType == 'score';
    }).map((d) => {
        return {t: d.team, p: this.props.pointValues[d.points]};
    });
  }

  componentDidMount() {
    // console.log(ReactDOM.findDOMNode(this));
    let div = ReactDOM.findDOMNode(this).querySelector('.play-by-play__list');
    div.scrollTop = div.scrollHeight;
  }

  render() {
    return(
      <div className='play-by-play'>
        <h1 className='play-by-play__title'>Play-by-Play:</h1>
        <div className='play-by-play__list'>
          {this.displayPlays()}
        </div>
        <MarginChart items={this.scoringPlays()}/>
      </div>
    );
  }

}

export default PlayByPlay;
