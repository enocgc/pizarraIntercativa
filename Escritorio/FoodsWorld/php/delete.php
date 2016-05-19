<?php
$id= $_POST['numero2'];

$conn=new mysqli("localhost","root","","foodworld");

$sql="DELETE FROM comida WHERE numero='$id'";

if($conn->query($sql)===TRUE){
	header('Location:http://localhost/FoodsWorld/');
	echo "eliminado existoso";
}else{
	echo "error";
	// header('Location:http://localhost/FoodsWorld/#/nueva-receta');
}



?>