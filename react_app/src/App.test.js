import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


it('renders correct team name on scoreboard', () => {
  const wrapper = mount(
      <App/>
  );
  wrapper.setState({
			statPlays: [],
			gamePoint: 15,
			pointValues: {"two":1,"three":2}, //need to factor this into the scoring
			teamNames: ['Jimbo', 'Jambo'],
			endGameAcknowledged: false,  //for showing/hiding modal, maybe also for disabling stat buttons?  think about this. how should the app act after game point reached?
			activeTab: "score",
		});

  let scoreDisplay = wrapper.find(".score-display h2");
  let scoreboardTeam1 = scoreDisplay.first().text()
  //console.log(scoreboardTeam1);
  expect(scoreboardTeam1).toEqual("Jimbo");

});

