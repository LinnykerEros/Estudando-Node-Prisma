import { prismaClient } from "../../database/prismaCliente.js";

export class FindProductIngredientController {
  async handle(req, res) {
    const { id_product, id_ingredient } = req.body;
    const productIngredient = prismaClient.productIngredient.findMany({
      where: {
        id_product,
        id_ingredient,
      },
    });
    return res.json(productIngredient);
  }
}
