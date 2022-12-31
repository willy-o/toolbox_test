import chai, { expect } from 'chai';
import chaiHttp from 'chai-http'

chai.use(chaiHttp);

const url= 'http://localhost:8080';

describe('Single request: ',()=>{
  it('home request', (done) => {
  chai.request(url)
    .get('/')
    .end( function(err,res){
      expect(res).to.have.status(200);
    done();
    });
  });
});
 
describe('File request: ',()=>{
  it('List', (done) => {
    chai.request(url)
      .get('/files/list')
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Donwoload file', (done) => {
    chai.request(url)
      .get('/files/data')
      .query({filename: 'test1.csv'})
      .set('Authorization', 'Bearer aSuperSecretKey')
      .end( function(err,res){
        expect(res).to.have.status(200);
        done();
      });
  });
});
