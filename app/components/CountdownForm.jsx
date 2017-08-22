var React = require('react');

var CountdownForm = React.createClass({
  onSubmit: function(e){
    e.preventDefault();
    var strSeconds = this.refs.seconds.value;

    if(strSeconds.match(/^[0-9]*$/)) {
      this.refs.seconds.value = '';

      this.props.onSetCountdown(parseInt(strSeconds, 10));
      //10 specifies base
      //2 would be binary, 16 would be hexa, 10 is decimal
    }
  },
  render: function(){
    return (
      //we follow camelcase for javascript while for css we break words using '-'
      //button className is of foundation,
      //expanded className takes width of parent component
      <div>
        <form ref="form" onSubmit={this.onSubmit} className="countdown-form">
          <input type="text" ref="seconds" placeholder="Enter time in seconds"/>
          <button className="button expanded">Start</button>
        </form>
      </div>
    );
  }
});

module.exports = CountdownForm;
