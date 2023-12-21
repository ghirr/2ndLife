const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Update the path accordingly
const fs = require('fs');
const expect = chai.expect;

chai.use(chaiHttp);
const imageBuffer = fs.readFileSync('src/assets/images/7.png');
let objectId;
describe('Objet Routes', () => {
  
  it('should add an objet on POST /objets', async () => {
    const res = await chai
      .request(app)
      .post('/objet')
      .field('name', 'Test Object')
      .field('categorie', 'TestCategory')
      .field('price', 50)
      .field('username', 'islem')
      .field('userphone', '55092584')
      .field('useremail', 'wyawa@gmail.com')
      .field('description', 'Test description')
      .attach('image',imageBuffer ,'7.png');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').equal('Objet added');
  });
  

  it('should get all objets on GET /objets', async () => {
    const res = await chai.request(app).get('/objet');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('objets').to.be.an('array');
  });
  it('should get objets by email /objets', async () => {
    const res = await chai.request(app).get('/objet/own/taha@gmail.com');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('objets').to.be.an('array');
  });
  it('should get one object by id', async () => {
    const res = await chai.request(app).get('/objet/6578d39885402a0995567f75');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('objet').to.be.an('object');
  });

  it('should update an objet on POST /objets', async () => {
    const editRes = await chai
    .request(app)
    .put('/objet/657a14cb4736fd89b4cbb316')
    .field('name', 'Edited Object')
    .field('price', 75)
    .field('description', 'Edited description')
    .field('username', 'editeduser')
    .field('userphone', '9876543210')
    .field('useremail', 'edited@example.com')
    .field('adresse', 'Edited Address')
    .attach('image',imageBuffer ,'7.png');

  expect(editRes).to.have.status(200);
  expect(editRes.body).to.have.property('message').equal('objet updated successfully');
  expect(editRes.body).to.have.property('objet');
  });
  it('should delete object /objets', async () => {
    const res = await chai.request(app).delete('/objet/657a14cb4736fd89b4cbb316');

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').equal('objet deleted');
  });
});
