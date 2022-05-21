import { prismaClient } from "../database/prismaCliente.js";

export class CreateProductIngredientController {
  async handle(req, res) {
    const { id_product, id_ingredient } = req.body;

    const productIngredient = await prismaClient.productIngredient.create({
      data: {
        id_product,
        id_ingredient,
      },
    });
    return res.json(productIngredient);
  }
}
