'use strict';

var City = require('./city');
var fs = require('fs');
var _ = require('lodash');

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

/**
 * Load cities from a file asynchronously.
 *
 * @method loadCities
 *
 * @param {String} fileOfCities The path to the file of cities to parse.
 * @param {Callback} cb - The callback to indicate that all cities have been added.
 *
 */
Country.prototype.loadCities = function(fileOfCities, cb) {
  var self = this;
  // Reading the file of cities and cleaning the data.
  fs.readFile(fileOfCities, { encoding: 'utf8' }, function(err, listOfCities) {
    var citiesAndPopulationsArray = listOfCities.split(/\n/);
    var citiesAndPopulationsString = citiesAndPopulationsArray.toString();
    var cleanArrayOfCitiesAndPopulations = citiesAndPopulationsString.split(/\s*,\s*/);
    
    // Separating the city and population data into correlated arrays.
    var cities = _.filter(cleanArrayOfCitiesAndPopulations, function(item, index) {
      return index % 2 === 0;
    });
    var populations = _.filter(cleanArrayOfCitiesAndPopulations, function(item, index) {
      return index % 2 !== 0;
    });

    // Adding the cities to the Country.
    _.forEach(cities, function(city, n) {
      self.addCity(city, { population: populations[n] });
    });
  // Indicating that all cities have been added to the Country.
  cb();
  });
};

module.exports = Country;
