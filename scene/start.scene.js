const { Scenes, Composer } = require('telegraf')

const manager = require('../middleware/manager.middleware')
const validator = require('../middleware/validator.middleware')
const { handleStartRequest } = require('../handler/start.handler')
const { handleDistrictRequest } = require('../handler/district.handler')
const { handleExitRequest } = require('../handler/manipulation.handler')
const { handleAreaRequest } = require('../handler/area.handler')
const { handleSettlementRequest } = require('../handler/settlement.handle')
const { handleContactRequest } = require('../handler/contact.handler')
const { handleCommentRequest } = require('../handler/comment.handler')
const { handleResumeRequest, handleAcceptRequest } = require('../handler/resume.handler')

const id = 'start-scene'

const firstComposer = new Composer(handleStartRequest)

const secondComposer = new Composer(validator.validateCallbackQuery)
    .action('start', handleDistrictRequest)

const thirdComposer = new Composer(validator.validateCallbackQuery)
    .action(/district+\d*$/, manager.saveDistrict, handleAreaRequest)
    .action('exit', handleExitRequest)

const fourthComposer = new Composer(validator.validateCallbackQuery)
    .action(/area+\d*$/, manager.saveArea, handleSettlementRequest)
    .action('exit', handleExitRequest)

const fifthComposer = new Composer(validator.validateInputData)
    .on('text', validator.validateSettlement, manager.saveSettlement, handleContactRequest)
    .action('exit', handleExitRequest)

const sixthComposer = new Composer(validator.validateContact)
    .on('message', manager.saveContact, handleCommentRequest)

const seventhComposer = new Composer(validator.validateInputData)
    .on('text', validator.validateComment, manager.saveComment, handleResumeRequest)
    .action('skip', manager.saveComment, handleResumeRequest)
    .action('exit', handleExitRequest)

const eighthComposer = new Composer(validator.validateCallbackQuery)
    .action('accept', handleAcceptRequest)
    .action('exit', handleExitRequest)

const scene = new Scenes.WizardScene(id, firstComposer, secondComposer, thirdComposer,
    fourthComposer, fifthComposer, sixthComposer, seventhComposer, eighthComposer)

module.exports = { id, scene }