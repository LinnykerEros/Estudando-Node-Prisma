import { prismaClient } from "../../database/prismaCliente.js";

export class FindUserAndProductCategory {
  async handle(req, res) {
    const { email } = req.body;
    const user = await prismaClient.user.findMany({
      where: {
        email,
      },
      select: {
        email: true,
        productCategory: {
          select: {
            ProductCategory: true,
          },
        },
      },
    });
    return res.json(user);
  }
}
