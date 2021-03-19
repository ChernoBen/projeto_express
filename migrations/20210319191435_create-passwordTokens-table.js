

exports.up = function(knex,Promise) {
  return knex.apiusers.createTable('passwordToken',function(table){
      table.increments('id').primary();
      table.string('token',200).notNullable();
      table.integer('userid').unsigned().index().references('idusers').inTable('users');
  })
};

exports.down = function(knex) {
    return knex.apiusers.dropTable('passwordToken');
};
