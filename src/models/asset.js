const mongoose = require('mongoose');
const DNS = require('../../utils/dns');

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

AssetSchema.methods.dns = function() {
  console.log('asset.dns() called', this)
  return DNS(this.URI)
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
