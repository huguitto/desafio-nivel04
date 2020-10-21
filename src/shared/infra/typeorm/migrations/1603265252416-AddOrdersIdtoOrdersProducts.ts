import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddOrdersIdtoOrdersProducts1603265252416
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products', //a table na qual vamos colocar a columna
      new TableColumn({
        name: 'order_id',
        type: 'uuid',
        isNullable: true, //o cliente pode excluir a conta dele
      }),
    );

    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'OrdersProductsOrder',
        columnNames: ['order_id'], //qual columna vai ter o relacionamento?

        referencedTableName: 'orders', //que tabela,
        referencedColumnNames: ['id'], // o que eu quero da tabale customers
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'OrdersProductsOrder');
    await queryRunner.dropColumn('orders_products', 'order_id');
  }
}
