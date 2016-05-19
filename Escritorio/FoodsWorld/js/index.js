alert("cargador");
$.get('view/index.hbs' ,  function  ( data ) { 
    var  template = Handlebars . compile ( data ); 
    $('index').html (template); 
},'html');