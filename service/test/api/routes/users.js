'use strict';

const user = {
  name: 'test',
  email: 'test.user@gmail.com',
  password: 'secret',
  confirm_password: 'secret',
};

const user1 = {
  name: 'test1',
  email: 'test1.user@gmail.com',
  password: 'secret',
  confirm_password: 'secret',
};

export default function testUsers(request) {
  describe('Users', () => {
    it('should create user', async () => {
      const res = await request.post('/api/users')
        .send(user)
        .expect(200)
        .expect('Content-Type', /json/)

      Object.keys(res.body).should.have.length(5);
      res.body.should.have.property('_id');
      res.body.name.should.equal(user.name);
      res.body.email.should.equal(user.email);
      res.body.admin.should.equal(false);
    });

    it('should get user', async () => {
      let res = await request.post('/api/users')
        .send(user)
        .expect(200);

      res = await request.get(`/api/users/${res.body._id}`)
        .expect(200)
        .expect('Content-Type', /json/);

      Object.keys(res.body).should.have.length(5);
      res.body.should.have.property('_id');
      res.body.name.should.equal(user.name);
      res.body.email.should.equal(user.email);
      res.body.admin.should.equal(false);
    });

    it('should put user', async () => {
      let res = await request.post('/api/users')
        .send(user)
        .expect(200);

      res = await request.put(`/api/users/${res.body._id}`)
        .send(user1)
        .expect(200)
        .expect('Content-Type', /json/)

      res = await request.get(`/api/users/${res.body._id}`)
        .expect(200)
        .expect('Content-Type', /json/)


      Object.keys(res.body).should.have.length(5)
      res.body.name.should.equal(user1.name)

    })

    it('should del user', async () => {
      let res = await request.post('/api/users')
        .send(user)
        .expect(200)

      let id = res.body._id

      res = await request.delete(`/api/users/${res.body._id}`)
        .expect(204)

      res = await request.get(`/api/users/${id}`)
        .expect(404)
    })
  });
}
