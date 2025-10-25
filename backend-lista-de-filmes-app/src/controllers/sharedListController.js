const sharedListModel = require('../models/sharedListModel');
const favoriteMovieModel = require('../models/favoriteMovieModel');

async function createSharedList(req, res) {
    const userId = req.userId;
    const { listName } = req.body;

    if (!listName) {
        return res.status(400).json({ error: 'O nome da lista é obrigatório.' });
    }

    try {
        let sharedList = await sharedListModel.findOne({ userId });

        if (sharedList) {
            if (listName) {
                sharedList.listName = listName;
                await sharedList.save();
            }

            return res.json({
                shareToken: sharedList.shareToken,
                isActive: sharedList.isActive,
                listName: sharedList.listName
            });

        }

        sharedList = new sharedListModel({
            userId,
            listName: listName || 'Minha Lista Compartilhada'
        });

        await sharedList.save();

        res.status(201).json({
            shareToken: sharedList.shareToken,
            isActive: sharedList.isActive,
            listName: sharedList.listName
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Erro ao criar link de compartilhamento" });
    }
}

async function toggleShareStatus(req, res) {
    const userId = req.userId;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
        return res.status(400).json({ error: 'O campo isActive é obrigatório e deve ser booleano.' });
    }

    try {
        const sharedList = await sharedListModel.findOne({ userId });

        if (!sharedList) {
            return res.status(404).json({ error: 'Lista compartilhada não encontrada.' });
        }

        sharedList.isActive = isActive;
        await sharedList.save();

        res.json({
            message: `Compartilhamento ${isActive ? 'ativado' : 'desativado'}.`,
            isActive: sharedList.isActive
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Erro ao atualizar status de compartilhamento" });
    }
}

async function getSharedList(req, res) {
    const { shareToken } = req.params;

    try {
        const sharedList = await sharedListModel.findOne({ shareToken });

        if (!sharedList) {
            return res.status(404).json({ error: 'Lista compartilhada não encontrada.' });
        }

        if (!sharedList.isActive) {
            return res.status(403).json({ error: 'Esta lista não está mais pública' });
        }

        const favoriteMovies = await favoriteMovieModel
            .find({ userId: sharedList.userId })
            .sort({ addDate: -1 });

        res.json({ listName: sharedList.listName, movies: favoriteMovies });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Erro ao buscar informações da lista compartilhada" });
    }
}

module.exports = {
    createSharedList,
    toggleShareStatus,
    getSharedList
};