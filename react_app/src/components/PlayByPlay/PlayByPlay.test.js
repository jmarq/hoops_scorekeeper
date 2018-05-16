import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import PlayByPlay from './PlayByPlay';
import {spy} from 'sinon';


let testProps = {
  teamNames: ['Team 1', 'Team 2'],
  pointValues: {two: 1, three: 3},
  plays: [
    {playType: 'score', team: 0, points: 'two'},
    {playType: 'score', team: 0, points: 'three'},
    {playType: 'miss', team: 1},
  ],
};


describe('renders properly', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PlayByPlay {...testProps}/>, div);
  });


  it('renders correct scoring play', () => {
    const wrapper = shallow(
        <PlayByPlay {...testProps}/>
    );
    let plays = wrapper.find('.play-by-play__play');
    let firstPlay = plays.at(0).text();
    expect(firstPlay).toEqual('Team 1 - score 1');
  });

  it('renders message when there are no plays yet', () => {
    let emptyPlaysProps = {...testProps};
    emptyPlaysProps.plays = [];

    const wrapper = shallow(
      <PlayByPlay {...emptyPlaysProps}/>
    );
    let plays = wrapper.find('.play-by-play__play');
    let firstPlay = plays.at(0).text();
    expect(firstPlay).toEqual("No plays yet");

    // let instance = wrapper.instance();
    // let s = spy(instance, "scoringPlays");
    // wrapper.update();
    // // wrapper.instance().componentDidMount();
    // console.log(s.called);
  });
});

describe('helper methods', () => {
  it('maps plays to markup', () => {
    const wrapper = shallow(
        <PlayByPlay {...testProps}/>
    );
    let instance = wrapper.instance();
    let displayedPlays = instance.displayPlays();
    expect(displayedPlays.length).toEqual(testProps.plays.length);
    expect(displayedPlays[0].type).toEqual('div');
    expect(displayedPlays[0].props.className).toEqual('play-by-play__play');
    let expectedClass = 'play-by-play__play play-by-play__play--last-play';
    expect(displayedPlays.slice(-1)[0].props.className).toEqual(expectedClass);
  });

  it('can filter and map scoring plays', () => {
    const wrapper = shallow(
        <PlayByPlay {...testProps}/>
    );
    let instance = wrapper.instance();
    let scoringPlays = instance.scoringPlays();
    expect(scoringPlays.length).toEqual(2);
    expect(scoringPlays[0]).toEqual({
      t: 0,
      p: instance.props.pointValues['two'],
    });
  });
});

