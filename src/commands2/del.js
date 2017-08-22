'use strict'

const openDatabase = require('../lib/open-database')
const outputTimer = require('../lib/output-timer')
const exitOnError = require('../exit-on-error')

const del = (db, key) => {
  // process.stdout.write(`Delete '${key}' from '${db.dbname}'`)
  return db.del(key)
    .then((hash) => {
      process.stdout.write(`Deleted ${hash}\n`)
    })
}

/* Export as Yargs command */
exports.command = 'del <database> <key>'
exports.desc = 'Delete an entry from a database. Only valid for: docstore, keyvalue and feed.'

exports.builder = function (yargs) {
  return yargs
    .example('\n$0 del /posts "hello"', 
             '\nDelete entry from a document or key-value database with key "hello"')
    .example('\n$0 del /posts QmPGKCJCRSPnPbam9b5WHDyL7mBBUjmrHFbswzfugrXbSi', 
             '\nDelete entry from a document or feed with key "QmPGKCJCRSPnPbam9b5WHDyL7mBBUjmrHFbswzfugrXbSi"')
}

exports.handler = (argv) => {
  const startTime = new Date().getTime()
  return openDatabase(argv.database, argv)
    .then((db) => {
      if (db.type !== 'docstore' && db.type !== 'feed' && db.type !== 'keyvalue')
          throw new Error(`Database type '${db.type}' doesn't support removing entries.`)
      
      return del(db, argv.key)
        .then(() => db.saveSnapshot())
    })
    .catch(exitOnError)
    .then(() => outputTimer(startTime, argv))
    .then(() => process.exit(0))
}
