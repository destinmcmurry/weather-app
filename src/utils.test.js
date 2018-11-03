const expect = require('chai').expect;
const sampleForecastData = require('./sampleForecast.json');
const sampleWeatherData = require('./sampleWeather.json');

import { processForecastResponse, getFiveDayForecast, getDayOfWeek, getVerdict } from './utils';

describe('Utils', function () {

  describe('Forecast Functions', function () {

    let data;

    describe('processForecastResponse', function() {
      before(function() {
        data = processForecastResponse(sampleForecastData);
      })
      it('takes JSON and returns an array of formatted data', function () {
        expect(data).to.be.an('array');
      });
      it('returns an array of the same length as the JSON\'s list array', function () {
        expect(data).to.have.a.lengthOf(sampleForecastData.list.length);
      });
      it('returns an array of prediction objects with the correct properties', function () {
        data.forEach(prediction => {
          expect(prediction).to.have.all.keys('time', 'nord', 'code', 'temp', 'high', 'low','icon');
        });
      });
    });

    describe('getFiveDayForecast', function () {
      before(function() {
        data = getFiveDayForecast(data);
      })
      it('takes formatted data and returns an array', function () {
        expect(data).to.be.an('array');
      });
      it('returns an array of forecast objects with the correct properties', function () {
        data.forEach(forecast => {
          expect(forecast).to.have.all.keys('high', 'low', 'icon', 'code');
        });
      });
    });
   
  });

});