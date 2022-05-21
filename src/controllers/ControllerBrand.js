import { prismaClient } from "../database/prismaCliente.js";

export class BrandController {
  async createBrand(req, res) {
    try {
      const { name } = req.body;
      const brand = await prismaClient.brand.create({
        data: {
          name,
        },
      });
      return res.json(brand);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findBrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await prismaClient.brand.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!brand) {
        return res.json({ error: "Essa marca não existe!" });
      }
      return res.json(brand);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findAllBrands(req, res) {
    try {
      const brands = prismaClient.brand.findMany();
      return res.json(brands);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async updateBrand(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      let brand = await prismaClient.brand.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!brand) {
        return res.json({ error: "Esse brand não existe!" });
      }

      brand = await prismaClient.brand.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });
      return res.json(brand);
    } catch (err) {
      return res.json(err);
    }
  }

  async deletebrand(req, res) {
    try {
      const { id } = req.params;
      const brand = await prismaClient.brand.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!brand) {
        return res.json({ error: "Essa marca não existe!" });
      }

      await prismaClient.brand.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({ message: "Marca deletada!" });
    } catch (err) {
      return res.json(err);
    }
  }
}
