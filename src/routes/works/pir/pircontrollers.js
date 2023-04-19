"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
const Pir_1 = require("../../../models/Pir");
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const pirInstance = new Pir_1.Pir(null, null, null, null);
const createPir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let newPir = req.body.pir;
    newPir.pirId = yield uuidv1();
    newPir.chapters[0].chapterId = yield uuidv1(); // first chapter
    newPir.chapters[0].pirId = yield uuidv1();
    const token = req.body.token;
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield pirInstance.createPir(newPir).then(() => {
                res.status(200).send(newPir);
            }).catch((err) => {
                return res.status(409).send({ error: err.message });
            });
        }
        catch (err) {
            return res.status(409).send({ error: err.message });
        }
    })).catch((err) => {
        return res.status(401).send({ error: err.message });
    });
});
const retrievePirs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    pirInstance.retrievePirs().then((pirs) => {
        return res.status(200).send(pirs);
    });
});
const createChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chapter = req.body.chapter;
    chapter.chapterId = uuidv1();
    const token = req.body.token;
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            pirInstance.addChapterToPir(chapter).then(() => {
                res.status(200).send(chapter);
            }).catch((err) => {
                return res.status(409).send({ error: err.message });
            });
        }
        catch (err) {
            return res.status(409).send({ error: err.message });
        }
    })).catch((err) => {
        return res.status(401).send({ error: err.message });
    });
});
const retrieveChaptersByEditorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const editorId = req.query.editorId;
    const pirId = req.query.pirId;
    pirInstance.retrievePirs().then((pirs) => {
        const selectedPir = (Object.values(pirs.val()).filter((pir) => pir.pirId === pirId))[0];
        const chapters = Object.values(selectedPir.chapters).filter((chapter) => chapter.editorId === editorId);
        return res.status(200).send(chapters);
    });
});
const updateChapter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chapter = req.body.chapter;
    const token = req.body.token;
    console.log(chapter);
    yield admin.auth().verifyIdToken(token).then((response) => __awaiter(void 0, void 0, void 0, function* () {
        const db = admin.database();
        pirInstance.updateChapter(chapter).then((updatedChapter) => {
            return res.status(200).send(updatedChapter);
        });
    })).catch((err) => {
        console.log(err);
    });
});
exports.default = { createPir, createChapter, retrievePirs, retrieveChaptersByEditorId, updateChapter };
