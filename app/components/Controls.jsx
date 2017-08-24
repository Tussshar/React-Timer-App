var React = require('react');

var Controls = React.createClass({
  propTypes: {
    countdownStatus: React.PropTypes.string.isRequired,
    onStatusChange: React.PropTypes.func.isRequired
  },
  onStatusChange: function (newStatus) {//function generates new function
    return () => {
      this.props.onStatusChange(newStatus);
    }
  },
  /*componentWillReceiveProps: function (newProps) {
    console.log('Component will receive props', newProps.countdownStatus);
  },*/
  render: function () {
    var {countdownStatus} = this.props;
    /*
      We cant write conditional statement inside our jsx code.
      If want to conditionally render jsx then you need to define a new function
      then have the function return the code you would like to run and then
      you can call the function
    */

    var renderStartStopButton = () => {
      if (countdownStatus === 'started') {
        return <button className="button secondary" onClick={this.onStatusChange('paused')}>Pause</button>
      } else if (countdownStatus === 'paused' || countdownStatus === 'stopped') {
        return <button className="button primary" onClick={this.onStatusChange('started')}>Start</button>
      }
    };

    return (
      <div className="controls">
        {renderStartStopButton()}
        <button className="button alert hollow" onClick={this.onStatusChange('stopped')}>Clear</button>
      </div>
    )
  }
});

module.exports = Controls;
