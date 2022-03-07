const numberPattern = /\d+/

const getResult = input => +input.match(numberPattern)

exports.saveDistrict = (ctx, next) => {
    ctx.wizard.state.districtNum = getResult(ctx.match[0])
    next()
}

exports.saveArea = (ctx, next) => {
    ctx.wizard.state.areaNumber = getResult(ctx.match[0])
    next()
}

exports.saveSettlement = (ctx, next) => {
    ctx.wizard.state.settlement = ctx.message.text
    next()
}

exports.saveContact = (ctx, next) => {
    ctx.wizard.state.concact = `+${ctx.message.contact.phone_number}`
    next()
}

exports.saveComment = (ctx, next) => {
    ctx.wizard.state.comment = !ctx?.callbackQuery ? ctx?.message?.text : 'Відсутні'
    next()
}