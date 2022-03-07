const { keyboard, removeKeyboard, inlineKeyboard, button  } = require('telegraf').Markup
const { locations } = require('../util/kyiv-region.json')

exports.generateStartKeyboard = () =>
    inlineKeyboard([button.callback('Розпочати', 'start')])

exports.generateDistrictKeyboard = () =>
    inlineKeyboard([
        ...locations.map((location, index) =>
            [button.callback(`➕ ${location.district}`, `district${index}`)]),
        [ button.callback('✖️Відмінити', 'exit') ]
    ])

exports.generateAreaKeyboard = districtNum =>
    inlineKeyboard([
        ...locations[districtNum].areas.map((area, index) =>
            [button.callback(`➕ ${area}`, `area${index}`)]),
        [ button.callback('✖️Відмінити', 'exit') ]
    ])

exports.generateExitKeyboard = () =>
    inlineKeyboard([button.callback('✖️Відмінити', 'exit')])

exports.generateContactKeyboard = () =>
    keyboard([button.contactRequest('📞 Поділитись')])

exports.deleteKeyboard = () => removeKeyboard()

exports.generateCommentKeyboard = () =>
    inlineKeyboard([
        [button.callback('↪️Пропустити', 'skip')],
        [button.callback('✖️Відмінити', 'exit')]
    ])

exports.generateResumeKeyboard = () =>
    inlineKeyboard([
        [button.callback('✔ Підтвердити', 'accept')],
        [button.callback('✖️Відхилити', 'exit')]
    ])