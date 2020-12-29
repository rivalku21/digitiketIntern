const employees = require('../models/employeeSchema');

const getMan = () => {
    employees.find({ gender: 'laki laki' }).exec(function(err, employees) {
        if (err) throw err;
        var num_employees = employees.length;
        console.log("laki laki: ", num_employees);
    });
    employees.find({ gender: 'perempuan' }).exec(function(err, employees) {
        if (err) throw err;
        var num_employees = employees.length;
        console.log("perempuan: ", num_employees);
    });
}

module.exports = { getMan };