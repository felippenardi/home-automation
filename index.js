import dashButton from 'node-dash-button';
import config from 'config';
import compliceApi from './compliceApi';

const complice = compliceApi({
  authToken: config.get('complice.authToken')
});

function dash(buttonName) {
  return config.get(`dashButtons.${buttonName}`);
}

const bidRobot = dash('bidRobot');

dashButton(bidRobot).on('detected', () => {
  complice.add('+4) Bid a robot to [__]');
});
