document.addEventListener('DOMContentLoaded', () => {
    const copyBtn = document.getElementById('copy-button');
    const ipText = document.getElementById('server-ip').innerText;

    copyBtn.addEventListener('click', () => {
        // ტექსტის კოპირება
        navigator.clipboard.writeText(ipText).then(() => {
            // ღილაკის ტექსტის შეცვლა დროებით
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'COPIED!';
            copyBtn.style.borderColor = '#00ff00';
            copyBtn.style.color = '#00ff00';

            // 2 წამში უკან დაბრუნება
            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.borderColor = '#ff0000';
                copyBtn.style.color = '#ff0000';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});


  (function(){var w=window;if(w.ChannelIO){return w.console.error("ChannelIO script included twice.");}var ch=function(){ch.c(arguments);};ch.q=[];ch.c=function(args){ch.q.push(args);};w.ChannelIO=ch;function l(){if(w.ChannelIOInitialized){return;}w.ChannelIOInitialized=true;var s=document.createElement("script");s.type="text/javascript";s.async=true;s.src="https://cdn.channel.io/plugin/ch-plugin-web.js";var x=document.getElementsByTagName("script")[0];if(x.parentNode){x.parentNode.insertBefore(s,x);}}if(document.readyState==="complete"){l();}else{w.addEventListener("DOMContentLoaded",l);w.addEventListener("load",l);}})();

  ChannelIO('boot', {
    "pluginKey": "47765762-7a90-49f8-bb95-45060c80d045"
  });