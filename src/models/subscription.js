const { pool, queryPromise } = require('../config/database');

// Create a new subscription
async function createSubscription(userId, plan, stripeSubscriptionId, endDate) {
    const SQL = 'INSERT INTO subscriptions (user_id, plan, stripe_subscription_id, end_date) VALUES (?, ?, ?, ?)';
    const result = await queryPromise(SQL, [userId, plan, stripeSubscriptionId, endDate]);
    return result.insertId;
}

// Get active subscription of a user
async function getActiveSubscription(userId) {
    const SQL = 'SELECT * FROM subscriptions WHERE user_id = ? AND status = "active" LIMIT 1';
    const result = await queryPromise(SQL, [userId]);
    return result[0];
}

// Cancel a subscription
async function cancelSubscription(subscriptionId) {
    const SQL = 'UPDATE subscriptions SET status = "canceled" WHERE id = ?';
    const result = await queryPromise(SQL, [subscriptionId]);
    return result.affectedRows;
}

module.exports = { createSubscription, getActiveSubscription, cancelSubscription };