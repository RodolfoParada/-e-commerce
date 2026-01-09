const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, role = 'user' } = req.body;

  res.status(201).json({
    id: 1,
    name,
    email,
    role
  });
});

module.exports = router;
