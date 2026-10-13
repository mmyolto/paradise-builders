(function(){
  // Mobile menu
  var btn=document.querySelector('.menu-btn'), nav=document.getElementById('site-nav');
  if(btn&&nav){btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');});}

  // Year
  document.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});

  // Copy buttons
  function copyText(text,b){
    var done=function(){var t=b.textContent;b.textContent='Copied';setTimeout(function(){b.textContent=t;},1400);};
    try{navigator.clipboard.writeText(text).then(done,function(){select(b);});}catch(e){select(b);}
  }
  function select(b){var s=b.closest('.copyrow,.result');var el=s&&s.querySelector('span,pre');if(!el)return;var r=document.createRange();r.selectNodeContents(el);var sel=getSelection();sel.removeAllRanges();sel.addRange(r);b.textContent='Selected';}
  document.addEventListener('click',function(e){var b=e.target.closest('[data-copy]');if(b)copyText(b.getAttribute('data-copy'),b);});

  // Project filters
  var chips=document.querySelectorAll('.chip');
  chips.forEach(function(c){c.addEventListener('click',function(){
    chips.forEach(function(x){x.setAttribute('aria-pressed',x===c?'true':'false');});
    var f=c.dataset.filter;
    document.querySelectorAll('.gallery .shot').forEach(function(s){s.hidden=!(f==='all'||s.dataset.cat===f);});
  });});

  // Lightbox
  var dlg=document.querySelector('dialog.lightbox');
  if(dlg){
    var img=dlg.querySelector('img'),cap=dlg.querySelector('p');
    document.querySelectorAll('.shot button').forEach(function(b){b.addEventListener('click',function(){
      var i=b.querySelector('img');img.src=i.src;img.alt=i.alt;cap.textContent=b.dataset.caption||i.alt;
      if(dlg.showModal){dlg.showModal();}else{dlg.setAttribute('open','');}
    });});
    dlg.querySelector('button').addEventListener('click',function(){dlg.close?dlg.close():dlg.removeAttribute('open');});
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
  }

  // Service pre-select from link (#svc-xxx) on contact page
  var sel=document.getElementById('q-service');
  if(sel&&location.hash){var h=location.hash.slice(1);Array.prototype.forEach.call(sel.options,function(o){if(o.dataset.key===h)sel.value=o.value;});}

  // Quote form: build a ready-to-send enquiry
  var form=document.getElementById('quote-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var g=function(id){return (document.getElementById(id).value||'').trim();};
      var err=document.getElementById('q-error');
      if(!g('q-name')||(!g('q-phone')&&!g('q-email'))||!g('q-msg')){err.hidden=false;err.textContent='Add your name, a phone number or email, and a short description of the job.';return;}
      err.hidden=true;
      var lines=['QUOTE REQUEST — Paradise Building Systems','',
        'Name: '+g('q-name'),
        g('q-company')?'Company: '+g('q-company'):null,
        g('q-phone')?'Phone: '+g('q-phone'):null,
        g('q-email')?'Email: '+g('q-email'):null,
        'Service: '+g('q-service'),
        'Site location: '+g('q-location'),
        'Preferred start: '+g('q-start'),
        '','Project details:',g('q-msg')].filter(function(x){return x!==null;});
      var text=lines.join('\n');
      var out=document.getElementById('q-result');
      out.querySelector('pre').textContent=text;
      out.querySelector('[data-copy-result]').setAttribute('data-copy',text);
      out.hidden=false;out.scrollIntoView({behavior:'smooth',block:'nearest'});
    });
  }
})();
