import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

@injectable()
class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({ name, email }: IRequest): Promise<Customer> {
    // TODO
    const emailCheck = await this.customersRepository.findByEmail(email);

    if (emailCheck) {
      throw new AppError('E-mail already exists.');
    }

    const customer = await this.customersRepository.create({ name, email });
    return customer;
  }
}

export default CreateCustomerService;
