var dash_button = require('node-dash-button'),
    dash = dash_button('84:d6:d0:63:68:cb'),
    exec = require('child_process').exec;

dash.on('detected', function() {
    console.log('Button pushed!');
});
