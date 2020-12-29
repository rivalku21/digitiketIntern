const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const employees = require('../models/employeeSchema');
const service = require('../services/service');
const response = require('../services/response');
const { set } = require('../app');
const app = require('../app');

var employeesRouter = express.Router();

employeesRouter.use(bodyParser.json());

employeesRouter.route('/')
.get(async (req, res, next) => {
    try {
        const man = await service.getMan();

        employees.find({})
        .then((employees) => {
            response.responseSuccess(res, employees);
        });
    } catch (err) {
        response.responseFailed(res, 500, err.message);
    }
})
.post((req, res, next) => {
    employees.create(req.body)
    .then((employee) => {
        console.log('Data submited', employee);
        response.responseSuccess(res, employee);
    });
})
.put((req, res, next) => {
    response.responseFailed(res, 403, "PUT Operation Not Support");
})
.delete((req, res, next) =>{
    response.responseFailed(res, 403, `Can't delete all data`);
});

employeesRouter.route('/:employeeId')
.get((req, res, next) => {
    employees.findById(req.params.employeeId)
    .then((employee) => {
        response.responseSuccess(res, employee);
    });
})
.post((req, res, next) => {
    response.responseFailed(res, 403, "POST Operation Not Support");
})
.put((req, res, next) =>{
    employees.findByIdAndUpdate(req.params.employeeId, { $set: req.body }, { new: true })
    .then((employee) => {
        console.log('Data update', employee);
        response.responseSuccess(res, employee);
    });
})
.delete((req, res, next) => {
    employees.findByIdAndRemove(req.params.employeeId)
    .then((resp) => {
        console.log('Data removed');
        response.responseSuccess(res, resp);
    });
});

module.exports = employeesRouter;