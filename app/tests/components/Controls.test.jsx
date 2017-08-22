var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Controls = require('Controls');

describe('Controls', () => {
  it ('should exist', () => {
    expect(Controls).toExist();
  });

  describe('render', () => {
    it('should render pause when started', () => {
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="started"/>);
      var $el = $(ReactDOM.findDOMNode(controls));
      //:contains lets you check the text value
      var $pauseButton = $el.find('button:contains(Pause)');

      //length property in the jquery selector is equal to the numer of elements found
      expect($pauseButton.length).toBe(1);
    });

    it('should render start when paused', () => {
      var controls = TestUtils.renderIntoDocument(<Controls countdownStatus="paused"/>);
      var $el = $(ReactDOM.findDOMNode(controls));
      //:contains lets you check the text value
      var $pauseButton = $el.find('button:contains(Start)');

      //length property in the jquery selector is equal to the numer of elements found
      expect($pauseButton.length).toBe(1);
    });


  });
});
