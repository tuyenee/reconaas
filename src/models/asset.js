const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema(
  {
    identifier: { type: String, unique: true },
    type: String,
    contentType: String,
    URI: String,
    IP: String,
    belongsTo: String,
    technology: [String],
    response: { type: Number, min: 0, max: 650 },
    tool: String,
    command: String,
  },
  { timestamps: true },
);

AssetSchema.methods.show = function() {
  console.log('Asset.show:', this)
}

/**
 * Fills asset with additional props
 * @Params: util functions that will be run in the given order
 */
AssetSchema.methods.fill = function(...args) {
  args.forEach((e) => {console.log(e)})
}

AssetSchema.methods.resolveIP = function() {
  const dns = require('dns')
  let lookupPromise = new Promise(((resolve, reject) => {
    console.log('Looking up IP for ' + this.URI)
    dns.lookup(this.URI, (err, address) => {
      if(!err) {
          this.IP = address
          resolve(this)
      } else {
          reject('DNS lookup error: ' + err)
      }
  })
  }).bind(this))
  return lookupPromise
}

module.exports = mongoose.model('Asset', AssetSchema);
/*
- identifier: a unique name identifying an asset, in most cases it is the URI
- type (domain|subdomain|path|openPort)
- contentType (text/html, application/json, etc.)
- URI
- IP
- belongsTo (a program)
- technology (array) technologies being used enumerated by Wappalyzer, nmap or other tools
    + available for assets of types
- response: response status code (200, 500, etc.)
- foundBy: (tool) name of the tool that discovered the asset
- command: t
- createdAt (time of first discovery)
- updatedAt
*/
