import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './MarginChart.css';

class MarginChart extends Component {

  toMargins = () => {
    let scores = [0, 0];
    let margins = [];
    for(let i of this.props.items) {
      scores[i.t] += i.p;
      let margin = scores[0]-scores[1];
      margins.push(margin);
    }
    return margins;
  }

  rects = () => {
    let margins = this.toMargins();
    let numRects = margins.length;
    let maxRectWidth = 100/10;
    let rectWidth = 100/numRects;
    if(rectWidth > maxRectWidth) {
      rectWidth = maxRectWidth;
    }
    let maxMargin = Math.max(...margins.map(function(m) {
      return Math.abs(m);
    }));
    let unitHeight = 50 / maxMargin;
    return margins.map(function(m, index) {
      let rHeight = Math.abs(unitHeight * m);
      let rWidth = rectWidth;
      let rX = index*rectWidth;
      let rY = m < 0 ? 50-rHeight : 50;

      let rClass = '';
      if(m<0) {
        rClass = 'team1';
      }else if(m>0) {
        rClass = 'team0';
      }else {
        rClass = 'tie';
        rY = 50-1;
      }
      return <rect
               x={rX}
               y={rY}
               className={rClass}
               width={rWidth}
               height={rHeight || 2}
             />;
    });
  }

  render() {
    return(
      <div className='margin-chart'>
        <div>Margin Over Time:</div>
        {this.props.items.length ?
        <svg
          width="100%"
          height="100" viewBox="0 0 100 100" preserveAspectRatio="none"
        >
          <line x1="0" y1="50" x2="100" y2="50"/>
          {this.rects()}
        </svg> :
        <p>No Scoring Plays Yet</p>
        }
      </div>
    );
  }

}

export default MarginChart;
