const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Update the path accordingly
const expect = chai.expect;

chai.use(chaiHttp);

describe('User Routes', () => {
  it('should sign up a user on POST /sign-up', async () => {
    const res = await chai
      .request(app)
      .post('/auth/sign-up')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        PhoneNumber:"22354698"
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').equal('register successfully');
    expect(res.body).to.have.property('user');
  });
  it('should return an error if email already exists on POST /sign-up', async () => {
    const res = await chai
      .request(app)
      .post('/auth/sign-up')
      .send({
        name: 'Another Test User',
        email: 'test@example.com', // Use the same email as in the previous test
        password: 'anotherpassword',
        PhoneNumber:"22354698"
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').equal('Email is Already used');
  });

  it('should log in a user on POST /login', async () => {
    const res = await chai
      .request(app)
      .post('/auth/login')
      .send({
        email: 'taha@gmail.com',
        password: 'Taha02#@',
      });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('user');
    expect(res.body).to.have.property('token');

    // You may want to store the user token for making authenticated requests
    const userToken = res.body.token;
    console.log(userToken);
  });

  // Add more tests for other routes, including failure scenarios, logout, etc.
});
