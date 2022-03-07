const fs = require('fs')
const axios = require('axios').default
const { Telegram, Telegraf, Scenes, session } = require('telegraf')

const startScene = require('./scene/start.scene')
const { handleChannelRequest } = require('./handler/channel.handler')
const { handleOtherRequest } = require('./handler/other.handler')

const DEV_STATUS = 'development'
const PROD_STATUS = 'production'

const channelTypes = ['channel_post', 'edited_channel_post']

const telegramBot = new Telegraf(process.env.TOKEN)
const stage = new Scenes.Stage([startScene.scene])

telegramBot.catch((e, ctx) =>
    console.error(`Telegram Bot Error: ${ctx.updateType} ${e.message}`))

telegramBot
    .use(session())
    .use(stage.middleware())
    .on(channelTypes, handleChannelRequest)
    .start(Scenes.Stage.enter(startScene.id))
    .use(handleOtherRequest)

process.env.NODE_ENV === DEV_STATUS && runDevMode(telegramBot)
process.env.NODE_ENV === PROD_STATUS && runProdMode(telegramBot)

function runDevMode(bot) {
    axios.get(`https://api.telegram.org/bot${process.env.TOKEN}/deleteWebhook`)
        .then(() => bot.startPolling())
        .catch(e => console.error(`Development Running Error: ${e.message}`))
}

function runProdMode(bot) {
    const tlsOptions = {
        key: fs.readFileSync(process.env.KEY_PATH),
        cetr: fs.readFileSync(process.env.CERT_PATH),
        ca: [ fs.readFileSync(process.env.CA_PATH) ]
    }

    bot.telegram.setWebhook(process.env.SERVER_URL, { source: 'server-cert.pem' })
        .then(() => bot.startWebhook(`${process.env.TOKEN}`, tlsOptions, +process.env.WEBHOOK_PORT))
        .then(() => Telegram.getWebhookInfo())
        .then(webhookStatus => console.log(`Webhook status: ${webhookStatus}`))
        .catch(e => console.error(`Production Running Error: ${e.message}`))
}