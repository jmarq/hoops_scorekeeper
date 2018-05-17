import React from 'react';
import ReactDOM from 'react-dom';
import {mount, shallow} from 'enzyme';
import MarginChart from './MarginChart';


let testProps = {
  items: [
    {t: 0, p: 1},
    {t: 0, p: 2},
    {t: 1, p: 1},
    {t: 1, p: 2},
    {t: 1, p: 1},
  ],
};

describe('renders properly', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MarginChart {...testProps}/>, div);
  });

  it('renders svg if there are items', () => {
    const wrapper = shallow(<MarginChart {...testProps}/>);
    let svg = wrapper.find('svg').at(0);
    let svgProps = svg.props();
    expect(svgProps.className).toContain('margin-chart__chart');
    let svgLine = svg.find('line').at(0);
    expect(svgLine.props().className).toContain('margin-chart__line');
  });

  it('renders message instead of svg if there are not items', () => {
    const wrapper = shallow(<MarginChart items={[]}/>);
    let message = wrapper.find('.margin-chart__empty-message');
    expect(message.length).toEqual(1);
  });
});

describe('helper methods', () => {
  it('maps scoring plays into a sequence of margins', () => {
    const wrapper = shallow(<MarginChart {...testProps}/>);
    let instance = wrapper.instance();
    let margins = instance.toMargins();
    expect(margins.length).toEqual(instance.props.items.length);
    expect(margins).toEqual([1, 3, 2, 0, -1]);
  });

  it('creates rectangles from margins', () => {
    const wrapper = shallow(<MarginChart {...testProps}/>);
    let instance = wrapper.instance();
    let rects = instance.rects();
    expect(rects.length).toEqual(instance.props.items.length);
    // when team0 is winning expect rect to be marked with correct class
    expect(rects[0].props.className).toContain('margin-chart__rect--team0');
    expect(rects[0].props.className).toContain('margin-chart__rect');
    // the max margin's rect's height should be 50
    expect(rects[1].props.height).toBeCloseTo(50);
    // with less than 10 rects,  widths should be 10
    expect(rects[0].props.width).toBeCloseTo(10);
    // rects should be spaced out based on width*index
    expect(rects[4].props.x).toBeCloseTo(40);
    // rects for tied margins should have height of 2
    expect(rects[3].props.height).toBe(2);
    expect(rects[3].props.className).toContain('margin-chart__rect--tie');
  });
});
