import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddProductIdtoOrdersProducts1603266036273
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products', //a table na qual vamos colocar a columna
      new TableColumn({
        name: 'product_id',
        type: 'uuid',
        isNullable: true, //o cliente pode excluir a conta dele
      }),
    );

    await queryRunner.createForeignKey(
      'orders_products',
      new TableForeignKey({
        name: 'ProductProductsOrder',
        columnNames: ['product_id'], //qual columna vai ter o relacionamento?

        referencedTableName: 'products', //que tabela,
        referencedColumnNames: ['id'], // o que eu quero da tabale customers
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_products', 'ProductProductsOrder');
    await queryRunner.dropColumn('orders_products', 'product_id');
  }
}
