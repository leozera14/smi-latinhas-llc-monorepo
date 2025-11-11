import { FastifyRequest, FastifyReply } from "fastify";
import { DemandaService } from "../services/demanda.service";
import {
  createDemandaSchema,
  updateDemandaSchema,
} from "../schemas/demanda.schema";
import {
  DemandaErrorHandler,
  ValidationHelper,
} from "../utils/demanda-error-handler";

const demandaService = new DemandaService();

export class DemandaController {
  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = createDemandaSchema.parse(req.body);

      const demanda = await demandaService.create(data);

      return res.status(201).send(demanda);
    } catch (error) {
      return DemandaErrorHandler.handleError(error, res, "Demanda");
    }
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const demandas = await demandaService.findAll();

      return res.status(200).send(demandas);
    } catch (error) {
      return DemandaErrorHandler.handleError(error, res, "Demanda");
    }
  }

  async findById(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    try {
      const id = ValidationHelper.parseId(req.params.id, res);
      if (id === null) return;

      const demanda = await demandaService.findById(id);

      if (!demanda) {
        return res.status(404).send({ error: "Demanda not found" });
      }

      return res.status(200).send(demanda);
    } catch (error) {
      return DemandaErrorHandler.handleError(error, res, "Demanda");
    }
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    try {
      const id = ValidationHelper.parseId(req.params.id, res);
      if (id === null) return;

      const data = updateDemandaSchema.parse(req.body);
      const demanda = await demandaService.update(id, data);

      return res.status(200).send(demanda);
    } catch (error) {
      return DemandaErrorHandler.handleError(error, res, "Demanda");
    }
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    try {
      const id = ValidationHelper.parseId(req.params.id, res);
      if (id === null) return;

      await demandaService.delete(id);

      return res.status(204).send();
    } catch (error) {
      return DemandaErrorHandler.handleError(error, res, "Demanda");
    }
  }
}
