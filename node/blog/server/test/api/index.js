'use strict';

import Koa from 'koa'
import importDir from 'import-dir'
import middleware from '../../middleware'
import supertest from 'supertest-as-promised';
import mongoose from 'mongoose';
import chai from 'chai';
import api from '../../api'
import {
  connectDatabase
} from '../../db/mongodb';
const dbUri = 'mongodb://localhost/blogtest'

const routes = importDir('./routes')
const app = new Koa()
app.use(middleware())
app.use(api())

// app.use(ctx => ctx.status = 404)
const request = supertest.agent(app.listen());
chai.should();

describe('Routes', () => {
  before(async () => {
    await connectDatabase(dbUri);
  });

  beforeEach(async () => {
    Object.keys(mongoose.models).forEach(async name => {
      await mongoose.model(name).remove();
    });
  });

  Object.keys(routes).forEach(name => routes[name](request));
});
