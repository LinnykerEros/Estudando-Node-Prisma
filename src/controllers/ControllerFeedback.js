import { prismaClient } from "../database/prismaCliente.js";

export class FeedbackController {
  async createFeedback(req, res) {
    try {
      const { contents, id_product, id_user } = req.body;
      const feedback = await prismaClient.feedback.create({
        data: {
          id_product,
          id_user,
          contents,
        },
        include: {
          user: true,
        },
      });
      return res.json(feedback);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findFeedback(req, res) {
    try {
      const { id } = req.params;
      const feedback = await prismaClient.feedback.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!feedback) {
        return res.json({ error: "Esse produto não existe!" });
      }
      return res.json(feedback);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async findAllFeedbacks(req, res) {
    try {
      const feedbacks = await prismaClient.feedback.findMany();
      return res.json(feedbacks);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  async updateFeedback(req, res) {
    try {
      const { id } = req.params;
      const { contents, id_product, id_user } = req.body;

      let feedback = await prismaClient.feedback.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!feedback) {
        return res.json({ error: "Esse produto não existe!" });
      }

      feedback = await prismaClient.feedback.update({
        where: {
          id: Number(id),
        },
        data: {
          id_product,
          id_user,
          contents,
        },
      });
      return res.json(feedback);
    } catch (err) {
      return res.json(err);
    }
  }

  async deleteFeedback(req, res) {
    try {
      const { id } = req.params;
      const feedback = await prismaClient.feedback.findUnique({
        where: {
          id: Number(id),
        },
      });
      if (!feedback) {
        return res.json({ error: "Esse feedback não existe!" });
      }

      await prismaClient.feedback.delete({
        where: {
          id: Number(id),
        },
      });
      return res.json({ message: "Feedback deletado!" });
    } catch (err) {
      return res.json(err);
    }
  }
}
