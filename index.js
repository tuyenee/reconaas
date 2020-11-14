const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const program = require('./src/program');
const amass = require('./tools/amass');
require('./src/database');

/* test db connection */
// const Asset = require('./src/models/asset');
// Asset.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })

let data = JSON.parse(fs.readFileSync('data.json'));
console.log('Number of programs:', data.programs.length);

console.error = (...input) => console.log('\x1b[31m', ...input, '\x1b[0m');
// dotenv.config();

console.log('TESTENV:', process.env.DEVMODE);

if(data.programs.length) {
    data.programs.forEach((e) => {
        let aProgram = program(e.id);
        console.log(aProgram.scope)
        amass(aProgram.scope.domain[0])
    })
}
