'use strict';

var React = require('react');

var TrackPage = require('./views/track-page.jsx');

var dataNode = document.getElementById('TrackPageData');
var data = JSON.parse(dataNode.textContent);

React.renderComponent(TrackPage(data), document);
