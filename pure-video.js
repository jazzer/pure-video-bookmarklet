/**
License: AGPLv3

Thanks for the code to make sure jQuery is imported to
http://www.learningjquery.com/2009/04/better-stronger-safer-jquerify-bookmarklet
*/

    (function() {
      var el=document.createElement('div'),
          b=document.getElementsByTagName('body')[0],
          otherlib=false,
          msg='';
      el.style.position='fixed';
      el.style.height='32px';
      el.style.width='220px';
      el.style.marginLeft='-110px';
      el.style.top='0';
      el.style.left='50%';
      el.style.padding='5px 10px';
      el.style.zIndex = 1001;
      el.style.fontSize='12px';
      el.style.color='#222';
      el.style.backgroundColor='#f99';
     
      if(typeof jQuery!='undefined') {
        msg='This page already using jQuery v'+jQuery.fn.jquery;
        return showMsg();
      } else if (typeof $=='function') {
        otherlib=true;
      }
     
      // more or less stolen form jquery core and adapted by paul irish
      function getScript(url,success){
        var script=document.createElement('script');
        script.src=url;
        var head=document.getElementsByTagName('head')[0],
            done=false;
        // Attach handlers for all browsers
        script.onload=script.onreadystatechange = function(){
          if ( !done && (!this.readyState
               || this.readyState == 'loaded'
               || this.readyState == 'complete') ) {
            done=true;
            success();
            script.onload = script.onreadystatechange = null;
            head.removeChild(script);
          }
        };
        head.appendChild(script);
      }
      getScript('http://code.jquery.com/jquery-latest.min.js',function() {
        if (typeof jQuery=='undefined') {
          msg='Sorry, but jQuery wasn\'t able to load';
        } else {
          msg='This page is now jQuerified with v' + jQuery.fn.jquery;
          if (otherlib) {msg+=' and noConflict(). Use $jq(), not $().';}
        }
        return showMsg();
      });
      function showMsg() {
        el.innerHTML=msg;
        b.appendChild(el);

        // pure video
        var target = undefined;
        // youtube: #watch-player
        if ($("#watch-player").length > 0){
            target = $("#watch-player"); 
        }
        // generic attempt
        if ($('object[type="application/x-shockwave-flash"]').length > 0){
            target = $('object[type="application/x-shockwave-flash"]');
        }
        // ask user
        if (target === undefined) {
            var idName = prompt("Show only which ID?", "");
            if (idName) {
                target = $("#watch-player");   
            }
        }
        // hide the rest
        if (target !== undefined) {
            target.prependTo('body');
            $('body > *').not(target).hide();
        }


        window.setTimeout(function() {
          if (typeof jQuery=='undefined') {
            b.removeChild(el);
          } else {
            jQuery(el).fadeOut('slow',function() {
              jQuery(this).remove();
            });
            if (otherlib) {
              $jq=jQuery.noConflict();
            }
          }
        } ,2500);    
      }
    })();
