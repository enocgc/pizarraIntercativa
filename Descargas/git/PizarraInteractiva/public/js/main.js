var socket=io.connect("http://192.168.43.178:8080",{'forceNew':true});
// var socket=io.connect("http://172.20.20.10:8080",{'forceNew':true});
//var socket=io.connect("http://192.168.1.62:8080",{'forceNew':true});
var validar=[];
var color="";
var userTemp="";
var activo=false;
var numeroUsuarios=0;

socket.on('getUsuarios',function(data){
  validar=data;
  numeroUsuarios++
  actualizarUsuarios(data);
  console.log(data);

});


function ingresarChat(){
  color=verificarColor();
  var usuario={
    name:document.getElementById('usuario').value,
    color:color
  }
  if (verificarUsuario(usuario)) {
    userTemp=document.getElementById('usuario').value;
    socket.emit('new-usuario',usuario);
    init();
  }else{
    alert("el usuario ya existe");
  }

}//FIN DE INGRESAR CHAT

function actualizarUsuarios(data){
  var cantidad=validar.length-1;
  $("#numeroUsuarios").html("<span># USUARIOS: "+cantidad+"</span>");
  console.log(validar.length);
  var html=data.map(function(elem,index){
    return '<li style="color:'+elem.color+';" >'+elem.name+'<spanc id="icon" style="width: 20px;height: 20px; border-color:'+ color +'; " ></span></li>';
  }).join(" ");
  document.getElementById('listaUsuarios').innerHTML=html;
}

function getColor(){
  hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
  color = "#";
  for (var i=0;i<6;i++){

    posarray = parseInt(Math.random() * hexadecimal.length);
    color += hexadecimal[posarray];
  }
  return color;

}


function verificarUsuario(usuario){
  boolean=true;
  for (var i = 0; i < validar.length; i++) {
    if (validar[i].name==usuario.name) {
      boolean = false;
    }
  }
  return boolean;
}//verificar usuario
function deslizar(){
  $('#deslisar').toggle("swing");

};
function verificarColor(){
  getColor();

  for (var i = 0; i < validar.length; i++) {
    if (validar[i].color==color) {
      color=getColor();
      i=0;
    }
  }

  return color;
}

/* -----------------------------------------------------------------------------
FUNCIONES DE MODAL
----------------------------------------------------------------------------- */
function hide(){
  $("div.modal-box").hide(1000);
  function demo(){
    $("#demo01").animatedModal({
      modalTarget: 'modal-01',
      animatedIn:'fadeInLeft',
      animatedOut:'slideOutLeft',
      color: 'teal'
    });
  }}
  function stopZoomIn(){
    $("input").removeClass("zoomIn");
  }
