import { prismaClient } from "../../database/prismaCliente.js";
import jwt from "jsonwebtoken";
export class TokenController {
  async handle(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: ["Credencias inválidas!"],
      });
    }
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      return res.json({ error: "Esse usuário não existe!" });
    }
    if (user.password !== password) {
      return res.json({ error: "Senha inválida!" });
    }
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}
