import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddCustomerIdToOrders1603264605988
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders', //a table na qual vamos colocar a columna
      new TableColumn({
        name: 'customer_id',
        type: 'uuid',
        isNullable: true, //o cliente pode excluir a conta dele
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'OrdersCustomer',
        columnNames: ['customer_id'], //qual columna vai ter o relacionamento?

        referencedTableName: 'customers', //que tabela,
        referencedColumnNames: ['id'], // o que eu quero da tabale customers
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
    await queryRunner.dropColumn('orders', 'customer_id');
  }
}
