"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pircontrollers_1 = __importDefault(require("./pircontrollers"));
const body_parser_1 = __importDefault(require("body-parser"));
const checkTokenExpiration_1 = __importDefault(require("../../../functions/checkTokenExpiration"));
const checkRole_1 = __importDefault(require("../../../functions/checkRole"));
const pircontrollers_2 = __importDefault(require("./pircontrollers"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post('/pir/create', checkRole_1.default, pircontrollers_1.default.createPir);
router.post('/pir/addchapter', checkTokenExpiration_1.default, pircontrollers_1.default.createChapter);
router.get('/pir/getpirs', checkTokenExpiration_1.default, pircontrollers_1.default.retrievePirs);
router.get('/pir/getchaptersbyeditorid', checkTokenExpiration_1.default, pircontrollers_2.default.retrieveChaptersByEditorId);
router.patch('/pir/updatechapter', checkTokenExpiration_1.default, pircontrollers_2.default.updateChapter);
exports.default = router;
