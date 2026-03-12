"use client";
import { useState, useEffect, useRef } from "react";

const C={base:"#07070a",surface:"#0e0c10",border:"rgba(255,255,255,0.08)",gold:"#d4a832",goldDeep:"#8a6a1a",cream:"#f0ece4",muted:"rgba(255,255,255,0.48)",dim:"rgba(255,255,255,0.25)"};
const F={serif:"'Cormorant Garamond','Playfair Display',Georgia,serif",sans:"'DM Sans','Inter',system-ui,sans-serif"};
function useInView(t=0.1){const ref=useRef(null);const[v,setV]=useState(false);useEffect(()=>{const el=ref.current;if(!el)return;const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});o.observe(el);return()=>o.disconnect();},[]);return[ref,v];}
function Reveal({children,d=0}){const[ref,v]=useInView();return<div ref={ref} style={{transform:v?"translateY(0)":"translateY(32px)",opacity:v?1:0,transition:`all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s`}}>{children}</div>;}
const Grain=()=>(<div style={{position:"absolute",inset:0,opacity:0.04,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}}/>);

function Nav(){const[s,setS]=useState(false);useEffect(()=>{const h=()=>setS(window.scrollY>60);window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);},[]);return(<nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:s?"14px clamp(24px,4vw,56px)":"24px clamp(24px,4vw,56px)",display:"flex",justifyContent:"space-between",alignItems:"center",background:s?"rgba(7,7,10,0.94)":"transparent",backdropFilter:s?"blur(24px)":"none",borderBottom:s?`1px solid ${C.border}`:"none",transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)"}}><div><div style={{fontFamily:F.sans,fontSize:"8px",letterSpacing:"0.45em",textTransform:"uppercase",color:C.gold,marginBottom:"3px"}}>The World's New Football</div><span style={{fontFamily:F.serif,fontSize:"20px",fontWeight:600,color:C.cream}}>Forever Futbol</span></div><div style={{display:"flex",gap:"clamp(16px,2.5vw,36px)",alignItems:"center"}}>{["Experience","Tour","Groups","Partners"].map(n=>(<a key={n} href="#" style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.22em",textTransform:"uppercase",color:C.muted,textDecoration:"none"}}>{n}</a>))}<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:600,letterSpacing:"0.14em",textTransform:"uppercase",color:"#07070a",background:`linear-gradient(135deg,${C.gold},${C.goldDeep})`,border:"none",padding:"10px 26px",cursor:"pointer"}}>Get Tickets</button></div></nav>);}

const EXHIBITS=[{name:"Hall of Legends",desc:"Monumental icons, trophy-room drama, and heritage storytelling at museum scale.",accent:C.gold},{name:"World Cup Theater",desc:"Immersive cinematic football history with nation-scale energy and match-day emotion.",accent:"#4A9A6A"},{name:"Boots, Kits & Culture",desc:"The fashion, fandom, and aesthetic culture of football across generations.",accent:"#4A6A9A"},{name:"Street to Stadium",desc:"The bridge between grassroots football energy and world-stage glory.",accent:"#C85A1A"},{name:"The Beautiful Game",desc:"Technique, creativity, and the art of football translated into spatial experience.",accent:"#8A4A9A"},{name:"Nations & Flags",desc:"Cultural identity, football nationalism, and the power of the badge.",accent:"#9A4A4A"}];
const CITIES=[{city:"Atlanta",status:"Flagship",dates:"Spring 2026"},{city:"Houston",status:"Upcoming",dates:"Summer 2026"},{city:"Los Angeles",status:"Planned",dates:"Fall 2026"},{city:"Miami",status:"Planned",dates:"Q4 2026"}];

export default function ForeverFutbolV3(){const[loaded,setLoaded]=useState(false);const[hover,setHover]=useState(null);useEffect(()=>{setTimeout(()=>setLoaded(true),80);},[]);
return(<div style={{background:C.base}}>
<Nav/>
<section style={{minHeight:"100vh",position:"relative",overflow:"hidden",background:`radial-gradient(ellipse at 50% 80%, rgba(212,168,50,0.12) 0%, transparent 60%), ${C.base}`,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 clamp(32px,6vw,96px) 96px"}}>
<Grain/>
<div style={{position:"absolute",top:"15%",left:"50%",transform:"translateX(-50%)",width:"700px",height:"700px",borderRadius:"50%",background:`radial-gradient(circle, rgba(212,168,50,0.12), transparent 70%)`,pointerEvents:"none"}}/>
<div style={{position:"relative",zIndex:2,maxWidth:"1400px",margin:"0 auto",width:"100%",textAlign:"center"}}>
<div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.55em",textTransform:"uppercase",color:C.gold,opacity:loaded?1:0,transition:"opacity 0.9s ease 0.3s",marginBottom:"32px"}}>Culture Experience · Touring Museum · Football Heritage</div>
<h1 style={{fontFamily:F.serif,fontSize:"clamp(48px,9vw,130px)",fontWeight:600,lineHeight:0.9,letterSpacing:"-0.02em",color:C.cream,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(40px)",transition:"all 1.1s cubic-bezier(0.16,1,0.3,1) 0.6s"}}>The World's New<br/>Football <em style={{color:C.gold}}>Culture</em><br/><em>Experience</em></h1>
<p style={{fontFamily:F.sans,fontSize:"clamp(14px,1.2vw,17px)",lineHeight:1.8,color:C.muted,maxWidth:"560px",margin:"28px auto 0",opacity:loaded?1:0,transition:"opacity 0.9s ease 1.0s"}}>An immersive touring museum celebrating global football culture — its history, its icons, its fashion, and its power to unite every corner of the world.</p>
<div style={{display:"flex",gap:"16px",justifyContent:"center",marginTop:"44px",opacity:loaded?1:0,transition:"opacity 0.9s ease 1.3s",flexWrap:"wrap"}}>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#07070a",background:`linear-gradient(135deg,${C.gold},${C.goldDeep})`,border:"none",padding:"16px 44px",cursor:"pointer"}}>Explore the Tour</button>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"16px 38px",cursor:"pointer"}}>Group & Partners</button>
</div></div></section>

<section style={{background:C.base,padding:"120px clamp(32px,6vw,96px)"}}>
<div style={{maxWidth:"1400px",margin:"0 auto"}}>
<Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.gold,marginBottom:"16px"}}>Exhibition Worlds</div>
<h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,5vw,72px)",fontWeight:600,lineHeight:1.0,color:C.cream,marginBottom:"64px"}}>Inside the Experience</h2></Reveal>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"2px",background:C.border}}>
{EXHIBITS.map((ex,i)=>(<div key={ex.name} onMouseEnter={()=>setHover(i)} onMouseLeave={()=>setHover(null)} style={{background:hover===i?C.surface:C.base,padding:"44px 32px",cursor:"pointer",transition:"background 0.3s"}}>
<div style={{width:"40px",height:"2px",background:`linear-gradient(90deg,${ex.accent},transparent)`,marginBottom:"24px"}}/>
<div style={{fontFamily:F.serif,fontSize:"26px",fontWeight:600,color:C.cream,marginBottom:"14px"}}>{ex.name}</div>
<p style={{fontFamily:F.sans,fontSize:"13px",lineHeight:1.7,color:C.muted}}>{ex.desc}</p>
</div>))}
</div></div></section>

<section style={{background:C.surface,padding:"120px clamp(32px,6vw,96px)",position:"relative",overflow:"hidden"}}>
<div style={{maxWidth:"1400px",margin:"0 auto"}}>
<Reveal><div style={{fontFamily:F.sans,fontSize:"9px",letterSpacing:"0.48em",textTransform:"uppercase",color:C.gold,marginBottom:"16px"}}>City Rollout</div>
<h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,5vw,72px)",fontWeight:600,color:C.cream,marginBottom:"48px"}}>The Touring Schedule</h2></Reveal>
<div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"2px",background:C.border}}>
{CITIES.map(c=>(<div key={c.city} style={{background:C.base,padding:"40px 32px"}}>
<div style={{fontFamily:F.serif,fontSize:"28px",fontWeight:600,color:C.cream,marginBottom:"8px"}}>{c.city}</div>
<div style={{fontFamily:F.sans,fontSize:"11px",color:C.gold,marginBottom:"12px"}}>{c.dates}</div>
<span style={{fontFamily:F.sans,fontSize:"8px",fontWeight:600,letterSpacing:"0.25em",textTransform:"uppercase",color:C.gold,padding:"6px 14px",border:`1px solid rgba(212,168,50,0.3)`}}>{c.status}</span>
</div>))}
</div></div></section>

<section style={{background:C.base,padding:"120px clamp(32px,6vw,96px)",position:"relative",overflow:"hidden"}}>
<Grain/>
<div style={{position:"absolute",inset:0,background:`radial-gradient(ellipse at 50% 50%, rgba(212,168,50,0.08), transparent 65%)`}}/>
<div style={{maxWidth:"860px",margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}>
<Reveal>
<h2 style={{fontFamily:F.serif,fontSize:"clamp(36px,5vw,72px)",fontWeight:600,color:C.cream,lineHeight:1.0,marginBottom:"24px"}}>Carry the Culture Home.</h2>
<p style={{fontFamily:F.sans,fontSize:"16px",lineHeight:1.8,color:C.muted,maxWidth:"520px",margin:"0 auto 44px"}}>A premium retail layer with collectible drops, limited apparel, and football memorabilia curated by the Forever Futbol team.</p>
<div style={{display:"flex",gap:"16px",justifyContent:"center",flexWrap:"wrap"}}>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:"#07070a",background:`linear-gradient(135deg,${C.gold},${C.goldDeep})`,border:"none",padding:"16px 44px",cursor:"pointer"}}>Shop Merch</button>
<button style={{fontFamily:F.sans,fontSize:"10px",fontWeight:500,letterSpacing:"0.15em",textTransform:"uppercase",color:C.cream,background:"transparent",border:`1px solid ${C.border}`,padding:"16px 36px",cursor:"pointer"}}>Become a Partner</button>
</div></Reveal></div></section>

<footer style={{background:"#060609",borderTop:`1px solid ${C.border}`,padding:"64px clamp(32px,6vw,96px) 40px"}}>
<div style={{maxWidth:"1400px",margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px"}}>
<div><div style={{fontFamily:F.serif,fontSize:"24px",fontWeight:600,color:C.cream,marginBottom:"8px"}}>Forever Futbol</div><p style={{fontFamily:F.sans,fontSize:"13px",color:C.muted}}>The world's new football culture experience.</p></div>
<div style={{fontFamily:F.sans,fontSize:"11px",color:"rgba(255,255,255,0.22)"}}>© 2026 Forever Futbol. A KHG Enterprise.</div>
</div></footer>
</div>);}
