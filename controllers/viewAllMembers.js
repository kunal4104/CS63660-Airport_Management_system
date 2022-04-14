//connection to sql database
// $connection = mysql_connect('localhost', 'root', '');
// mysql_select_db('online_airport_system', $connection);
function viewallmembersfromunion(){
    $query = "SELECT * FROM employee"; //You don't need a ; like you do in SQL
$result = mysql_query($query);

while($row = mysql_fetch_array($result)){   //Creates a loop to loop through results
echo "<tr><td>" . htmlspecialchars($row['name']) . "</td><td>" . htmlspecialchars($row['age']) . "</td></tr>";  //$row['index'] the index here is a field name
}


// mysql_close(); //Make sure to close out the database connection