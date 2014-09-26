'use strict';

var City = require('./city');

/**
 * A class for countries.
 *
 * @constructor
 * @param {String} name The country name.
 */
var Country = function(name) {
  this._name = name;
  this._cities = [];
};

/**
 * Add a new city.
 *
 * @param {String} name The name of the city.
 * @param {Object} details The details of the city.
 * @return {City} Returns the created city.
 * @see {@link City}
 */
Country.prototype.addCity = function(name, details) {
  var city = new City(name, details);
  this._cities.push(city);
  return city;
};

/**
 * Find small cities, those with populations less than 200,000.
 *
 * @return {Array.<String>} An array of small city names.
 */
Country.prototype.findSmallCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population < 0.2;
  }).map(function(city) {
    return city.getName();
  });
};

/**
 * Find medium cities, those with populations between 200,000 and 1 million.
 *
 * @return {Array.<String>} An array of medium city names.
 */
Country.prototype.findMediumCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population > 0.2 && population < 1;
  }).map(function(city) {
    return city.getName();
  });
};

/**
 * Find large cities, those with populations greater than 1 million.
 *
 * @return {Array.<String>} An array of large city names.
 */
Country.prototype.findLargeCities = function() {
  return this._cities.filter(function(city) {
    var population = city.getPopulation();
    return population > 1;
  }).map(function(city) {
    return city.getName();
  });
};

module.exports = Country;
