const { locations } = require('../util/kyiv-region.json')
const { message } = require('../util/storage.json').end
const { generateResumeKeyboard } = require('../util/inlineKbd')

const generateResumeResult = (user, data) =>
    `👤 Ім'я: @${user.username}\n` +
    `📍 Район: ${locations[data.districtNum].district}\n` +
    `📍 Громада: ${locations[data.districtNum].areas[data.areaNumber]}\n` +
    `📍 Населений пунктк: ${data.settlement}\n` +
    `📞 Контакт: ${data.concact}\n` +
    `📃 Коментарі: ${data.comment}\n` +
    `📅 Дата: ${new Date().toLocaleDateString('uk-UA')}`

const useInputChanging = async ctx => {
    await ctx.deleteMessage(ctx.message.message_id)
    await ctx.deleteMessage(ctx.wizard.state.message_id)
    const answer = ctx.reply(generateResumeResult(ctx.chat, ctx.wizard.state), generateResumeKeyboard())
    ctx.wizard.state.message_id = answer.message_id
}

const useCallbackChanging = async ctx => {
    await ctx.editMessageText(generateResumeResult(ctx.chat, ctx.wizard.state), generateResumeKeyboard())
}

exports.handleResumeRequest = async ctx => {
    try {
        ctx?.message?.text ? await useInputChanging(ctx) : await useCallbackChanging(ctx)
        await ctx.wizard.next()
    } catch (e) {
        console.error(`Resume Request Error: ${e.message}`)
    }
}

exports.handleAcceptRequest = async ctx => {
    try {
        await ctx.telegram.sendMessage(process.env.CHANNEL_ID, generateResumeResult(ctx.chat, ctx.wizard.state))
        await ctx.editMessageText(message)
        await ctx.scene.leave()
    } catch (e) {
        console.error(`Accept Request Error: ${e.message}`)
    }
}