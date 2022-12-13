const vandium = require('vandium');
const mysql  = require('mysql');

exports.handler = vandium.generic()
  .handler( (event, context, callback) => {

    var connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
    });

    var sql = 'UPDATE FROM blueprints_areas_elements SET element_id = ' + event.element_id + ' WHERE element_id = ' + event.merge_id;
    connection.query(sql, function (error, results, fields) {

      var sql = 'UPDATE FROM elements_links SET element_id = ' + event.element_id + ' WHERE element_id = ' + event.merge_id;
      connection.query(sql, function (error, results, fields) {

        var sql = 'UPDATE FROM elements_tags SET element_id = ' + event.element_id + ' WHERE element_id = ' + event.merge_id;
        connection.query(sql, function (error, results, fields) {
  
          var sql = 'DELETE FROM elements WHERE ID = ' + event.merge_id;
          connection.query(sql, function (error, results, fields) {
    
          callback( null );
    
          });
  
        });

      });

    });
  connection.end();
});