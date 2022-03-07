const { message } = require('../util/storage.json').district
const { generateDistrictKeyboard } = require('../util/inlineKbd')



exports.handleDistrictRequest = async ctx => {
    try {
        await ctx.answerCbQuery()
        await ctx.editMessageText(message, generateDistrictKeyboard())
        ctx.wizard.next()
    } catch (e) {
        console.error(`District Request Error: ${e.message}`)
    }
}