<?php

$usuario=$_POST['usuario'];
$contrasena=$_POST['contrasena'];

echo "se llamo al php";

echo $usuario;
echo $contrasena;

$conn=new mysqli("localhost","root","","foodWorld");

$sql="SELECT usuario,contrasena FROM usuario WHERE usuario='$usuario' AND contrasena='$contrasena'";



$result = $conn->query($sql);
$numero_filas = mysqli_num_rows($result);
if($numero_filas>0){
	$conn->close();
	header('Location:http://localhost/FoodsWorld/#/index-admin');
}
else{
	$conn->close();
header('Location:http://localhost/FoodsWorld/#/login');
}




?>