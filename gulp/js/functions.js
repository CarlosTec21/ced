$(document).ready(function(){
    // var location = 'http://localhost:8888/evolucion-digital/';
    // var location = 'https://evolucion.heliko.space/';
    var location = 'https://egade.csf.itesm.mx/ci/ced/';
    // var location = '';
    $('#main-header').load(location + 'menu.html');
    $('#header').load(location + 'menu.html');
    $('#footer').load(location + 'footer.html');
    $('.nosotros_tabs').tabs();
    $('.item_tabs').tabs();
});
