
var canvas=null,
pincel=null,
pintar=false,
pincelExterno=null,
ultimo={usuario:userTemp,ux:0,uy:0},
colorTemp=color,
escribiendo=false
textX=0,textY=0;



function getCanvas(){
  var largo;
  var ancho;
  var cuerpo=document.getElementById("cuerpo");
  var canvas = document.createElement("canvas");

  ancho= window.innerWidth-150;
  largo=window.innerHeight;
  canvas.id = "lienzo";
  canvas.width= ancho;
  canvas.height=largo;

  cuerpo.appendChild(canvas);
  $("#herramientas").css('display','initial');
  $("#login").css('display','none');
}




$(document).ready(function(){

  $("#borrar").click(function(){
    $("#lienzo").css("cursor","url('imgs/b2.png'), pointer");
    colorTemp="#fff";
    escribiendo=false;
    $('.texto').css('display','none');
  });


  $("#pintar").click(function(){
    $("#lienzo").css("cursor","url('imgs/P3.png'), pointer");
    colorTemp=color;
    escribiendo=false;

    $('.texto').css('display','none');
  });

  $("#escribir").click(function(){
    $("#lienzo").css("cursor"," text");
    escribiendo=true;

  });//escribir

});

var escribirText=function(event){
  if(event.keyCode==13){
    if(escribiendo){
      if($("#texto").val().length >0){
        data={texto:$("#texto").val(),x:textX-5,y:textY+20,color:color};
        socket.emit('pintarTexto',data);
        $('.texto').css('display','none');
      }//.length
    }

  }
}//escribirText


function agregarEventos(){

  canvas.addEventListener('mousemove', onMouseMove, false);
  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);

  window.addEventListener('keydown',escribirText, false);
}



function init(){
  getCanvas();
  console.log("start init");
  canvas=document.getElementById('lienzo');
  pincel= canvas.getContext('2d');
  pincelExterno= canvas.getContext('2d');
  agregarEventos();
  colorTemp=color;
  activo=true;

};//init

var onMouseMove=function(e){
  if(!escribiendo){
    ultimo.ux=e.clientX-150;
    ultimo.uy=e.clientY+38;
    actualizarXY(ultimo);
    truePaint(e);
  }
}

function actualizarXY(data){socket.emit('xyUpdate',data);}


function truePaint(e){
  if(pintar){
    data={x:e.clientX-150,y:e.clientY+38,color:colorTemp,action:"down",id:userTemp};
    setPossition(data);
  }
  // pincelExterno.closePath;
}//fin de true pain

function actUXY(e){
  data={usuario:userTemp,x:e.clientX-150,y:e.clientY+38};
  socket.emit('actUXY',data);
}//ACTUXY

var onMouseDown=function(e){
  if(escribiendo){
    textX=e.clientX-165;
    textY=e.clientY-8;
    $('#texto').val("");
    $('.texto').css('display','initial');
    $('.texto').css('margin-left',textX+"px");
    $('.texto').css('margin-top',textY+"px");

  }
  else{
    actUXY(e);
    pintar=true;
  }
};

var onMouseUp= function (e){
  if(!escribiendo){
    data={x:e.clientX-150,y:e.clientY+38,color:color,action:"up",id:userTemp};
    setPossition(data);
    pincelExterno.closePath;
    pintar=false;}

    // pincel.closePath();

  };

  socket.on('pintarTexto',function(data){
    paintText(data);

  });

  function paintText(data){

    pincel.font="20pt Verdana";
    pincel.lineWidth=data.color;
    pincel.strokeStyle=data.color;
    pincel.fillStyle=data.color;
    pincel.fillText(data.texto,data.x,data.y);

  }//fin de pain

  function pintarLinea(data){


    pincelExterno.beginPath();
    pincelExterno.lineJoin = "round";
    pincelExterno.lineCap = "round";
    pincelExterno.lineWidth = 15;
    pincelExterno.moveTo(data.ux,data.uy);
    pincelExterno.strokeStyle = data.color;
    pincelExterno.lineTo(data.x, data.y);
    pincelExterno.stroke();
    pincelExterno.closePath;

    //


  }// fin de pintarlinea

  function setPossition(data){

    socket.emit("draw",data);

  }

  socket.on('draw',function(data){
    if(activo){
      pintarLinea(data);
    }

  });

  socket.on('emitToast',function(nombre){

    if(activo){
      $.toast({
        heading:'Conexion',
        text:nombre+ " Se ha conectado a la pizarra colaborativa",
        showHideTransition:'slide',
        icon:'success'
      });
    }
  });

  socket.on('emitToastSalir',function(nombre){
    if(activo){
      $.toast({
        heading:'Desconexion',
        text: nombre+ " Se ha desconectado de la pizarra colaborativa",
        showHideTransition:'plain',
        icon:'warning'
      });

    }
  });

  socket.on('traerCanvas',function(id){

    if(id==userTemp){
      socket.emit('enviarMicanvas',canvas.toDataURL("image/png",1.0));
    }
  });



  socket.on('recibirCanvas',function(canvasPintado){

    var img= new Image();
    img.src=canvasPintado;
    pincelExterno.drawImage(img,0,0);
  });
