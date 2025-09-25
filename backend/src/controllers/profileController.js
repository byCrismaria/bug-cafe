const profileService = require('../services/profileService');

const getProfile = async (req, res) => {
    // O userId é obtido com segurança do token JWT, graças ao middleware 'protect'
    const userId = req.user.userId;

    try {
        const userProfile = await profileService.getUserProfile(userId);
        res.status(200).json({
            status: "success",
            data: userProfile
        });
    } catch (error) {
        console.error("Erro no perfil:", error);
        res.status(404).json({
            status: "error",
            message: "Perfil do usuário não encontrado."
        });
    }
};

module.exports = {
    getProfile
};