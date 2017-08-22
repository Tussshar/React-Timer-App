var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Clock = require('Clock');

//describe is used to group tests

describe('Clock', () => {
    it('should exist', () => {
        expect(Clock).toExist();
    });

    /*
      $el --> this is gonna store the root of the component in terms of the DOM
      ReactDOM.findDOMNode converts our component into actual HTML thats rendered
      to the browser
    */
    describe('render', () => {
      it('should render clock to output', () => {
        var clock = TestUtils.renderIntoDocument(<Clock totalSeconds={62}/>);
        var $el = $(ReactDOM.findDOMNode(clock));
        var actualText = $el.find('.clock-text').text();

        expect(actualText).toBe('01:02');
      });
    });

    describe('formatSeconds', () => {
      it('should format seconds', () => {
        var clock = TestUtils.renderIntoDocument(<Clock/>);
        var seconds = 615;
        var expected = '10:15';
        var actual = clock.formatSeconds(seconds);

        expect(actual).toBe(expected);
      });

      it('should format seconds when min/sec are less than 10', () => {
        var clock = TestUtils.renderIntoDocument(<Clock/>);
        var seconds = 61;
        var expected = '01:01';
        var actual = clock.formatSeconds(seconds);

        expect(actual).toBe(expected);
      });
    });
});
