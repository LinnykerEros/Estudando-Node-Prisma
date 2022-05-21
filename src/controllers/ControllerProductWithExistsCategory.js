import { prismaClient } from "../database/prismaCliente.js";

export class CreateProductWithExistsCategory {
  async handle(req, res) {
    try {
      const { name, description, id_category } = req.body;
      const product = await prismaClient.productCategory.create({
        data: {
          product: {
            create: {
              name,
              description,
            },
          },
          category: {
            connect: {
              id: id_category,
            },
          },
        },
      });

      return res.json(product);
    } catch (err) {
      return res.json({ message: err });
    }
  }
}
