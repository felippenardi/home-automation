import request from 'request';

const compliceApiUrl = "https://complice.co/api/v0/u/me/intentions?auth_token=";

const compliceApi = ({
  proto = {
    authToken: '',
  }, authToken }) => {

  const instance = Object.create(proto);
  if (authToken !== undefined) instance.authToken = authToken;

  instance.add = (message) => {
    request({
      url: compliceApiUrl + authToken,
      method: 'POST',
      json: true,
      body: { raw: message },
    }, function (error, response, body){
      console.log(response);
    });

  }

  return instance;
};

export default compliceApi;
