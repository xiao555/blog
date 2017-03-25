'use strict';

const article = {
  title: 'test',
  tags: ['test1', 'test2'],
  excerpt: 'excerpt',
  content: 'content',
  category: 'test'
};

const article1 = {
  title: 'test1',
  content: 'content1'
};

export default function testUsers(request) {
  describe('Article', () => {
    it('should create article', async () => {
      const res = await request.post('/articles')
        .send(article)
        .expect(200)
        .expect('Content-Type', /json/)

      console.log(res.body)

      Object.keys(res.body).should.have.length(10);
      res.body.should.have.property('_id');
      res.body.title.should.equal(article.title);
      res.body.content.should.equal(article.content);
      res.body.isPublic.should.equal(true);
    });

    it('should get article', async () => {
      let res = await request.post('/articles')
        .send(article)
        .expect(200);

      res = await request.get(`/articles/${res.body._id}`)
        .expect(200)
        .expect('Content-Type', /json/);

      Object.keys(res.body).should.have.length(10);
      res.body.should.have.property('_id');
      res.body.title.should.equal(article.title);
      res.body.content.should.equal(article.content);
      res.body.isPublic.should.equal(true);
    });

    it('should put article', async () => {
      let res = await request.post('/articles')
        .send(article)
        .expect(200);

      res = await request.put(`/articles/${res.body._id}`)
        .send(article1)
        .expect(200)
        .expect('Content-Type', /json/)

      res = await request.get(`/articles/${res.body._id}`)
        .expect(200)
        .expect('Content-Type', /json/)

      console.log(res.body)  
      Object.keys(res.body).should.have.length(10)
      res.body.title.should.equal(article1.title)

    })

    it('should del article', async () => {
      let res = await request.post('/articles')
        .send(article)
        .expect(200)

      let id = res.body._id

      res = await request.delete(`/articles/${res.body._id}`)
        .expect(204)

      res = await request.get(`/articles/${id}`)
        .expect(404)
    })
  });
}
