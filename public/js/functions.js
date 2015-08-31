//Returns a JSON response representing the items in the nav

var menu = document.getElementById('menu');
var requestJson = new XMLHttpRequest();
requestJson.open('GET', '/js/nav.json'); //Get json

requestJson.onreadystatechange = function(){
 if(requestJson.readyState == 4){
  if(requestJson.status == 200){

   var data = JSON.parse(requestJson.responseText)
   var menuItem= "<ul>";

   for(i=0;i<data.items.length;i++){
    menuItem += "<li class='menu--link' "
    if (data.items[i].items!=null) {
     menuItem += "data-url='true' ";
    }
    menuItem += "><a  href='";
    if (data.items[i].items!=null) {
     menuItem += "#";
    }else{
     menuItem += data.items[i].url;
    }
    menuItem += "' id='link" + i + "'>" + data.items[i].label + "</a>";

    if (data.items[i].items!=null) {
     menuItem += "<div class='menu--arrow'></div><ul>";
     for(h=0; h<data.items[i].items.length; h++){
      menuItem += "<li><a href='" + data.items[i].items[h].url + "'>" + data.items[i].items[h].label + "</a></li>";
     }
     menuItem += "</ul>";
    }
    menuItem += "</li>";
   }
   menuItem += "</ul>";
   menu.innerHTML = menuItem;
   menuEffects();
  }
 }
}
requestJson.send();//Send request


//Menu effects links

function menuEffects(){//This is the desktop menu: transparence and click event
 var link = document.getElementsByClassName("menu--link");
 var transparence = document.getElementById("transparence");
 var wrapper = document.getElementById("wrapper");
 transparence.onclick = menuTransparence;
 for(j=0; j<link.length; j++){
  link[j].onclick = menuTransparence;
  function menuTransparence(){
   for(k=0; k<link.length; k++){
    link[k].className = "menu--link is-hidden";
    transparence.className = "transparence is-hidden";
    wrapper.className = "wrapper is-visible";
   }
   if(this.getAttribute('data-url') == "true"){
    this.className = "menu--link is-visible";
    transparence.className = "transparence is-visible";
    wrapper.className = "wrapper is-hidden";
   }
  }
 }

 //This is the mobile's effects: push right and left, and hamburguer
 var close = document.getElementById("close");
 var logo = document.getElementById("logo");
 var footer = document.getElementById("footer");
 close.onclick = menuOpen;
 function menuClose(){
  close.className = "menu--close is-visible";
  logo.className = "menu--logo is-visible";
  footer.className = "is-visible";
  menu.className = "is-visible";
  transparence.className = "transparence is-visible";
  close.onclick = menuOpen;
  transparence.onclick = menuOpen;
 }
 function menuOpen(){
  close.className = "menu--close is-hidden";
  logo.className = "menu--logo is-hidden";
  footer.className = "is-hidden";
  menu.className = "is-hidden";
  transparence.className = "transparence is-hidden";
  close.onclick = menuClose;
 }
}





