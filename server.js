const Koa = require("koa");
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  ctx.set('Cross-origin-Embedder-Policy', 'require-corp');
  ctx.set('Cross-origin-Opener-Policy','same-origin');
  await next();
});

app.use(serve(path.join(__dirname, '/public')));

app.listen(3000);
