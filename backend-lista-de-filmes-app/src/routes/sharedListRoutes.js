const express = require('express');
const router = express.Router();
const sharedListController = require('../controllers/sharedListController');
const extractUserId = require('../middlewares/authMiddlewere');

// Rotas protegidas com extractUserId middleware
// Rota para criar uma lista compartilhada /shared-lists
router.post('/create-link', extractUserId, sharedListController.createSharedList);

// Rota para atualizar o status de compartilhamento
router.patch('/toggle-share-status', extractUserId, sharedListController.toggleShareStatus);

// Rota pública
// Rota para obter uma lista compartilhada
router.get('/:shareToken', sharedListController.getSharedList);

module.exports = router;