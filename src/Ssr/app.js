import Koa from "koa";
import Router from "koa-router"
import path from "path";
import fs from "fs";
import render from "./render"



const env = process.env.NODE_ENV;
const isPro = process.env.NODE_ENV === 'production';
const config = require('../../build/config')[env];
const app = new Koa();
let serverBundle;
let template;
let readyPromise;
if(isPro){
    serverBundle = require(path.resolve(__dirname,"./../../public/js/server-bundle")).default;
    template = fs.readFileSync(path.resolve(__dirname,"./../../public/server.tpl.html"), 'utf-8');
}else{
    readyPromise = require('./../../build/dev-server')(app,path.resolve(__dirname, "./../index.html"))
}




const router = new Router();
router.get('*', async (ctx, next) => {
    if(isPro) {
        await render(ctx, serverBundle, template);
    }else{
        const { bundle, clientHtml } = await readyPromise;
        await render(ctx, bundle, clientHtml);
    }
    next();
});


app.use(require('koa-static')(path.resolve(__dirname,"./../../public")));
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, () => {
    console.log(`node服务已启动，服务地址为：locahost:${config.port}`);
});
