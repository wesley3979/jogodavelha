class UserController {
    async createUser(req, res) {
        try {
            return res.status(200).json({
                status: "true",
                message: "Tudo certo.",
            });
        } catch (err) {
            return res.status(500).json({
                status: "false",
                message: "Erro ao criar usuário, tente novamente mais tarde.",
            });
        }
    }
}

module.exports = new UserController();
