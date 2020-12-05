/**
 * Run amass and return list of subdomains
 * @param {String} domain 
 */
const ASSET_TYPE = 'subdomain';

const { spawn } = require('child_process');
const Asset = require('../src/models/asset');

module.exports = (domain) => {
  const validate = subdomain => 
    subdomain.length > 2 &&
    subdomain.indexOf('.') > 0 && 
    subdomain.indexOf(' ') < 0

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
      if(!validate(e)) {
        console.log(`"${e}"`, 'is not a valid subdomain')
        return
      }
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
      // asset.resolveIP()
      asset.resolveIP()
        .then((asset) => {console.log(asset)})
    })
  });
  
  amass.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  amass.on('close', (code) => {
    console.log(`amass exited with code ${code}`);
  });
}
