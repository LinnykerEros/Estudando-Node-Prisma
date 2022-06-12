import { prismaClient } from "../database/prismaCliente.js";
import bcryptjs from "bcryptjs";
export class UsersController {
  async createUser(req, res) {
    try {
      const { email, password } = req.body;

      let user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        return res.json({ error: "Usuário já cadastrado!" });
      }
      console.log(email, password);
      user = await prismaClient.user.create({
        data: {
          email,
          password_hash: await bcryptjs.hash(password, 8),
        },
      });
      return res.json(user);
    } catch (err) {
      console.log(err);
      return res.json({ message: `Errooo${err}` });
    }
  }

  async findUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return res.json({ error: "Esse usuário não existe!" });
      }

      return res.json(user);
    } catch (err) {
      return res.json(err);
    }
  }

  async findAllUsers(req, res) {
    try {
      const users = await prismaClient.user.findMany();
      return res.json(users);
    } catch (err) {
      return res.json(err);
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      let user = await prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        return res.json({ error: "Esse usuário não existe!" });
      }
      if (!email || !password) {
        return res.status(401).json({
          errors: ["Credencias inválidas!"],
        });
      }
      console.log(user.password_hash);
      user = await prismaClient.user.update({
        where: {
          id: Number(id),
        },
        data: {
          email,
          password_hash: await bcryptjs.hash(password, 8),
        },
      });
      return res.json(user);
    } catch (err) {
      return res.json({ message: `Erro: ${err}` });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prismaClient.user.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!user) {
        return res.json({ error: "Esse usuário não existe!" });
      }

      await prismaClient.user.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({ message: "Usuário deletado!" });
    } catch (err) {
      return res.json({ message: `ERRO:${err}` });
    }
  }
}
