
// app=angular.module('appAngular',[]).controller('controlAngular',function($scope){
//     console.log("inicio");
// $scope.comidas=[];

//     $.ajax({
//     // la URL para la petición
//     url : 'php/get.php',
//     // data : { id : 123 },
//         type : 'GET',
//        dataType : 'json',

//     success : function(json) {
//         var datos=[]
//         datos=json;
//         $scope.comidas=datos;
//         alert(datos.length);

//     },
//     error : function(xhr, status) {
//         alert('Disculpe, existió un problema '+ xhr+" status " +status);
//     },
//     complete : function(xhr, status) {
//         console.log('Petición realizada');
//     }
// });


// });//app angular



$(document).ready(function(){


function getComidas(){

    $.ajax({
    // la URL para la petición
    url : 'php/get.php',
    // data : { id : 123 },
        type : 'GET',
       dataType : 'json',

    success : function(json) {
        var datos=[]
        datos=json;
agregaraLi(datos);
    },
    error : function(xhr, status) {
        alert('Disculpe, existió un problema '+ xhr+" status " +status);
    },
    complete : function(xhr, status) {
        console.log('Petición realizada');
    }
});

}//fin de get comidas

 getComidas();
});



function agregaraLi(datos){

for(var i=1;i<datos.length;i++){

$("#ulRecetas").append('<li> <table class="collapsible-header"> <tr>  <td><i class="material-icons">label_outline</i>'+datos[i].numero+'</td>'+
  '<td><i class="material-icons">assignment</i>'+datos[i].receta+'</td>'+
                 ' <td><i class="material-icons">my_location</i>'+datos[i].pais+'</td> </tr></table>'+
                '<div class="collapsible-body">'+
                  '<table class="contenedorTabla">'+
                  
                     '<form id="upda" method="POST" action="php/update.php">'+
                     '<input name="numero" style="display: none;" value="5" />'+
                    '<th>ingredientes </th>'+
                    '<th>pasos </th>'+
                    '<tr>'+  
                   
                      '<td class="tdEditable"> <textarea name="ingrediente" class="contenidoEditable">'+datos[i].ingrediente+'</textarea>  </td>'+
                      '<td class="tdEditable"> <textarea name="procedimiento"class="contenidoEditable">'+datos[i].procedimiento+'</textarea> </td>'+
                    '</tr>'+
                    '<tr>'+
                      '<td><input type="sutmit" value="actualizar" class="btn"></td>'+
                      
                    '</tr>'+
                    '</form>'+
                  '</table>'+
                '</div>'+

              '</li>');

}
}



