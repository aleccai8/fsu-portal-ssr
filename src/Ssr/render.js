const { renderToString } = require('react-dom/server');
import serialize from "serialize-javascript"
import {Helmet} from "react-helmet"

function templating(template) {
    return props => template.replace(/<!--([\s\S]*?)-->/g, (_, key) => props[key.trim()]);
}

export default async function(ctx, serverBundle, template) {
    try {
        const render = templating(template);
        const jsx = await serverBundle(ctx);
        const html = renderToString(jsx);
        const store = ctx.store.getState();
        const helmet = Helmet.renderStatic();
        ctx.body = render({
            title:helmet.title.toString(),
            meta:helmet.meta.toString(),
            script:helmet.script.toString(),
            link:helmet.link.toString(),
            html:html,
            initialState: `<script>window.__INITIAL_STATE__ = ${serialize(store)}</script>`,
        });
        ctx.type = 'text/html';
    }
    catch (err) {
        console.log(err);
        if(err.code !== 404){
            ctx.code = err.code || 500;
        }


    }
};