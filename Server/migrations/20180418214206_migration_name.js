
exports.up = function(knex, Promise) {

    knex.schema.createTable('stops', (table) => {
        table.increments('id')
        table.string('name')
        table.integer('distance')
        table.integer('lat')
        table.integer('lon')
      })
     
};

exports.down = function(knex, Promise) {
  
};
