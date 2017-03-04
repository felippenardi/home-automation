import LifxClient from 'node-lifx';

var livingRoomLights = false;
var bedRoomLights = 0;
var lifx = new LifxClient.Client();

lifx.on('light-new', function(light) {
  console.log(lifx.lights().length);
});

function switchLivingRoom() {
  if (livingRoomLights) {
    livingRoomLights = !livingRoomLights;
    lifx.light('Sofá').on(2000);
    lifx.light('Mesa').on(2000);
    lifx.light('Corredor').on(2000);
    lifx.light('Teto Cozinha').on(2000);
  } else {
    livingRoomLights = !livingRoomLights;
    lifx.light('Sofá').off(2000);
    lifx.light('Mesa').off(2000);
    lifx.light('Corredor').off(2000);
    lifx.light('Teto Cozinha').off(2000);
  }
}

function switchBedroom() {
  lifx.light('Teto Quarto').getState(function(error, status) {
    const brightness = status.color.brightness;
    const altBrightness = Math.min(100, brightness + 30);
    const kelvin = status.color.brightness;
    const altKelvin = Math.max(2800, kelvin - 1200);
    console.log(altBrightness);
    if (status.power === 0 || bedRoomLights === 0) {
      bedRoomLights = 1;
      lifx.light('Teto Quarto').on();
      lifx.light('Teto Quarto').color(0,0,altBrightness,altKelvin,500);
      lifx.light('Teto Quarto').color(0,0,brightness,kelvin,1000);
      lifx.light('Teto Quarto').color(0,0,70,4000,1000);

    } else if (bedRoomLights === 1) {
      bedRoomLights = 2;
      lifx.light('Teto Quarto').color(0,0,altBrightness,altKelvin,500);
      lifx.light('Teto Quarto').color(0,0,brightness,kelvin,1000);
      lifx.light('Teto Quarto').color(0,0,25,3200,30000);

    } else {
      bedRoomLights = 0;
      lifx.light('Teto Quarto').color(0,0,altBrightness,altKelvin,500);
      lifx.light('Teto Quarto').color(0,0,brightness,kelvin,1000);
      lifx.light('Teto Quarto').off(30000);
    }

  }) 
}

lifx.init();

const lifxLights = {
  switchLivingRoom,
  switchBedroom
}

export default lifxLights;
