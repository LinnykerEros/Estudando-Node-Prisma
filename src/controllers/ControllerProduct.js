import { prismaClient } from "../database/prismaCliente.js";

export class ProductController {
  async createProduct(req, res) {
    try {
      const { name, description } = req.body;
      const product = await prismaClient.product.create({
        data: {
          name,
          description,
        },
      });

      return res.json(product);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await prismaClient.product.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!product) {
        return res.json({ error: "Esse produto não existe!" });
      }
      return res.json(product);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findAllProduct(req, res) {
    try {
      const products = await prismaClient.product.findMany();
      return res.json(products);
    } catch (err) {
      return res.json(err);
    }
  }

  async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      let product = await prismaClient.product.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!product) {
        return res.json({ error: "Esse produto não existe!" });
      }

      product = await prismaClient.product.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          description,
        },
      });
      return res.json(product);
    } catch (err) {
      return res.json(err);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await prismaClient.product.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!product) {
        return res.json({ error: "Esse usuário não existe!" });
      }

      await prismaClient.product.delete({
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
