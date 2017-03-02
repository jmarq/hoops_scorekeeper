import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import PlayByPlay from './PlayByPlay';

const testProps = {
  teamNames: ["Team 1", "Team 2"],
  pointValues: {two: 1, three:3},
  plays: [
    {playType:"score", team: 0, points: "two"}
  ]
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PlayByPlay {...testProps}/>, div);
});


it('renders correct scoring play', () => {
  const wrapper = mount(
      <PlayByPlay {...testProps}/>
  );
  let plays = wrapper.find(".play");
  let first_play = plays.first().text();
  console.log(first_play);
  //console.log(scoreboardTeam1);
  expect(first_play).toEqual("Team 1 - score 1");

});
