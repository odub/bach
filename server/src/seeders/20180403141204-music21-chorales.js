const fs = require('fs');
const sequelize = require('sequelize');

const models = require('../models');

const SQL_DELETE_NOTELESS_CHORALES = `
DELETE FROM "Chorales"
WHERE bwv
IN (
  SELECT bwv FROM "Chorales"
  EXCEPT
  SELECT DISTINCT source FROM "Notes"
);
`;

const seedChorales = queryInterface =>
  new Promise((resolve, reject) => {
    const chorales = fs.createReadStream('./data/chorales.txt');
    let overhang = '';

    chorales.on('data', chunk => {
      const lines = `${overhang}${chunk.toString()}`.split('\n');
      overhang = lines.slice(-1)[0];
      const chorales = lines.slice(0, -1);
      models.Chorale.bulkCreate(chorales.map(JSON.parse));
    });

    chorales.on('end', () => {
      resolve();
    });
  });

const seedNotes = queryInterface =>
  new Promise((resolve, reject) => {
    const notes = fs.createReadStream('./data/notes.txt');
    let overhang = '';

    notes.on('data', chunk => {
      const lines = `${overhang}${chunk.toString()}`.split('\n');
      overhang = lines.slice(-1)[0];
      const notes = lines.slice(0, -1);
      models.Note.bulkCreate(notes.map(JSON.parse));
    });

    notes.on('end', () => {
      resolve();
    });
  });

module.exports = {
  up: (queryInterface, Sequelize) => {
    return (
      queryInterface.sequelize
        .query('ALTER TABLE "Notes" DISABLE TRIGGER ALL;')
        .then(() => seedChorales(queryInterface))
        .then(() => seedNotes(queryInterface))
        // Delete Chorales with no associated notes
        .then(() =>
          queryInterface.sequelize.query(SQL_DELETE_NOTELESS_CHORALES),
        )
        .then(() =>
          queryInterface.sequelize.query(
            'ALTER TABLE "Notes" ENABLE TRIGGER ALL;',
          ),
        )
    );
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Note', null, {});
    return queryInterface.bulkDelete('Chorale', null, {});
  },
};
