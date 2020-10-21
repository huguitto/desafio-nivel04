import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TODO
    const { name, email } = request.body;
    const customersRepository = new CustomersRepository();
    const createCustomerService = new CreateCustomerService(
      customersRepository,
    );

    //crio o customer
    const customer = await createCustomerService.execute({ name, email });

    return response.json(customer);
  }
}
