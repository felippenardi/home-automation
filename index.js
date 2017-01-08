import dashButton from 'node-dash-button';
import config from 'config';
import compliceApi from './compliceApi';

const complice = compliceApi({
  authToken: config.get('complice.authToken')
});

function dash(buttonName) {
  return config.get(`dashButtons.${buttonName}`);
}

function onDash(button, callback) {
  return dashButton(button).on('detected', () => {
    callback();
  });
}

const bidRobot = dash('bidRobot');

onDash(bidRobot, () =>  complice.add('+4) Bid a robot to [__]'));
