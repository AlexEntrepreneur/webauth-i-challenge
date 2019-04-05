
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (tableColumn) => {
    tableColumn.increments();

    tableColumn
      .string('username')
      .unique('uq_username')
      .notNullable();

    tableColumn
      .string('password')
      .notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
