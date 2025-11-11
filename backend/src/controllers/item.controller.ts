import { BaseController } from "./base.controller";
import { ItemService } from "../services/item.service";
import { createItemSchema, updateItemSchema } from "../schemas/item.schema";

const itemService = new ItemService();

export class ItemController extends BaseController<any> {
  constructor() {
    super(itemService, createItemSchema, updateItemSchema, "Item");
  }
}
