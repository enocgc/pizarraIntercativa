<?php 
$receta= $_POST['receta'];
$ingrediente =$_POST['ingrediente'];
$procedimiento=$_POST['procedimiento'];
$pais=$_POST['lugar'];

$conn=new mysqli("localhost","root","","foodworld");

$sql="INSERT INTO comida (receta,ingrediente,procedimiento,pais) VALUES ('$receta','$ingrediente'
,'$procedimiento','$pais')";

if($conn->query($sql)===TRUE){
	header('Location:http://localhost/FoodsWorld');
}else{
	header('Location:http://localhost/FoodsWorld');
}

$conn->close();
echo "You informacion has been successfully added to eh dadta base";

?>