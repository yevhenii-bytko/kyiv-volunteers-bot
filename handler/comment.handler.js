const { message } = require('../util/storage.json').comment
const { generateCommentKeyboard } = require('../util/inlineKbd')

exports.handleCommentRequest = async ctx => {
    try {
        await ctx.deleteMessage(ctx.message.message_id)
        await ctx.deleteMessage(ctx.wizard.state.message_id)
        const answer = await ctx.reply(message, generateCommentKeyboard())
        ctx.wizard.state.message_id = answer.message_id
        await ctx.wizard.next()
    } catch (e) {
        console.error(`Comment Request Error: ${e.message}`)
    }

}