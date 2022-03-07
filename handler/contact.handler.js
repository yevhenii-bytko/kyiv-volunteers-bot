const { message } = require('../util/storage.json').contact
const { generateContactKeyboard, generateExitKeyboard } = require('../util/inlineKbd')

exports.handleContactRequest = async ctx => {
    try {
        await ctx.deleteMessage(ctx.message.message_id)
        await ctx.deleteMessage(ctx.wizard.state.message_id)
        const answer = await ctx.replyWithMarkdown(message, generateContactKeyboard())
        ctx.wizard.state.message_id = answer.message_id
        ctx.wizard.next()
    } catch (e) {
        console.error(`Contact Request Error: ${e.message}`)
    }
}