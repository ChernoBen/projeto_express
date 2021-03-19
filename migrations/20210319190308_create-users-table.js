
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
        table.increments('idusers').primary();
        table.string('name', 50).notNullable();;
        table.string('email', 50).notNullable();;
        table.string('password', 200).notNullable();
        table.integer('role').notNullable();
    })

};

exports.down = function (knex, Promiese) {
    return knex.schema.dropTable('users');
};
