var express=require('express');
var app=express();

var server=require('http').Server(app);
var io=require('socket.io')(server);
app.use(express.static('public'));
var usuarios=[{
	id:1,
	name:'Servidor',
	color:"#fff",
	ultimox:0,
	ultimoy:0,
	pasx:0,
	pasy:0
}];
var canvas=null;
app.get('/',function(req,res){
	res.status(200).send("Hello world");
});

io.on('connection',function(socket){



	console.log("Una nueva ventana");
	socket.emit('getUsuarios',usuarios);

	socket.on('new-usuario',function(data){

		socket.username=data.name;
		usuarios.push(data);
		io.sockets.emit('getUsuarios',usuarios);
		socket.broadcast.emit('emitToast',socket.username);

		if(usuarios.length>2){
			io.sockets.emit('traerCanvas',usuarios[1].name);
		}

		socket.on('enviarMicanvas',function(dat){
			socket.broadcast.emit('recibirCanvas',dat);

		});

		// socket.emit('recibirCanvas',canvas);

	});//fin de new-usuario

	socket.on('guardarCanvas',function(lienzo){
		canvas=lienzo;
	});

	socket.on('pintarTexto',function(data){
		io.sockets.emit('pintarTexto',data);
	});

	socket.on('draw',function(datosCanvas){
		var ultmX=0;
		var ultmY=0;

		for(var i=0;i < usuarios.length;i++){
			if(usuarios[i].name==datosCanvas.id){
				ultmX=usuarios[i].pasx;
				ultmY=usuarios[i].pasy;
				usuarios[i].pasx=usuarios[i].ultimox;
				usuarios[i].pasy=usuarios[i].ultimoy;
			}
		}
		data={x:datosCanvas.x,y:datosCanvas.y,color:datosCanvas.color,action:datosCanvas.action,ux:ultmX,uy:ultmY};
		io.sockets.emit('draw',data);
	});

	socket.on('actUXY',function(data){

		for(var i=0;i < usuarios.length;i++){
			if(usuarios[i].name==socket.username){
				console.log("esto se actualiza"+ socket.username);
				usuarios[i].pasx=data.ux;
				usuarios[i].pasy=data.uy;
			}
		}

	});

	socket.on('xyUpdate',function(data){

		for(var i=0;i < usuarios.length;i++){
			if(usuarios[i].name==socket.username){
				usuarios[i].ultimox=data.ux;
				usuarios[i].ultimoy=data.uy;
			}
		}

	});//fin de update x

	socket.on("disconnect", function(){
		console.log(usuarios.length);
		console.log(socket.username);

		socket.broadcast.emit('emitToastSalir',socket.username)

		for(var i=0;i < usuarios.length;i++){
			if(usuarios[i].name==socket.username){
				console.log("un usuario registrado se desconecto" + socket.username);
				usuarios.splice(i,1);
				io.sockets.emit('getUsuarios',usuarios);
			}
		}
		console.log("desconectado");
	});//fin de discone


});//fin del io connection

server.listen(8080,function(){
	console.log('servidor corriendo');
});
