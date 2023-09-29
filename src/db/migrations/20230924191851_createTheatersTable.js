//This is a migration file that is used to update databases. 
exports.up = function(knex) {

    //This function specify the Knex Method for making the disired database change.
    
    //The following code creates a table called theaters the consists of several columns

    return knex.schema.createTable("theaters", (table) => {
        table.increments("theater_id").primary(); //creates a column called theater_id that is the primary key for this table 
        table.string("name");
        table.string("address_line_1");
        table.string("address_line_2");
        table.string("city");
        table.string("state");
        table.string("zip");
        table.timestamps(true, true); 
    })
  
};

exports.down = function(knex) {
  //The following code drops the theaters table

  return knex.schema.dropTable("theaters"); 
};
