const express = require('express');
const router = express.Router();

const lateFees = {
    student: 5,
    faculty: 10,
    other: 15
};

router.get('/', (req, res) => {
    res.render('late_fee', { lateFee: null });
});

router.post('/calculate', (req, res) => {
    const { userType, daysLate } = req.body;

    const feePerDay = lateFees[userType];
    const lateFee = daysLate * feePerDay;

    res.render('late_fee', { lateFee });
});

module.exports = router;
