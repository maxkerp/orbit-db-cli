'use strict'

const IPFS = require('ipfs')
const IPFSRepo = require('ipfs-repo')

const startIpfs = (config = {}) => {
  return new Promise((resolve, reject) => {
    config = Object.assign({}, config, { repo: new IPFSRepo(config.repo) })
    const ipfs = new IPFS(config)
    ipfs.on('error', reject)
    ipfs.on('ready', () => resolve(ipfs))
  })
}

module.exports = startIpfs
