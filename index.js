import dashButton from 'node-dash-button';
import push from 'pushover-notifications';
import compliceApi from './compliceApi';
import lifxLights from './lifx_lights';
import config from 'config';

const complice = compliceApi({
  authToken: config.get('complice.authToken')
});

function dash(buttonName) {
  return config.get(`dashButtons.${buttonName}`);
}

function onDash(button, callback) {
  return dashButton(button).on('detected', () => {
    callback();

    var p = new push( {
      user: config.get('pushover.user'),
      token: config.get('pushover.token'),
    });

    p.send({
      title: '🎉 Way to go!',
      message: "I've got you button press ;)",
      priority: 1
    });
  });
}

const bidRobot = dash('bidRobot');
onDash(bidRobot, () => {
  // complice.add('+4) Bid a robot to [__]');
  console.log('Clicked!');
  lifxLights.switchBedroom();
});

const takeTrashOut = dash('takeTrashOut');
onDash(takeTrashOut, () => {
  console.log('Clicked!');
  lifxLights.switchLivingRoom();
});

const dishwasher = dash('dishwasher');
onDash(dishwasher, () => {
  complice.add('+5) Empty the dishwasher');
});

const laundry = dash('laundry');
onDash(laundry, () => {
  complice.add('+5) Laundry: [__]');
});
