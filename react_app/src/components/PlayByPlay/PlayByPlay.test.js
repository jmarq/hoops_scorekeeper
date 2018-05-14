import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import PlayByPlay from './PlayByPlay';
import {spy} from 'sinon';


let testProps = {
  teamNames: ['Team 1', 'Team 2'],
  pointValues: {two: 1, three: 3},
  plays: [
    {playType: 'score', team: 0, points: 'two'},
  ],
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayByPlay {...testProps}/>, div);
});


it('renders correct scoring play', () => {
  const wrapper = mount(
      <PlayByPlay {...testProps}/>
  );
  let plays = wrapper.find('.play-by-play__play');
  let firstPlay = plays.at(0).text();
  expect(firstPlay).toEqual('Team 1 - score 1');
});

it('renders message when there are no plays yet', () => {
  let emptyPlaysProps = {...testProps};
  emptyPlaysProps.plays = [];

  const wrapper = mount(
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

