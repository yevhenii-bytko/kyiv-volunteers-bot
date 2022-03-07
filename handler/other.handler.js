const { message } = require('../util/storage.json').other

exports.handleOtherRequest = ctx =>
    ctx.replyWithMarkdown(message)
        .catch(e => console.error(`Other Message Error: ${e.message}`))
