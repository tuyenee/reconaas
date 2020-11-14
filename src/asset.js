/**
 * Bug bounty asset factory
 * @param {Object} data 
 *  type: String
 *  belongTo: String
 *  task: String
 *  value: String
 *  data: JSON object
 */

module.exports = (data) => {
    this.json = data;

    this.save = function() {
        console.log('saving asset', this.json)
        // Save this
    }

    return this
}
