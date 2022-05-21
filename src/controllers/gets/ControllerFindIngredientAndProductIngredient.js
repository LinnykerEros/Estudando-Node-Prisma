import { prismaClient } from "../../database/prismaCliente.js";

export class FindIngredientAndProductIngredientController {
  async handle(req, res) {
    const { id } = req.body;

    const ingredient = await prismaClient.ingredient.findFirst({
      where: {
        id,
      },
      include: {
        ProductIngredient: true,
      },
    });
    return res.json(ingredient);
  }
}
