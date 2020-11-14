const dns = require('dns');

dns.lookup('iana.org', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});

const dnsServices = function(aDomain) {
    console.log('DNS construct called', aDomain)
    this.domain = aDomain
    this.ip = () => {
        const lookupPromise = new Promise((resolve, reject) => {
            dns.lookup(aDomain, (err, address, family) => {
                if(!err) {
                    resolve({
                        ip: address,
                        family: family
                    })
                } else {
                    reject('DNS lookup error: ' + err)
                }
            })
        })
        return lookupPromise
    }
    return this;
}

module.exports = dnsServices;
