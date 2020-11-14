/**
 * Run amass and return list of subdomains
 * @param {String} domain 
 */
const ASSET_TYPE = 'subdomain';

const { spawn } = require('child_process');
const Asset = require('../src/models/asset');
const DNS = require('../utils//dns');

module.exports = (domain) => {
  if (process.env.DEVMODE) {
    console.log('DEVMODE - amass is not running');
    return false;
  }
  
  console.log('running amass', domain)
  const amass = spawn('amass', ['enum', '-d', domain])
  
  amass.stdout.on('data', (subdomainFound) => {
    subdomainFound = subdomainFound.toString()
    console.log(`subdomain found: ${subdomainFound}`)
    subdomainFound = subdomainFound.split('\n')
    subdomainFound.forEach((e) => {
      if(e.length < 3) return
      console.log(`found new asset: ${e}`);
      let asset = new Asset({
        identifier: '{ type: String, unique: true }',
        type: ASSET_TYPE,
        contentType: 'String',
        URI: e,
        IP: 'String',
        belongsTo: 'aProgram',
        technology: ['String'],
        response: 200,
        tool: 'amass',
        command: 'amass enum -d ' + domain,
      })
      asset.show()
      asset.dns().ip().then(console.log)
    })
  });
  
  amass.stderr.on('data', (data) => {
    // console.error(`stderr: ${data}`);
  });
  
  amass.on('close', (code) => {
    console.log(`amass exited with code ${code}`);
  });
}
