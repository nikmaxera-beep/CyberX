/* BUY POPUP ONLY */
const buttons = document.querySelectorAll(".buy-btn");
const popup = document.getElementById("popup");

buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
        popup.style.display="flex";
    });
});

function closePopup(){
    popup.style.display="none";
}




  (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();

  ChannelIO('boot', {
    "pluginKey": "47765762-7a90-49f8-bb95-45060c80d045"
  });