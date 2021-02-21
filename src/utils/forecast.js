const request = require("request");

const access_key = "1854b7a4b53669520f45e39316fb73ec";
const api = "http://api.weatherstack.com/";

const forecast = (address, callback) => {
  let url = `${api}current?access_key=${access_key}&query=${address}&units=m`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("No Internet Connection.", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const temperatureData = body.current;
      const { location, current } = body;
      callback(undefined, {
        forecast: current.weather_descriptions[0],
        temperature: temperatureData.temperature,
        feelslikeTemperature: temperatureData.feelslike,
        humidity: temperatureData.humidity,
        place: location.name,
        region: location.region,
        conuntry: location.country
      });
    }
  });
};

module.exports = forecast;
