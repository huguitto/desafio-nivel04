import { Request, Response } from 'express';

import CreateProductService from '@modules/products/services/CreateProductService';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const { name, price, quantity } = request.body;

    const productsRepository = new ProductsRepository();
    const createProductService = new CreateProductService(productsRepository);

    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }
}
