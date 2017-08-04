function getMysqlData() {
  var HOST = "jdbc:mysql://integ-elk.crelgvfd3i9x.eu-central-1.rds.amazonaws.com";
  var PORT = "3306";
  var USER = "elk";
  var PWD = "Staples12!";
  
  var CONNECTIONSTRING = HOST + "/" + USER;

  var conn = Jdbc.getConnection(CONNECTIONSTRING, USER, PWD);
  /*
  conn.createStatement().execute('CREATE TABLE test '
                                 + '(testfield VARCHAR(255), '
                                 + 'id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id));');
  */
}

