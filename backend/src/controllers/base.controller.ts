import { FastifyRequest, FastifyReply } from "fastify";
import { ZodSchema } from "zod";
import { ErrorHandler, ValidationHelper } from "../utils/error-handler";
import { RequestWithId } from "../types/fastify.types";

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

interface BaseService<T> {
  create(data: any): Promise<T>;
  findAll(params?: PaginationParams): Promise<PaginatedResponse<T>>;
  findById(id: number): Promise<T | null>;
  update(id: number, data: any): Promise<T>;
  delete(id: number): Promise<T>;
}

export class BaseController<T> {
  constructor(
    private service: BaseService<T>,
    private createSchema: ZodSchema,
    private updateSchema: ZodSchema,
    private resourceName: string
  ) {}

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const data = this.createSchema.parse(req.body);

      const resource = await this.service.create(data);

      return res.status(201).send(resource);
    } catch (error) {
      return ErrorHandler.handleError(error, res, this.resourceName);
    }
  }

  async findAll(req: FastifyRequest, res: FastifyReply) {
    try {
      const query = req.query as { page?: string; pageSize?: string };

      const page = query.page ? parseInt(query.page) : 1;
      const pageSize = query.pageSize ? parseInt(query.pageSize) : 20;

      if (page < 1) {
        return res.status(400).send({ error: "Page must be greater than 0" });
      }

      if (pageSize < 1 || pageSize > 100) {
        return res
          .status(400)
          .send({ error: "Page size must be between 1 and 100" });
      }

      const result = await this.service.findAll({ page, pageSize });

      return res.status(200).send(result);
    } catch (error) {
      return ErrorHandler.handleError(error, res, this.resourceName);
    }
  }

  async findById(req: RequestWithId, res: FastifyReply) {
    try {
      const id = ValidationHelper.parseId(req.params.id, res);
      if (id === null) return;

      const resource = await this.service.findById(id);

      if (!resource) {
        return res
          .status(404)
          .send({ error: `${this.resourceName} not found` });
      }

      return res.status(200).send(resource);
    } catch (error) {
      return ErrorHandler.handleError(error, res, this.resourceName);
    }
  }

  async update(req: RequestWithId, res: FastifyReply) {
    try {
      const id = ValidationHelper.parseId(req.params.id, res);
      if (id === null) return;

      const data = this.updateSchema.parse(req.body);
      const resource = await this.service.update(id, data);

      return res.status(200).send(resource);
    } catch (error) {
      return ErrorHandler.handleError(error, res, this.resourceName);
    }
  }

  async delete(req: RequestWithId, res: FastifyReply) {
    try {
      const id = ValidationHelper.parseId(req.params.id, res);
      if (id === null) return;

      await this.service.delete(id);

      return res.status(204).send();
    } catch (error) {
      return ErrorHandler.handleError(error, res, this.resourceName);
    }
  }
}
