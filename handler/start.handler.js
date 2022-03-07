const { message } = require('../util/storage.json').start
const { generateStartKeyboard } = require('../util/inlineKbd')

exports.handleStartRequest = async ctx => {
    try {
        const answer = await ctx.replyWithMarkdown(message, generateStartKeyboard())
        ctx.wizard.state.message_id = answer.message_id
        ctx.wizard.next()
    } catch (e) {
        console.error(`Start Request Error: ${e.message}`)
    }
}