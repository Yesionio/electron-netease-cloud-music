const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const projectRoot = path.resolve('.');

let argv = process.argv.slice(2);
if (!argv.length) argv = ['main', 'renderer'];

/* eslint-disable no-console */

if (argv[0] === 'clean') {
    const distPath = path.join(projectRoot, 'dist');
    const cnt = require('fs').readdirSync(distPath).filter(f => f[0] !== '.').length;
    if (cnt) {
        require('child_process').execSync(`rm -r ${distPath}/*`);
        console.log('Clean webpack bundle succeed.\n');
    }
    else console.log('Nothing to clean.\n');
    process.exit(0);
} else {
    // copy package.json to dist path, or we cannot start app
    fs.createReadStream(path.join(projectRoot, 'package.json'))
        .pipe(fs.createWriteStream(path.join(projectRoot, 'dist/package.json')));
    // copy login.html to dist path, or we cannot use web login
    fs.createReadStream(path.join(projectRoot, 'src/renderer/login.html'))
        .pipe(fs.createWriteStream(path.join(projectRoot, 'dist/login.html')));
}

let webpackCfg = [];
if (~argv.indexOf('main')) webpackCfg.push(require('./webpack.config.main'));
if (~argv.indexOf('renderer')) webpackCfg.push(require('./webpack.config.renderer'));

if (!webpackCfg.length) {
    console.error('No pack target specified.');
    console.log('Expected "main" or "renderer"\n');
    process.exit(1);
}

const dtStart = Date.now();
webpack(webpackCfg, (err, stats) => {
    const dtEnd = Date.now();
    if (err) throw err;
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }));
    console.log('\n\nPack for ' + argv.join(', ') + ' succeed.');
    console.log(`It takes ${(dtEnd - dtStart)/1000} second(s).\n`);
});
