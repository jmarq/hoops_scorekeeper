import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import Tabs from './Tabs';
// import {spy} from 'sinon';

describe('renders properly', () => {
  it('renders without crashing', () => {
    let tabHandler = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(<Tabs activeTab='Score' tabNames={['Score']} handler={tabHandler}/>, div);
  });

  it('renders tabs', () => {
    let tabHandler = jest.fn();
    const wrapper = shallow(<Tabs activeTab='Score' tabNames={['Score', 'Stats']} handler={tabHandler}/>);
    expect(wrapper.find('li').length).toEqual(2);
    // active tab should be score, not stats
    expect(wrapper.find('.is-active [data-tab="Score"]').length).toEqual(1);
    expect(wrapper.find('.is-active [data-tab="Stats"]').length).toEqual(0);
  });
});

describe('helper methods', () => {
  it('renders correct tab class', () => {
    let tabHandler = jest.fn();
    const wrapper = shallow(<Tabs activeTab='Score' tabNames={['Score', 'Stats']} handler={tabHandler}/>);
    let instance = wrapper.instance();
    let scoreClass = instance.tabClass('Score');
    let statsClass = instance.tabClass('Stats');
    // score should be active, others should not
    expect(scoreClass).toContain('is-active');
    expect(statsClass).toEqual('');
  });
});

describe('event handlers', () => {
  it('handles tab clicks', () => {
    let tabHandler = jest.fn();
    const wrapper = mount(<Tabs activeTab='Score' tabNames={['Score', 'Stats']} handler={tabHandler}/>);
    let statsLink = wrapper.find('a[data-tab="Stats"]').at(0);
    // using shallow, needed to pass in fake event object.
    // statsLink.simulate('click', {target: {getAttribute:function(){return 'Stats'}}});
    statsLink.simulate('click');
    // verify that the internal clickHandler was called, resulting in a call to tabHandler
    expect(tabHandler.mock.calls.length).toEqual(1);
    expect(tabHandler.mock.calls[0][0]).toEqual('Stats');
  });
});
