const { body, param, validationResult } = require("express-validator");

// Validar dados para atualização do usuário
const updateUserValidator = [
  body("name").optional().isString().withMessage("Nome deve ser uma string"),
  body("email").optional().isEmail().withMessage("Email inválido"),
  body("role").optional().isString().withMessage("Cargo deve ser uma string"),
  body("avatarUrl")
    .optional()
    .isURL()
    .withMessage("Avatar deve ser uma URL válida"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validar o ID do usuário nas rotas que recebem ID
const validateUserId = [
  param("id").isMongoId().withMessage("ID inválido"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { updateUserValidator, validateUserId };
