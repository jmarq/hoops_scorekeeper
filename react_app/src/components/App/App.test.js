import React from 'react';
import ReactDOM from 'react-dom';
import {mount} from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// this should probably be a test on the scoreboard component
// but it was a nice way to familiarize myself with Enzyme mounting
it('renders correct team name on scoreboard', () => {
  const wrapper = mount(
      <App/>
  );
  wrapper.setState({
			statPlays: [],
			gamePoint: 15,
			pointValues: {'two': 1, 'three': 2},
			teamNames: ['Jimbo', 'Jambo'],
			endGameAcknowledged: false,  // for showing/hiding modal,
      // maybe also for disabling stat buttons?
      // think about this. how should the app act after game point reached?
			activeTab: 'score',
		});

  let scoreDisplay = wrapper.find('.score-display h2');
  let scoreboardTeam1 = scoreDisplay.at(0).text();
  let scoreboardTeam2 = scoreDisplay.at(1).text();
  expect(scoreboardTeam1).toEqual('Jimbo');
  expect(scoreboardTeam2).toEqual('Jambo');
});

