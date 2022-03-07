const { message } = require('../util/storage.json').exit

exports.handleExitRequest = async ctx => {
    try {
        await ctx.answerCbQuery()
        await ctx.editMessageText(message)
        await ctx.scene.leave()
    } catch (e) {
        console.error(e => console.error(`Exit Request Error: ${e.message}`))
    }
}