const { message } = require('../util/storage.json').areas
const { generateAreaKeyboard } = require('../util/inlineKbd')

exports.handleAreaRequest = async ctx => {
    try {
        await ctx.answerCbQuery()
        await ctx.editMessageText(message, generateAreaKeyboard(ctx.wizard.state?.districtNum))
        ctx.wizard.next()
    } catch (e) {
        console.error(`Area Request Error: ${e.message}`)
    }
}