"use strict";
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
class App {
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });
        this.app.use('/', router);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().app;
