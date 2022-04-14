//connection to sql database
// $connection = mysql_connect('localhost', 'root', '');
// mysql_select_db('online_airport_system', $connection);
function listunions(){
    $query = "SELECT * FROM unions";
    $result = mysqli_query($query);
    return $result;
}

// mysql_close(); //Make sure to close out the database connection