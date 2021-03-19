
exports.up = function (knex) {
    return knex.apiusers.createTable('users', function(table) {
        table.increments('idusers').primary();
        table.string('name', 50).notNullable();;
        table.string('email', 50).notNullable();;
        table.string('password', 200).notNullable();
        table.integer('role').defaultTo(0);
    })

};

exports.down = function (knex) {
    return knex.apiusers.dropTable('users');
};
