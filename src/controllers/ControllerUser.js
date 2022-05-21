import { prismaClient } from "../database/prismaCliente.js";

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
          password,
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
      // console.log("USER ID", req.userId);
      // console.log("USER Email", req.userEmail);
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

      user = await prismaClient.user.update({
        where: {
          id: Number(id),
        },
        data: {
          email,
          password,
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
