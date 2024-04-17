'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const { id } = ctx.query;
    ctx.body = id;
  }
  //  app/controller/home.js
  // 获取用户信息
  async user() {
    const { ctx } = this;
    const { name, slogen } = await ctx.service.home.user();
    ctx.body = {
      name,
      slogen,
    };
  }
  // post 请求方法
  async add() {
    const { ctx } = this;
    const { title } = ctx.request.body;
    // Egg 框架内置了 bodyParser 中间件来对 POST 请求 body 解析成 object 挂载到 ctx.request.body 上
    ctx.body = {
      title,
    };
  }
}

module.exports = HomeController;
