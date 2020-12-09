require("babel-polyfill");
require('@babel/register')({
    presets: [
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    plugins: [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : true }]
    ]
});
require('./Ssr/app.js');