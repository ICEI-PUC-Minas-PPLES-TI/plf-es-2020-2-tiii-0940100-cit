var baseUrl = 'http://52.188.152.85:81'; //http://52.188.152.85:81
$.ajaxSetup({
    headers: { 
        'X-Admin': getCookie('xadmin'),
        'X-Orgao': getCookie('xorgao'),
        'X-Cidadao': getCookie('xcid'),
     },
    beforeSend: function(xhr, options) {
        if(options.url.substr(0,4) != 'http') options.url = baseUrl + options.url;
    }
})


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}