import { BaseController } from "./base.controller";
import { DemandaService } from "../services/demanda.service";
import {
  createDemandaSchema,
  updateDemandaSchema,
} from "../schemas/demanda.schema";

const demandaService = new DemandaService();

export class DemandaController extends BaseController<any> {
  constructor() {
    super(demandaService, createDemandaSchema, updateDemandaSchema, "Demanda");
  }
}
