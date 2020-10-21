import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';
import { runInThisContext } from 'vm';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    // TODO
    const product = await this.ormRepository.create({ name, price, quantity });
    await this.ormRepository.save(product);
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    // TODO
    const productNamed = await this.ormRepository.findOne({
      where: { name },
    });

    return productNamed;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    // TODO
    const productsIds = products.map(item => item.id); //pegop um array entero e fico so com os ids

    const productsFound = await this.ormRepository.findByIds(productsIds);

    return productsFound;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    // TODO
    return this.ormRepository.save(products);
  }
}

export default ProductsRepository;
