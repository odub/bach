const { expect } = require('chai');
const { Moment } = require('../../src/models');

describe('Moment', () => {
  describe('#findBassPitch', () => {
    let subject, removedNotes;

    before(done => {
      Promise.all([
        Moment.findOne({ where: { id: 1 } }),
        Moment.findOne({ where: { id: 2 } }),
      ]).then(m => {
        subject = m[0];
        noNotes = m[1];
        noNotes.getNotes().then(notes => {
          removedNotes = notes;
          noNotes.setNotes([]).then(() => done());
        });
      });
    });

    after(done => {
      noNotes.setNotes(removedNotes).then(() => done());
    });

    it('returns the expected pitch string', done => {
      subject.findBassPitch().then(result => {
        expect(result).to.eq('D3');
        done();
      });
    });

    it('throws an error when no notes are associated to the moment', done => {
      expect(noNotes.findBassPitch).to.throw();
      done();
    });
  });

  describe('#findTransposition', () => {
    let m1, m2;
    before(done => {
      Promise.all([
        Moment.findOne({ where: { id: 81 } }),
        Moment.findOne({ where: { id: 150 } }),
      ]).then(m => {
        m1 = m[0];
        m2 = m[1];
        done();
      });
    });

    it('returns the expected interval', done => {
      m1.findTransposition(m2).then(result => {
        expect(result).to.eq('2M');
        done();
      });
    });
  });

  describe('#findTransposition', () => {
    let m1, m2;
    before(done => {
      Promise.all([
        Moment.findOne({ where: { id: 81 } }),
        Moment.findOne({ where: { id: 150 } }),
      ]).then(m => {
        m1 = m[0];
        m2 = m[1];
        done();
      });
    });

    it('returns the expected interval', done => {
      m1.findTransposition(m2).then(result => {
        expect(result).to.eq('2M');
        done();
      });
    });
  });

  describe('#findSimilar', () => {
    let subject;

    before(done => {
      Moment.findOne({ where: { id: 1 } }).then(m => {
        subject = m;
        done();
      });
    });

    it('returns the expected number of similar moments', done => {
      subject.findSimilar().then(result => {
        expect(result.length).to.eq(1492);
        done();
      });
    });

    it('respects the includeSelf flag', done => {
      Promise.all([
        subject.findSimilar(),
        subject.findSimilar({ includeSelf: true }),
      ]).then(result => {
        expect(result[0].length + 1).to.eq(result[1].length);
        done();
      });
    });

    it('throws an error when no notes are associated to the moment', done => {
      expect(noNotes.findBassPitch).to.throw();
      done();
    });
  });
});
