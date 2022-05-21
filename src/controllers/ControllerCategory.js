import { prismaClient } from "../database/prismaCliente.js";

export class CategoryController {
  async createCategory(req, res) {
    const { name } = req.body;
    const category = await prismaClient.category.create({
      data: {
        name,
      },
    });

    return res.json(category);
  }

  async findCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await prismaClient.category.findUnique({
        where: {
          id,
        },
        include: {
          ProductCategory: true,
        },
      });
      if (!category) {
        return res.json({ error: "Essa categoria não existe!" });
      }
      return res.json(category);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findAllCategorys(req, res) {
    try {
      const category = await prismaClient.category.findMany();
      return res.json(category);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async updateCategory(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      let category = await prismaClient.category.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!category) {
        return res.json({ error: "Essa categoria não existe!" });
      }

      category = await prismaClient.category.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });
      return res.json(category);
    } catch (err) {
      return res.json(err);
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;
      const category = await prismaClient.category.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!category) {
        return res.json({ error: "Essa categoria não existe!" });
      }

      await prismaClient.category.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({ message: "Produto deletado!" });
    } catch (err) {
      return res.json(err);
    }
  }
}
