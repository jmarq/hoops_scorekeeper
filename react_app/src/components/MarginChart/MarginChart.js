import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
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

      let rClass = 'margin-chart__rect ';
      if(m<0) {
        rClass += 'margin-chart__rect--team1';
      }else if(m>0) {
        rClass += 'margin-chart__rect--team0';
      }else {
        rClass += 'margin-chart__rect--tie';
        rY = 50-1;
      }
      return <rect
               x={rX}
               y={rY}
               className={rClass}
               width={rWidth}
               height={rHeight || 2}
               key={"rect"+index}
             />;
    });
  }

  render() {
    return(
      <div className='margin-chart'>
        <div className='margin-chart__title'>Margin Over Time:</div>
        {this.props.items.length ?
        <svg
          className='margin-chart__chart'
          width="100%"
          height="100" viewBox="0 0 100 100" preserveAspectRatio="none"
        >
          <line className='margin-chart__line' x1="0" y1="50" x2="100" y2="50"/>
          {this.rects()}
        </svg> :
        <p className='margin-chart__empty-message'>No Scoring Plays Yet</p>
        }
      </div>
    );
  }

}

export default MarginChart;
