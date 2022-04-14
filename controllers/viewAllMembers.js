//connection to sql database
// $connection = mysql_connect('localhost', 'root', '');
// mysql_select_db('online_airport_system', $connection);
function viewallmembersfromunion(){
    $query = "SELECT * FROM union_member";
    $result = mysqli_query($query);
    return $result;
}

// mysql_close(); //Make sure to close out the database connection