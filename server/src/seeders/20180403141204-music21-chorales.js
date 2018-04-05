const fs = require('fs');

const models = require('../models');

const seedChorales = (queryInterface, next) => {
  const chorales = fs.createReadStream('./data/chorales.txt');
  let overhang = '';

  chorales.on('data', chunk => {
    const lines = `${overhang}${chunk.toString()}`.split('\n');
    overhang = lines.slice(-1)[0];
    const chorales = lines.slice(0, -1);
    models.Chorale.bulkCreate(chorales.map(JSON.parse));
  });

  chorales.on('end', () => {
    next(null);
  });
};

const seedNotes = (queryInterface, next) => {
  const notes = fs.createReadStream('./data/notes.txt');
  let overhang = '';

  notes.on('data', chunk => {
    const lines = `${overhang}${chunk.toString()}`.split('\n');
    overhang = lines.slice(-1)[0];
    const notes = lines.slice(0, -1);
    models.Note.bulkCreate(notes.map(JSON.parse));
  });

  notes.on('end', () => {
    next(null);
  });
};

module.exports = {
  up: (queryInterface, Sequelize, next) => {
    seedChorales(queryInterface, (error, chorales) => {
      seedNotes(queryInterface, () => {
        console.log('done');
        next(null);
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Note', null, {});
    return queryInterface.bulkDelete('Chorale', null, {});
  },
};
