import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    private ordersRepository: IOrdersRepository,
    private productsRepository: IProductsRepository,
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    // TODO
    const customerExists = await this.customersRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Could not find a valid customer');
    }

    const existentProducts = await this.productsRepository.findAllById(
      products,
    );

    if (!existentProducts.length) {
      throw new AppError('Could not find products');
    }

    const existentProductsIds = existentProducts.map(product => product.id);

    const checkInexisting = products.filter(
      product => !existentProductsIds.includes(product.id),
    );

    if (checkInexisting.length) {
      throw new AppError('Could not find products');
    }

    //qauntities insuficinete

    const findProductosNoQuantitiyAvailable = products.filter(
      product =>
        existentProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (findProductosNoQuantitiyAvailable.length) {
      throw new AppError('Quantity insuficient');
    }

    const serializeProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existentProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: serializeProducts,
    });

    const orderedQuantity = products.map(product => ({
      id: product.id,
      quantity:
        existentProducts.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(orderedQuantity);
    return order;
  }
}

export default CreateOrderService;
