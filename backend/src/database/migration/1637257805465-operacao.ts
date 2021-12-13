const { MigrationInterface, QueryRunner, Table } = require("typeorm");

module.exports = class operacao1637257805465{
 async up(queryRunner){
    await queryRunner.createTable(
      new Table({
        name: "operacao",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "numOp",
            type: "varchar",
          },
          {
            name: "cliente",
            type: "varchar",
          },
          {
            name: "dataEntrada",
            type: "data",
          },
          {
            name: "dataSaida",
            type: "data",
          },

          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  async down(queryRunner) {
    await queryRunner.dropTable("operacao")
  }
}
