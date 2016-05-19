<?php

$ingrediente =$_POST['ingrediente'];
$procedimiento=$_POST['procedimiento'];
$id= $_POST['numero'];

$conn=new mysqli("localhost","root","","foodworld");

$sql="UPDATE comida set  ingrediente='$ingrediente', procedimiento ='$procedimiento' WHERE numero='$id'";

if($conn->query($sql)===TRUE){
	header('Location:http://localhost/FoodsWorld');
	echo "exito";
}else{
	echo "error";
	// header('Location:http://localhost/FoodsWorld/#/nueva-receta');
}


?>