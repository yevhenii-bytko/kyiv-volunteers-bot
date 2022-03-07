const { message } = require('../util/storage.json').settlement
const { generateExitKeyboard } = require('../util/inlineKbd')


exports.handleSettlementRequest = async ctx => {
    try {
        await ctx.answerCbQuery()
        await ctx.editMessageText(message, generateExitKeyboard())
        ctx.wizard.next()
    } catch (e) {
        console.error(`Settlement Request Error: ${e.message}`)
    }
}