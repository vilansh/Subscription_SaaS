const express = require('express');
const router = express.Router();
const { queryPromise } = require('../config/database');

// Fake payment processing
router.post('/pay', async (req, res) => {
    const { amount, paymentMethod } = req.body;
    const paymentId = `pay_${Date.now()}`;
    const success = Math.random() > 0.2 ? 'success' : 'failed'; // 80% success rate

    try {
        // Insert into database
        await queryPromise(
            "INSERT INTO payments (id, amount, payment_method, status) VALUES (?, ?, ?, ?)",
            [paymentId, amount, paymentMethod, success]
        );

        res.json({ 
            success: success === 'success', 
            message: success === 'success' ? "Payment successful!" : "Payment failed!", 
            paymentId 
        });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// Get payment status
router.get('/payments/:id', async (req, res) => {
    try {
        const result = await queryPromise("SELECT * FROM payments WHERE id = ?", [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ error: "Payment not found" });
        }

        res.json(result[0]);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
