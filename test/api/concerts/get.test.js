const server = require('../../../server');
const Concert = require('../../../models/concerts.model');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const testConcertOne = new Concert({ 
        _id: '5d9f1140f10a81216cfd4408', 
        performer: 'Performer 1', 
        genre: 'Genre 1', 
        price: 40, 
        day: 1, 
        image: 'Image 1' });
    await testConcertOne.save();

    const testConcertTwo = new Concert({ 
        _id: '5d9f1159f81ce8d1ef2bee48', 
        performer: 'Performer 2', 
        genre: 'Genre 2', 
        price: 100, 
        day: 2, 
        image: 'Image 2' });
    await testConcertTwo.save();

  });

  it('it should return a concert by day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

  it('it should return a concert by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Performer 1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('it should return a concert by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Genre 1');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('it should return a concert by price', async () => {
    const res = await request(server).get('/api/concerts/price/15/80');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(1);
  });

  it('it should return a concert by price2', async () => {
    const res = await request(server).get('/api/concerts/price/15/120');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(2);
  });

  after(async () => {
    await Concert.deleteMany({});
  });
});