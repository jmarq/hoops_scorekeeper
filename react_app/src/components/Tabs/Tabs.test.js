import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import Tabs from './Tabs';

describe('renders properly', () => {
  it('renders without crashing', () => {
    let tabHandler = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(<Tabs activeTab='score' handler={tabHandler}/>, div);
  });

  it('renders tabs', () => {
    let tabHandler = jest.fn();
    const wrapper = shallow(<Tabs activeTab='score' handler={tabHandler}/>);
    expect(wrapper.find('li').length).toEqual(4);
    // active tab should be score, not stats
    expect(wrapper.find('.is-active [data-tab="score"]').length).toEqual(1);
    expect(wrapper.find('.is-active [data-tab="stats"]').length).toEqual(0);
  });
});

describe('helper methods', () => {
  it('renders correct tab class', () => {
    let tabHandler = jest.fn();
    const wrapper = shallow(<Tabs activeTab='score' handler={tabHandler}/>);
    let instance = wrapper.instance();
    let scoreClass = instance.tabClass('score');
    let statsClass = instance.tabClass('stats');
    // score should be active, others should not
    expect(scoreClass).toContain('is-active');
    expect(statsClass).toEqual('');
  });
});

describe('event handlers', () => {
  it('handles tab clicks', () => {
    let tabHandler = jest.fn();
    const wrapper = shallow(<Tabs activeTab='score' handler={tabHandler}/>);
    let statsLink = wrapper.find('a[data-tab="stats"]').at(0);
    statsLink.simulate('click');
    expect(tabHandler.mock.calls.length).toEqual(1);
  });
});
