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
