/**
 * Bug bounty program class
 * @param {String} programId 
 */

const fs = require('fs');

module.exports = (programId) => {
    this.id = programId;
    let programDataFile = fs.readFileSync(`programs/${programId}/scope.json`)
    this.scope = JSON.parse(programDataFile)
    return this
}
