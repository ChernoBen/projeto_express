
exports.up = function (knex, Promise) {
    return knex.apiusers.createTable('users', (table) => {
        table.increments('idusers').primary();
        table.string('name', 50).notNullable();;
        table.string('email', 50).notNullable();;
        table.string('password', 200).notNullable();
        table.integer('role').defaultTo(0);
    })

};

exports.down = function (knex,Promise) {
    return knex.apiusers.dropTable('users');
};
