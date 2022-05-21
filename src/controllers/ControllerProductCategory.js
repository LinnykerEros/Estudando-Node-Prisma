import { prismaClient } from "../database/prismaCliente.js";

export class CreateProductCategoryController {
  async handle(req, res) {
    const { id_product, id_category } = req.body;

    const productCategory = await prismaClient.productCategory.create({
      data: {
        id_product,
        id_category,
      },
    });
    return res.json(productCategory);
  }
}
