const SUPABASE_URL='https://wfkohcwxxsrhcxhepfql.supabase.co';
const SUPABASE_KEY='sb_publishable_zKej0f4ql6VSR9rtHXaU0w_0yhVNAGL';
const VISUAL_VIEW='museum_public_visuals_v2';
const INTEREST_ENDPOINT=`${SUPABASE_URL}/functions/v1/museum-interest`;

const esc=(value='')=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const REQUESTS=[
  ['notify','Notify Me','Be first to know when this museum reaches your city.'],
  ['tickets','Tickets','Get on-sale and ticket information for your market.'],
  ['group_visit','Groups','Plan a group museum experience.'],
  ['school_visit','Schools','Plan a student, campus, or educational visit.'],
  ['private_event','Private Events','Explore receptions, buyouts, and private experiences.'],
  ['merchandise','Merchandise','Get museum collection and merchandise updates.'],
  ['press','Press','Media, editorial, partnership, and interview requests.']
];

const CONFIG={
  'scented-flowers':{
    name:'Scented Flowers',
    short:'SCENTED FLOWERS',
    theme:'scented',
    eyebrow:'THE MOTHER MUSEUM',
    hero:'One cultural house. Four museum worlds.',
    intro:'Scented Flowers is the cultural museum house connecting distinct experiences built around recognition, remembrance, influence, and the stories that move people forward.',
    statement:'Preserving stories. Celebrating legacies. Inspiring generations.',
    annual:'The experience evolves. The collection changes. The reason to return is built into the museum itself.',
    signature:'Different every year. Discovered inside.',
    accent:'#d7a43a',
    soft:'#f2d98a',
    cities:['Atlanta','Miami','Orlando','Houston','Tampa','Memphis','Savannah','Dallas','New York','Denver','Washington, D.C.','Las Vegas','Los Angeles','Charlotte','Nashville','Birmingham'],
    chapters:[
      ['01','THE HOUSE','One Legacy','A mother museum built to hold multiple cultural worlds without flattening their identities.'],
      ['02','THE COLLECTION','Four Worlds','Each museum has its own emotional temperature, architecture, and point of view.'],
      ['03','THE EDITION','Always Evolving','Annual editions give the public something new to discover and a reason to return.'],
      ['04','THE DISTRICT','Go Deeper','Move from one museum world to the next through one connected cultural ecosystem.']
    ]
  },
  'living-legends':{
    name:'Living Legends',
    short:'LIVING LEGENDS',
    theme:'living',
    eyebrow:'A SCENTED FLOWERS MUSEUM',
    hero:'Give them their flowers while they can smell them.',
    intro:'An immersive living tribute to people whose talent, leadership, and cultural influence helped shape the world around us.',
    statement:'Honor the impact while the story is still being written.',
    annual:'A different annual collection. New rooms. New stories. No online roster.',
    signature:'Recognition becomes an environment.',
    accent:'#d7a43a',
    soft:'#f5df98',
    cities:['Miami','Orlando','Houston','Tampa','Atlanta','Memphis','Savannah','Dallas','New York','Denver','Washington, D.C.','Las Vegas','Los Angeles','Charlotte','Nashville'],
    chapters:[
      ['01','ARRIVAL','The Threshold','Enter through monument, light, and ceremonial scale.'],
      ['02','LEGACY','Hall of Honor','See influence treated with the permanence it deserves.'],
      ['03','STORY','The Story Rooms','Move through origins, breakthrough, transformation, and impact.'],
      ['04','HONOR','The Flowers Room','Gratitude becomes part of the experience through reflection and participation.']
    ],
    experiences:['Letters of Appreciation','Champagne Welcome','Art + Installation','Biographies','Awards + Accolades','What You Didn’t Know','Audio + Video','Silent Headphones','Lifesize Statues','Life Journey Maps','Souvenir Shop']
  },
  'fallen-stars':{
    name:'Fallen Stars',
    short:'FALLEN STARS',
    theme:'fallen',
    eyebrow:'A SCENTED FLOWERS MUSEUM',
    hero:'The stars still shine.',
    intro:'A luminous remembrance museum honoring cultural icons whose lives ended while their work, influence, and memory continue to move generations.',
    statement:'Their light is not gone. It changed where we look for it.',
    annual:'Each annual edition brings forward a different constellation of lives, eras, and cultural moments.',
    signature:'Remembrance without reducing a life to its ending.',
    accent:'#e3bd68',
    soft:'#fff0c9',
    cities:['Miami','Orlando','Houston','Tampa','Atlanta','New York','Denver','Nashville','Memphis','Savannah','Dallas','Birmingham','Los Angeles','Las Vegas','Washington, D.C.','Charlotte'],
    chapters:[
      ['01','LIGHT','Threshold of Light','Cross into a luminous space built around remembrance.'],
      ['02','MEMORY','Walk of Legends','Encounter stories across generations without a pre-published roster.'],
      ['03','ARCHIVE','The Legacy Archive','Artifacts, music, film, photographs, and milestones preserve the human story.'],
      ['04','REFLECT','Memorial Garden','Slow down, remember, and connect your own memories to the experience.']
    ],
    experiences:['Walk of Legends','Memorial Garden','Reflection Space','Art + Installation','Biographies','Awards + Accolades','What You Didn’t Know','Audio + Video','Silent Headphones','Lifesize Statues','Life Journey Maps','Souvenir Shop']
  },
  'women-make-the-world-go-round':{
    name:'Women Make the World Go Round',
    short:'WOMEN MAKE THE WORLD GO ROUND',
    theme:'women',
    eyebrow:'A SCENTED FLOWERS MUSEUM',
    hero:'Vision. Strength. Impact.',
    intro:'An immersive museum of women’s achievement, perspective, and influence, with a flagship focus on Black women and urban culture.',
    statement:'The world moves differently because women moved it first.',
    annual:'Every year introduces a different collection of women, industries, eras, and impact. Discovery happens inside.',
    signature:'Her story. Our world. Our future.',
    accent:'#dda0aa',
    soft:'#efcf98',
    cities:['Miami','Orlando','Houston','Tampa','Atlanta','New York','Denver','Nashville','Memphis','Savannah','Dallas','Charlotte','Los Angeles','Las Vegas','Washington, D.C.','Birmingham'],
    chapters:[
      ['01','VISION','World in Motion','Orbit becomes the visual language for influence across generations.'],
      ['02','LEAD','Hall of Vision','Portraiture and storytelling reveal how women expanded what was possible.'],
      ['03','CULTURE','Culture Lab','Music, beauty, fashion, media, and entertainment show how taste becomes influence.'],
      ['04','POWER','Power + Progress','Business, athletics, activism, and community show leadership in action.']
    ],
    experiences:['Leadership Galleries','Culture Archive','Art + Installation','Biographies','Awards + Accolades','What You Didn’t Know','Audio + Video','Interactive Storytelling','Lifesize Statues','Life Journey Maps','Souvenir Shop']
  }
};

const FAMILY=[
  {slug:'living-legends',name:'Living Legends',copy:'Celebrate greatness while the story is still being written.',tone:'LIVING · HONOR · IMPACT'},
  {slug:'fallen-stars',name:'Fallen Stars',copy:'Carry forward the light, work, and memory that still move culture.',tone:'MEMORY · LEGACY · LIGHT'},
  {slug:'women-make-the-world-go-round',name:'Women Make the World Go Round',copy:'Make women’s leadership, creativity, and cultural force impossible to overlook.',tone:'VISION · POWER · INFLUENCE'},
  {slug:'forever-futbol',name:'Forever Futbol',copy:'A standalone museum of the beautiful game — past, present, eternal.',tone:'THE BEAUTIFUL GAME',external:'https://foreverfutbolmuseum.com'}
];

async function fetchVisuals(slug){
  try{
    const url=`${SUPABASE_URL}/rest/v1/${VISUAL_VIEW}?museum_slug=eq.${encodeURIComponent(slug)}&select=asset_key,asset_role,sort_order,public_url,data_uri,art_direction,collection&collection=eq.museum-v2&order=sort_order.asc`;
    const r=await fetch(url,{headers:{apikey:SUPABASE_KEY}});
    if(!r.ok) throw new Error(`visual catalog ${r.status}`);
    const rows=await r.json();
    return rows.filter(x=>x.collection==='museum-v2'&&(x.public_url||x.data_uri)).map(x=>({
      key:x.asset_key,
      url:x.public_url||x.data_uri,
      role:x.asset_role||'gallery',
      order:x.sort_order||0,
      art:x.art_direction||{}
    }));
  }catch(error){
    console.warn('V2 visual catalog unavailable',error);
    return [];
  }
}

function visualStyle(v){
  const a=v?.art||{};
  return `--desk-pos:${a.desktop_position||'50% 50%'};--tablet-pos:${a.tablet_position||a.desktop_position||'50% 50%'};--mobile-pos:${a.mobile_position||'50% 50%'};--scene-scale:${a.scale||1};`;
}
function img(v,alt='',priority=false){
  if(!v?.url) return `<div class="visual-missing" aria-hidden="true"></div>`;
  return `<img class="scene-image" src="${v.url}" alt="${esc(alt)}" style="${visualStyle(v)}" ${priority?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
}

function nav(c){
  return `<nav class="nav"><a href="/" class="parent-word">SCENTED FLOWERS</a><a href="#top" class="current-word">${esc(c.name)}</a><div class="nav-links"><a href="#edition">Annual Edition</a><a href="#experience">Experience</a><a class="nav-cta" href="#visit">Plan Visit</a></div><button class="menu" aria-label="Open menu"><span></span><span></span></button></nav>`;
}

function motion(theme){
  if(theme==='fallen') return `<div class="motion motion-stars" aria-hidden="true"><i></i><i></i><i></i><i></i><b></b></div>`;
  if(theme==='women') return `<div class="motion motion-orbits" aria-hidden="true"><i></i><i></i><i></i><b></b></div>`;
  if(theme==='living') return `<div class="motion motion-growth" aria-hidden="true"><i></i><i></i><i></i><b></b></div>`;
  return `<div class="motion motion-bloom" aria-hidden="true"><i></i><i></i><i></i><i></i></div>`;
}

function scene(v,eyebrow,title,copy,theme,index=1){
  return `<section class="full-scene scene-${index} theme-${theme}">${img(v,'')}<div class="scene-overlay"></div>${motion(theme)}<div class="scene-copy reveal"><span class="eyebrow">${esc(eyebrow)}</span><h2>${esc(title)}</h2><p>${esc(copy)}</p></div></section>`;
}

function journey(c){
  return `<section class="journey" id="experience"><header class="section-head reveal"><span class="eyebrow">THE VISITOR JOURNEY</span><h2>Built to be experienced, not scrolled past.</h2><p>Each museum moves through a deliberate sequence of arrival, story, emotion, discovery, and reflection.</p></header><div class="journey-grid">${c.chapters.map(([n,k,t,p])=>`<article class="journey-card reveal"><span>${n}</span><small>${esc(k)}</small><h3>${esc(t)}</h3><p>${esc(p)}</p></article>`).join('')}</div></section>`;
}

function experience(c){
  const list=c.experiences||['Immersive Architecture','Cultural Storytelling','Artifacts + Archives','Audio + Video','Interactive Installations','Touring Editions','Souvenir Shop'];
  return `<section class="experience"><header class="section-head reveal"><span class="eyebrow">INSIDE THE MUSEUM</span><h2>More than a room full of names.</h2><p>The experience combines story, environment, objects, sound, scale, and participation. The annual collection changes; the museum standard does not.</p></header><div class="feature-grid">${list.map((x,i)=>`<div class="feature reveal"><span>${String(i+1).padStart(2,'0')}</span><strong>${esc(x)}</strong></div>`).join('')}</div></section>`;
}

function annual(c,v){
  return `<section id="edition" class="annual"><div class="annual-visual">${img(v,'')}</div><div class="annual-copy reveal"><span class="eyebrow">THE ANNUAL EDITION</span><h2>You know the museum.<br>You do not know everyone inside.</h2><p>${esc(c.annual)}</p><div class="annual-rule"><strong>NO ROSTER.</strong><strong>NO SPOILERS.</strong><strong>NEW EVERY YEAR.</strong></div><a href="#visit" class="button">PLAN THE DISCOVERY</a></div></section>`;
}

function requestForm(slug,c){
  return `<section id="visit" class="visit"><div class="visit-title reveal"><span class="eyebrow">PLAN YOUR VISIT</span><h2>Come for the discovery.</h2><p>Choose your city and what you need. Confirmed dates, venues, and on-sale information appear as markets activate.</p></div><div class="visit-grid"><div class="market-panel reveal"><label for="city">TOUR MARKET</label><select id="city">${c.cities.map(x=>`<option>${esc(x)}</option>`).join('')}</select><div class="market-state"><span>PLANNED MARKET</span><strong id="market-name">${esc(c.cities[0])}</strong><p>Venue + dates announced when confirmed.</p></div><div class="request-tabs">${REQUESTS.map((r,i)=>`<button type="button" data-request="${r[0]}" class="${i===0?'active':''}">${r[1]}</button>`).join('')}</div></div><form id="interest-form" class="interest-form reveal"><div class="form-intro"><span class="eyebrow">REQUEST TYPE</span><h3 id="request-title">${REQUESTS[0][1]}</h3><p id="request-desc">${REQUESTS[0][2]}</p></div><div class="field-row"><label>Name<input name="name" required minlength="2" autocomplete="name"></label><label>Email<input name="email" type="email" required autocomplete="email"></label></div><div class="field-row"><label>Phone<input name="phone" type="tel" autocomplete="tel"></label><label>Group Size<input name="group_size" type="number" min="1" max="5000"></label></div><label>Organization<input name="organization" autocomplete="organization"></label><label>Message<textarea name="message" rows="4" placeholder="Tell the museum team what you need."></textarea></label><button class="submit" type="submit">SUBMIT REQUEST</button><div id="form-status" role="status" aria-live="polite"></div></form></div></section>`;
}

function footer(c){
  return `<footer><div><strong>SCENTED FLOWERS</strong><span>${esc(c.name)}</span></div><div class="footer-links"><a href="/living-legends">Living Legends</a><a href="/fallen-stars">Fallen Stars</a><a href="/women-make-the-world-go-round">Women Make the World Go Round</a><a href="https://foreverfutbolmuseum.com" target="_blank" rel="noopener">Forever Futbol</a></div><small>THE ANNUAL COLLECTION IS DISCOVERED INSIDE.</small></footer>`;
}

function childPage(slug,c,visuals){
  const [v1,v2,v3,v4]=visuals;
  return `<main class="page theme-${c.theme}" style="--accent:${c.accent};--soft:${c.soft}">${nav(c)}<header id="top" class="hero">${img(v1,'',true)}<div class="hero-overlay"></div>${motion(c.theme)}<div class="hero-content reveal"><span class="eyebrow">${esc(c.eyebrow)}</span><h1>${esc(c.name)}</h1><p class="hero-line">${esc(c.hero)}</p><p class="hero-deck">${esc(c.intro)}</p><div class="hero-actions"><a class="button primary" href="#edition">DISCOVER THE EDITION</a><a class="button ghost" href="#visit">PLAN A VISIT</a></div></div><div class="scroll-cue">ENTER THE MUSEUM <i></i></div></header><section class="manifesto"><div class="reveal"><span class="eyebrow">WHY IT EXISTS</span><h2>${esc(c.statement)}</h2></div><p class="reveal">The public experience is intentionally built around discovery. The people and stories inside are not reduced to a public checklist before the visit.</p></section>${annual(c,v2)}${journey(c)}${scene(v3,'INSIDE THE EXPERIENCE',c.signature,'Cinematic environments turn culture into space, movement, sound, memory, and participation.',c.theme,1)}${experience(c)}${scene(v4,'RETURN DIFFERENT','A museum worth coming back to.','The annual edition evolves so the next visit can reveal a different set of stories, moments, and perspectives.',c.theme,2)}${requestForm(slug,c)}${footer(c)}</main>`;
}

function motherPage(c,visuals){
  const [v1,v2,v3,v4]=visuals;
  return `<main class="page theme-scented" style="--accent:${c.accent};--soft:${c.soft}"><nav class="nav mother-nav"><a href="#top" class="parent-word">SCENTED FLOWERS</a><span class="current-word">THE MOTHER MUSEUM</span><div class="nav-links"><a href="#family">Museums</a><a href="#edition">Annual Model</a><a class="nav-cta" href="#visit">Plan Visit</a></div><button class="menu" aria-label="Open menu"><span></span><span></span></button></nav><header id="top" class="hero mother-hero">${img(v1,'',true)}<div class="hero-overlay"></div>${motion('scented')}<div class="hero-content reveal"><span class="eyebrow">THE MOTHER MUSEUM</span><h1>Scented Flowers</h1><p class="hero-line">${esc(c.hero)}</p><p class="hero-deck">${esc(c.intro)}</p><div class="hero-actions"><a class="button primary" href="#family">ENTER THE DISTRICT</a><a class="button ghost" href="#edition">THE ANNUAL MODEL</a></div></div><div class="scroll-cue">ONE FAMILY · FOUR WORLDS <i></i></div></header>${scene(v2,'THE CULTURAL HOUSE','One parent. Distinct identities.','The architecture connects the museums without making them look, sound, or feel like the same brand.',c.theme,1)}<section id="family" class="family"><header class="section-head reveal"><span class="eyebrow">THE MUSEUM FAMILY</span><h2>Choose a world.</h2><p>Each museum is designed as an independent cultural experience. Scented Flowers is the house that brings them together.</p></header><div class="family-grid">${FAMILY.map((m,i)=>{const href=m.external||`/${m.slug}`;return `<a class="family-card reveal" href="${href}" ${m.external?'target="_blank" rel="noopener"':''}><span>0${i+1}</span><small>${esc(m.tone)}</small><h3>${esc(m.name)}</h3><p>${esc(m.copy)}</p><b>ENTER →</b></a>`}).join('')}</div></section>${annual(c,v3)}<section class="manifesto mother-statement"><div class="reveal"><span class="eyebrow">THE PROMISE</span><h2>${esc(c.statement)}</h2></div><p class="reveal">The museum family can grow, tour, evolve, and relaunch without giving away the reason to walk through the doors.</p></section>${scene(v4,'THE MUSEUM DISTRICT','One legacy. Endless reasons to return.','Scented Flowers is built to operate as a cultural destination, a touring platform, and a repeatable annual experience.',c.theme,2)}${requestForm('scented-flowers',c)}${footer(c)}</main>`;
}

function wireUI(slug,c){
  const menu=document.querySelector('.menu');
  const links=document.querySelector('.nav-links');
  menu?.addEventListener('click',()=>{links?.classList.toggle('open');menu.classList.toggle('open')});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>links?.classList.remove('open')));

  const city=document.querySelector('#city');
  city?.addEventListener('change',()=>{const n=document.querySelector('#market-name');if(n)n.textContent=city.value});

  let request='notify';
  document.querySelectorAll('[data-request]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-request]').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active'); request=btn.dataset.request;
    const r=REQUESTS.find(x=>x[0]===request)||REQUESTS[0];
    const t=document.querySelector('#request-title'),d=document.querySelector('#request-desc');
    if(t)t.textContent=r[1]; if(d)d.textContent=r[2];
  }));

  const form=document.querySelector('#interest-form');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();
    const status=document.querySelector('#form-status');
    const submit=form.querySelector('.submit');
    submit.disabled=true; submit.textContent='SENDING…'; if(status)status.textContent='';
    const fd=new FormData(form);
    const body={museum_slug:slug,lead_type:request,city:city?.value||'',name:fd.get('name')||'',email:fd.get('email')||'',phone:fd.get('phone')||'',organization:fd.get('organization')||'',group_size:fd.get('group_size')?Number(fd.get('group_size')):null,message:fd.get('message')||'',source_page:location.pathname,consent:true};
    try{
      const r=await fetch(INTEREST_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json',apikey:SUPABASE_KEY},body:JSON.stringify(body)});
      const data=await r.json().catch(()=>({}));
      if(!r.ok||data.ok===false)throw new Error(data.error||'Request could not be sent.');
      if(status)status.innerHTML=`<strong>REQUEST RECEIVED</strong><span>${esc(data.reference||'Museum team notified.')}</span>`;
      form.reset(); request='notify';
    }catch(error){if(status)status.textContent='We could not send this request. Please try again.'}
    finally{submit.disabled=false;submit.textContent='SUBMIT REQUEST'}
  });

  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
  let last=0;
  addEventListener('scroll',()=>{const y=scrollY;document.body.classList.toggle('scrolled',y>40);last=y},{passive:true});
}

async function boot(){
  const slug=document.body.dataset.page||'scented-flowers';
  const c=CONFIG[slug]||CONFIG['scented-flowers'];
  document.body.classList.add(`body-${c.theme}`);
  const app=document.querySelector('#app');
  app.innerHTML='<div class="boot"><span>SCENTED FLOWERS</span><i></i><small>ENTERING THE MUSEUM</small></div>';
  const visuals=await fetchVisuals(slug);
  app.innerHTML=slug==='scented-flowers'?motherPage(c,visuals):childPage(slug,c,visuals);
  wireUI(slug,c);
  requestAnimationFrame(()=>document.body.classList.add('loaded'));
}
boot();