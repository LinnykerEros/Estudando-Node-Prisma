import { prismaClient } from "../database/prismaCliente.js";

export class IngredientController {
  async createIngredient(req, res) {
    try {
      const { name } = req.body;

      const ingredient = await prismaClient.ingredient.create({
        data: {
          name,
        },
      });
      return res.json(ingredient);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findIngredient(req, res) {
    try {
      const { id } = req.params;
      const ingredient = await prismaClient.ingredient.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!ingredient) {
        return res.json({ error: "Esse ingrediente não existe!" });
      }
      return res.json(ingredient);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findAllIngredients(req, res) {
    try {
      const ingredients = await prismaClient.ingredient.findMany();
      return res.json(ingredients);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async updateIngredient(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      let ingredient = await prismaClient.ingredient.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!ingredient) {
        return res.json({ error: "Esse Ingrediente não existe!" });
      }

      ingredient = await prismaClient.ingredient.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
        },
      });
      return res.json(ingredient);
    } catch (err) {
      return res.json(err);
    }
  }

  async deleteIngredient(req, res) {
    try {
      const { id } = req.params;
      const Ingredient = await prismaClient.ingredient.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!Ingredient) {
        return res.json({ error: "Esse Ingredient não existe!" });
      }

      await prismaClient.ingredient.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({ message: "Ingredient deletado!" });
    } catch (err) {
      return res.json(err);
    }
  }
}
