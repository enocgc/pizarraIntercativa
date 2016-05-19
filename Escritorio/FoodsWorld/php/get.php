<?php
  //$data =json_decode(file_get_contents("php://input"));
 
//echo "se llamo al php";
$conn=new mysqli("localhost","root","","foodWorld");


// $array=array();
if ($conn->ping()) {
   
	$sql="SELECT * FROM comida";
$result = $conn->query($sql);
$array[]=array();
while($row = $result->fetch_assoc()){
	 $array[]=array(
	'receta'=> $row['receta'],
	'ingrediente'=>$row['ingrediente'],
	'procedimiento'=>$row['procedimiento'],
	'pais'=>$row['pais'],
	'numero'=>$row['numero']
	);
}//fin del while
echo json_encode($array);

   
} 


// else {
//     printf ("Error: %s\n", $conn->error);
// }
// if ($conn->connect_errno) {
//     printf("Conexión fallida: %s\n", $conn->connect_error);
//     exit();
// }

?>