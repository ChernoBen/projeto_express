

exports.up = function(knex,Promise) {
  return knex.schema.createTable('passwordToken',function(table){
      table.increments('id').primary();
      table.string('token',200).notNullable();
      table.integer('userid').unsigned().index().references('idusers').inTable('users').notNullable();;
  })
};

exports.down = function(knex,Promise) {
    return knex.schema.dropTable('passwordToken');
};
