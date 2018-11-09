const expect = require('chai').expect;
const sampleForecastData = require('./sampleForecast.json');
const sampleWeatherData = require('./sampleWeather.json');

import { processForecastResponse, getFiveDayForecast, getDayOfWeek, getVerdict } from './utils';

describe('Utils', () => {

  describe('Forecast Functions', () => {

    let data;

    describe('processForecastResponse', () => {
      before(() => {
        data = processForecastResponse(sampleForecastData);
      })
      it('takes JSON and returns an array of the same length as the JSON\'s list array', () => {
        expect(data).to.be.an('array').with.a.lengthOf(sampleForecastData.list.length);
      });
      it('returns an array of prediction objects with the correct format', () => {
        data.forEach(prediction => {
          expect(prediction).to.have.all.keys('time', 'nord', 'code', 'temp', 'high', 'low', 'icon');
          expect(prediction.time).to.be.a('string').with.a.lengthOf(2);
          expect(prediction.icon).to.be.a('string').with.a.lengthOf(3);
          expect(prediction.code).to.be.a('number');
        });
      });
    });

    describe('getFiveDayForecast', () => {
      before(() => {
        data = getFiveDayForecast(data);
      })
      it('takes an array of prediction objects and returns an array of 4 or more forecast objects', () => {
        expect(data).to.be.an('array').with.a.lengthOf.at.least(4);
      });
      it('returns an array of forecast objects with the correct format', () => {
        data.forEach(forecast => {
          expect(forecast).to.have.all.keys('high', 'low', 'icon', 'code');
          expect(forecast.icon).to.be.a('string').with.a.lengthOf(3);
        });
      });
    });

  });

  describe('getDayOfWeek', () => {
    it('takes an integer and returns the correct day of the week', () => {
      expect(getDayOfWeek(1)).to.equal('Monday');
    });
    it('throws an error if the number is not between 0-6', () => {
      expect(getDayOfWeek(7)).to.be.an('error');
    });
  });

  describe('getVerdict', () => {
    it('takes two integers and returns a string', () => {
      expect(getVerdict(59, 803)).to.be.a('string');
    });
    it('returns the string \'oh no\' if the second parameter is 202', () => {
      expect(getVerdict(78, 202)).to.equal('oh no');
    });
  });

});