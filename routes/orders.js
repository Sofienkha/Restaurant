const express = require('express');
const router = express.Router();
const pool = require('../index');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - table_id
 *               - items
 *             properties:
 *               table_id:
 *                 type: integer
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menu_item_id:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Order created successfully
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const { table_id, items } = req.body;
    
    // Start transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      // Create order
      const orderResult = await client.query(
        'INSERT INTO orders (table_id, status) VALUES ($1, $2) RETURNING id',
        [table_id, 'pending']
      );
      
      const orderId = orderResult.rows[0].id;
      
      // Add order items
      for (let item of items) {
        await client.query(
          'INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)',
          [orderId, item.menu_item_id, item.quantity]
        );
      }
      
      await client.query('COMMIT');
      res.json({ message: 'Order created successfully', order_id: orderId });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/orders/{id}/status:
 *   get:
 *     summary: Get order status
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   enum: [pending, preparing, ready, served, cancelled]
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */
router.get('/:id/status', async (req, res) => {
  try {
    const result = await pool.query('SELECT status FROM orders WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ status: result.rows[0].status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;