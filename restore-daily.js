(()=>{
  const endpoint='https://cneioixtqjncjzgtyhdk.supabase.co/rest/v1/rpc/get_daily_guest_result';
  const apiKey='sb_publishable_KoG_6vK0nRhsnLntJf-TNA_4yXIAKo8';
  const deviceKey='shurum_burum_device_id';
  let locked=false;
  const getDevice=()=>{try{return localStorage.getItem(deviceKey)}catch(_){return null}};
  const textOf=c=>c?.type==='bonus'?`${c.text}\nКод: ${c.code}`:(c?.text||'');
  function reveal(c){
    if(!c||!c.restored||Number(c.used||0)<Number(c.limit||0))return;
    const page=document.querySelector('#page'),cookie=document.querySelector('#cookie'),paper=document.querySelector('#fortune-paper'),paperText=document.querySelector('#paper-fortune'),intro=document.querySelector('#intro'),result=document.querySelector('#result'),open=document.querySelector('#open'),opening=document.querySelector('#opening'),actions=document.querySelector('#actions'),again=document.querySelector('#again'),note=document.querySelector('.demo-note'),kicker=document.querySelector('#result .mini-title');
    if(!page||!cookie||!paper||!paperText)return;
    const text=textOf(c);
    paperText.textContent=text;
    paperText.style.whiteSpace='pre-line';
    try{if(typeof window.configurePaper==='function')window.configurePaper(text)}catch(_){}
    cookie.classList.remove('idle','cracking','resetting');
    cookie.classList.add('revealed');
    page.classList.add('is-revealed');
    paper.setAttribute('aria-hidden','false');
    intro?.setAttribute('aria-hidden','true');
    result?.setAttribute('aria-hidden','false');
    if(open)open.hidden=true;
    if(opening)opening.hidden=true;
    if(actions)actions.hidden=false;
    if(kicker)kicker.textContent=c.type==='bonus'?'ТВОЙ БОНУС':'ТВОЁ ПРЕДСКАЗАНИЕ';
    if(again){again.disabled=true;again.textContent='ПРЕДСКАЗАНИЕ НА СЕГОДНЯ';again.style.opacity='.55';again.style.pointerEvents='none'}
    if(note)note.textContent=c.type==='bonus'?'Бонус и код сохранены здесь до завтра':'Это предсказание сохранено здесь до завтра';
    cookie.setAttribute('aria-label',c.type==='bonus'?`Бонус: ${c.text}. Код ${c.code}`:`Предсказание: ${text}`);
    locked=true;
  }
  document.addEventListener('click',e=>{
    if(!locked)return;
    const t=e.target.closest('#cookie,#open,#again,#restart');
    if(!t)return;
    e.preventDefault();
    e.stopImmediatePropagation();
  },true);
  const deviceId=getDevice();
  if(!deviceId)return;
  fetch(endpoint,{method:'POST',headers:{apikey:apiKey,'Content-Type':'application/json'},body:JSON.stringify({p_device_id:deviceId})})
    .then(async r=>r.ok?r.json():null)
    .then(reveal)
    .catch(()=>{});
})();