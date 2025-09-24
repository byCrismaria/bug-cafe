const authService = require('../services/authService');

const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
        await authService.registerUser(name, email, password, confirmPassword);
        
        // Retorna mensagem de sucesso (RF49)
        res.status(201).json({ 
            status: "success", 
            message: "Cadastro realizado com sucesso. Bem-vindo(a)!" 
        });
    } catch (error) {
        let errorMessage;
        // Mapeia mensagens de erro para requisitos específicos (RF51, RF53)
        if (error.message.includes("e-mail já está cadastrado")) {
            errorMessage = "Este e-mail já está cadastrado.";
        } else if (error.message.includes("senhas não coincidem")) {
            errorMessage = "As senhas não coincidem.";
        } else {
            errorMessage = error.message;
        }

        res.status(400).json({ 
            status: "error", 
            message: errorMessage 
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "E-mail e senha são obrigatórios."
        });
    }

    try {
        const result = await authService.loginUser(email, password);

        // Retorna mensagem de sucesso (RF55)
        res.status(200).json({
            status: "success",
            message: "Login realizado com sucesso.",
            data: {
                userId: result.userId,
                name: result.name,
                token: result.token
            }
        });
    } catch (error) {
        // Retorna a mensagem de erro (RF57, RNF33)
        res.status(400).json({
            status: "error",
            message: "E-mail ou senha inválidos."
        });
    }
};

module.exports = {
    register,
    login
};