import LifxClient from 'node-lifx';
import config from 'config';
import _ from 'lodash';

var livingRoomLights = false;
var bedRoomLights = 0;
var client = new LifxClient.Client();

const lights = config.get('lifxLights');

const allLights = _.flatMap(lights, function(groupLights) {
  return _.map(groupLights, function (label, id) {
    return { label: label,  id: id };
  });
});
const allLightsByLabel = _.keyBy(allLights, 'label');
const allLightsById = _.keyBy(allLights, 'id');

client.on('light-new', function(light) {
  console.log('New light found.');
  console.log('Total:', client.lights().length);
  console.log('ID: ' + light.id);
  console.log('Label: ' + allLightsById[light.id].label);
  console.log('----------------------');
});

function switchLivingRoom() {
  if (livingRoomLights) {
    livingRoomLights = !livingRoomLights;

    _.map(lights['sala'], function(label, id) {
      console.log(`Turning on ${label}`);
      client.light(id).on(2000);
    });
  } else {
    livingRoomLights = !livingRoomLights;

    _.map(lights['sala'], function(label, id) {
      console.log(`Turning off ${label}`);
      client.light(id).off(2000);
    });
  }
}

function switchBedroom() {
  client.light(allLightsByLabel['quarto'].id).getState(function(error, status) {
    const brightness = status.color.brightness;
    const altBrightness = Math.min(100, brightness + 30);
    const kelvin = status.color.brightness;
    const altKelvin = Math.max(2800, kelvin - 1200);
    console.log(altBrightness);
    if (status.power === 0 || bedRoomLights === 0) {
      bedRoomLights = 1;
      console.log(brightness);
      client.light(allLightsByLabel['quarto'].id).on();
      client.light(allLightsByLabel['quarto'].id).color(0,0,70,4000,1000);

    } else if (bedRoomLights === 1) {
      bedRoomLights = 2;
      client.light(allLightsByLabel['quarto'].id).color(0,0,25,3200,3000);

    } else {
      bedRoomLights = 0;
      client.light(allLightsByLabel['quarto'].id).off(3000);
    }

  }) 
}

client.init();

const lifxLights = {
  switchLivingRoom,
  switchBedroom
}

export default lifxLights;
