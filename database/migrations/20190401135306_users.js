
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (tableColumn) => {
    tableColumn.increments();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
