const fs = require('fs')
const util = require('util')

const color = require('./colors.js')
const debug = {
  chat: require('debug')('CHAT'),
  log: require('debug')('LOG'),
  info: require('debug')('INFO'),
  debug: require('debug')('DEBUG'),
  verbose: require('debug')('VERBOSE'),
  error: require('debug')('ERROR'),
  warn: require('debug')('WARN')
}
const chalk = require('chalk')
const errors = chalk.bold.red
const warns = chalk.bold.yellow
debug.chat.color = 10
debug.log.color = 4
debug.info.color = 0
debug.verbose.color = 0
debug.debug.color = 0

debug.error.color = 1
debug.warn.color = 3
// SECTION: end color functions | begin time

// SECTION: begin logging
const ls = fs.createWriteStream(`./logs/log-${new Date(Date.now()).toLocaleDateString().replace(/\//g, '_')}.txt`, { flags: 'a' }) // COMMENT: just unformatted chat messages
const ds = fs.createWriteStream(`./logs/debug/debug-${new Date(Date.now()).toLocaleDateString().replace(/\//g, '_')}.txt`, { flags: 'a' }) // COMMENT: formatted chat messages and debug
const log = {
  chat () {
    const text = util.format.apply(this, arguments) + '\n'
    const chat = util.format.apply(this, arguments)
    // COMMENT: info is used for chat messages
    ds.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [CHAT] ' + text) // COMMENT: write to log formatted
    ls.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [CHAT] ' + color.stripthes(text)) // COMMENT: write to log unformatted
    debug.chat(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' ' + color.mccolor(color.r(chat)))
    // process.stdout.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [CHAT] ' + mccolor(r(text)))
  },
  log () {
    const text = util.format.apply(this, arguments) + '\n'
    const chat = util.format.apply(this, arguments)
    ds.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [LOG] ' + text) // COMMENT: write to log formatted
    // ls.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [LOG] ' + color.stripthes(text)) // COMMENT: write to log unformatted
    debug.log(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' ' + chat)
    // process.stdout.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [LOG] ' + text)
  },
  warn () {
    const text = util.format.apply(this, arguments) + '\n'
    const chat = util.format.apply(this, arguments)
    ds.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [WARN] ' + text) // COMMENT: write to log formatted
    ls.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [WARN] ' + color.stripthes(text)) // COMMENT: write to log unformatted
    debug.warn(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' ' + warns(chat))
    // process.stdout.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ` ${warns('[WARN]')} ` + warns(text))
  },
  error () {
    const text = util.format.apply(this, arguments) + '\n'
    const chat = util.format.apply(this, arguments)
    ds.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [ERR] ' + text) // COMMENT: write to log formatted
    ls.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [ERR] ' + color.stripthes(text)) // COMMENT: write to log unformatted
    debug.error(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' ' + errors(chat))
    // process.stdout.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ` ${errors('[ERR]')} ` + errors(text))
  },
  debug () {
    const text = util.format.apply(this, arguments) + '\n'
    const chat = util.format.apply(this, arguments)
    ds.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [DBUG] ' + text) // COMMENT: write to log formatted
    debug.debug(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' ' + chat)
    // process.stdout.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [DEBUG] ' + text)
  },
  verbose () {
    const text = util.format.apply(this, arguments) + '\n'
    // const chat = util.format.apply(this, arguments)
    ds.write(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' [VERBOSE] ' + text)
    // debug.verbose(`[${new Date(Date.now()).toLocaleString('en-US')}]` + ' ' + chat)
  }
}

module.exports = log
