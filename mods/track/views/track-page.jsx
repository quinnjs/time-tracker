/** @jsx React.DOM */
'use strict';

var React = require('react');
var moment = require('moment');

var CDN_BOOTSTRAP_CSS = '//maxcdn.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css';

var BootstrapPage = React.createClass({
  render: function() {
    var styles = this.props.styles || CDN_BOOTSTRAP_CSS;
    return <html>
      <head>
        <title>{this.props.title}</title>
        <link rel="stylesheet" href={styles} />
      </head>
      <body>
        <div className="container">
          {this.props.children}
        </div>
      </body>
    </html>;
  }
});

function getDuration(track) {
  if (track.end === null) return;
  var start = new Date(track.start);
  var end = new Date(track.end);

  return end.getTime() - start.getTime();
}

function formatInterval(interval) {
  if (interval === undefined) return;
  return moment.duration(interval).humanize();
}

var TrackList = React.createClass({
  renderTrack: function(track) {
    var duration = getDuration(track);

    return <li className="list-group-item" key={track.id}>
      <h5>
        {track.title}
        <span className="pull-right">{formatInterval(duration)}</span>
      </h5>
    </li>;
  },

  render: function() {
    return <ul className="list-group">
      {this.props.tracks.map(this.renderTrack)}
    </ul>;
  }
});

var TrackPage = React.createClass({
  render: function() {
    return <BootstrapPage title="Time tracker">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1>Time tracker</h1>
          <TrackList tracks={this.props.tracks} />
        </div>
      </div>
    </BootstrapPage>;
  }
});

module.exports = TrackPage;
