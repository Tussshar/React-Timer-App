var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
    getInitialState: function(){
      return {
        count: 0,
        countdownStatus: 'stopped'
      };
    },
    componentDidUpdate: function(prevProps, prevState) {
      /*
        Component life cycle methods are used every time something happens to
        your component i.e. they are shown to the browser, removed or
        their state changes
      */
      /*
        This function gets called after either prop or state gets updated
        and it gets passed the previous props and previous state
      */
      if(this.state.countdownStatus !== prevState.countdownStatus){
        switch (this.state.countdownStatus) {
          case 'started':
            this.startTimer();
            break;
          case 'stopped':
            this.setState({count: 0});//Notice there is no break for this case
          case 'paused':
            clearInterval(this.timer)
            this.timer = undefined;
            break;
        }
      }
    },
    /*componentWillUnmount: function () {
      /*
        This method automatically gets fired by react right before your component
        gets removed from the DOM i.e. it gets visually removed from the browser
      */
/*
      console.log('Component Did unmount');
    },*/
    /*componentWillUpdate: function (nextProps, nextState) {
      /*
        Gets triggered just before component getting update
        gets new prop and new state as a parameter
      */
      /*
    },*/
    componentWillMount: function () {
      /*
        This method gets fired as your component first gets mounted
        i.e. if component is rendered to the screen, then the componentWillMount
        method gets called just before it is shown on the screen
        This means you dont have value to the refs or DOM so if you have to make
        any changes suppose to an input field you cannot do it in this method
      */

      console.log('Component Will mount');
      clearInterval(this.timer);
      this.timer = undefined;
    },
    /*componentDidMount: function () {
      /*
        This method gets fired when everything is rendered to the DOM
        which means you are going to have access to any refs you want to do any
        updating
      */
/*
      console.log('COmponent Did mount');
    },*/
    startTimer: function () {
      /*
        setInterval gets error function as the first argument which would
        get called every time the interval happens and
        time in milli seconds as the second argument
        Timer would give us access to the variable when user clicks
        pause or clear
      */
      this.timer = setInterval(() => {
        var newCount = this.state.count - 1;
        this.setState({
          count: newCount >= 0 ? newCount : 0
        });

        
      }, 1000);
    },
    handleSetCountdown: function(seconds) {

      this.setState({
        count:seconds,
        countdownStatus: 'started'
      });
    },
    handleStatusChange: function (newStatus) {
      this.setState({countdownStatus: newStatus});
    },
    render: function(){
      var {count, countdownStatus} = this.state;
      var renderControlArea = () => {
        if(countdownStatus !== 'stopped') {
          return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>;
        }else {
          return <CountdownForm onSetCountdown={this.handleSetCountdown}/>;
        }
      };

      return (
          <div>
            <Clock totalSeconds={count}/>
            {renderControlArea()}
          </div>
      );
    }
});

module.exports = Countdown;
