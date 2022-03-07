const { other, settlement, comment } = require('../util/storage.json')
const { generateExitKeyboard, deleteKeyboard, generateCommentKeyboard } = require('../util/inlineKbd')

const isSettlementLength = settlement =>
    settlement.length > 2 && settlement.length < 31

const isCommentLength = comment =>
    comment.length > 1 && comment.length < 101

const handleOtherAnswer =  async ctx => {
    try {
        await ctx.deleteMessage(ctx.wizard.state.message_id)
        await ctx.replyWithMarkdown(other.message)
    } catch (e) {
        console.error(`Deletion Message Error: ${e.message}`)
    } finally {
        await ctx.scene.leave()
    }
}

const handleRepeatingSettlement = async (ctx) => {
    try {
        await ctx.deleteMessage(ctx.message.message_id)
        await ctx.deleteMessage(ctx.wizard.state.message_id)
        const answer = await ctx.reply(settlement.repeat, generateExitKeyboard())
        ctx.wizard.state.message_id = answer.message_id
    } catch (e) {
        console.error(`Repeating Message Error: ${e.message}`)
    }
}

const handleKeyboardClearing = async ctx => {
    try {
        const answer = await ctx.reply('Phone Delete', deleteKeyboard())
        await ctx.deleteMessage(answer.message_id)
    } catch (e) {
        console.error(`Deleting Keyboard Error: ${e.message}`)
    }
}

const handleRepeatingComment = async (ctx) => {
    try {
        await ctx.deleteMessage(ctx.message.message_id)
        await ctx.deleteMessage(ctx.wizard.state.message_id)
        const answer = await ctx.reply(comment.repeat, generateCommentKeyboard())
        ctx.wizard.state.message_id = answer.message_id
    } catch (e) {
        console.error(`Repeating Message Error: ${e.message}`)
    }
}

exports.validateCallbackQuery = (ctx, next) =>
    !ctx?.callbackQuery ? handleOtherAnswer(ctx) : next()

exports.validateInputData = (ctx, next) =>
    !(ctx?.message?.text || ctx?.callbackQuery) ? handleOtherAnswer(ctx) : next()

exports.validateSettlement = (ctx, next) =>
    !isSettlementLength(ctx.message.text) ?
        handleRepeatingSettlement(ctx) :
        next()

exports.validateContact = (ctx, next) =>
        handleKeyboardClearing(ctx)
            .finally(() => !ctx?.message?.contact ? handleOtherAnswer(ctx) : next())

exports.validateComment = (ctx, next) =>
    !isCommentLength(ctx.message.text) ? handleRepeatingComment(ctx) : next()
