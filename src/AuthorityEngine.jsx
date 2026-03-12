import { useState, useEffect, useReducer } from 'react'

const SIGNALS = [
  { id:1, day:'Monday', name:'DISCIPLINE', color:'#C9A24A', tagline:'Foundation of belief — structure over chaos.', behavior:'Research, planning, daily routines executed without shortcuts.', symbol:'Pen writing in a quiet workspace', phase:'Pre-production — research, script lock-in, project setup', principle:'Leaders who show up consistently earn trust before they earn attention.', outcome:'Projects launch on time with zero excuses.' },
  { id:2, day:'Tuesday', name:'MOMENTUM', color:'#E8B84B', tagline:'Progress compounds through action.', behavior:'Rapid ideation, project starts, prototypes generated.', symbol:'Footsteps advancing forward', phase:'Concept development — storyboards, shot lists, creative direction locked', principle:'Momentum separates builders from dreamers.', outcome:'Concepts move from idea to direction within days, not weeks.' },
  { id:3, day:'Wednesday', name:'CRAFT', color:'#B8962E', tagline:'Excellence through obsessive attention to detail.', behavior:'Production time, editing sessions, creative revisions. Every frame matters.', symbol:'Editing timeline on screen', phase:'Production — filming, editing, sound design, visual effects', principle:'Craft is the visible proof of invisible discipline.', outcome:'Deliverables exceed expectations because every detail is intentional.' },
  { id:4, day:'Thursday', name:'CALM CONFIDENCE', color:'#C9A24A', tagline:'True authority moves with composure.', behavior:'Decision checkpoints, team collaboration, leadership under pressure.', symbol:'Steady breath — composed stillness', phase:'Direction and refinement — creative review, quality control', principle:'The leader who stays composed gives everyone else permission to do the same.', outcome:'Clients never experience chaos. Every interaction communicates control.' },
  { id:5, day:'Friday', name:'VISION', color:'#D4AF37', tagline:'The ability to see what others cannot yet see.', behavior:'Narrative outlines, strategic planning, future-state mapping.', symbol:'City skyline at dawn', phase:'Narrative alignment — story arc review, messaging strategy', principle:'Vision is not prediction. It is the discipline of seeing clearly while others react.', outcome:'Clients get direction, not just content.' },
  { id:6, day:'Saturday', name:'PROGRESS', color:'#B8962E', tagline:'Small steps repeated daily create extraordinary outcomes.', behavior:'Revisions completed, performance improvements measured, systems refined.', symbol:'Notebook pages filling up', phase:'Iteration and improvement — A/B testing, analytics review', principle:'Progress is proof. It converts belief from philosophy into results.', outcome:'Measurable improvement on every cycle. Compounding returns over time.' },
  { id:7, day:'Sunday', name:'AUTHORITY', color:'#C9A24A', tagline:'Leadership earned through execution and results.', behavior:'Project releases, content publication, audience reach expansion.', symbol:'Closing a presentation with conviction', phase:'Release and impact — final delivery, launch, distribution', principle:'Authority feeds the next cycle of Discipline. The loop never stops.', outcome:'Finished work becomes proof that the belief-driven approach works.' }
]

const CLIP_TYPES = ['Offer/Promo','Brand Presence','Booking Promo','Recruitment Ad','Testimonial','Educational']
const PLATFORMS = ['Instagram Reels','TikTok','YouTube Shorts','Facebook','LinkedIn','X/Twitter']

function getTodaySignal() {
  const day = new Date().getDay()
  const map = { 1:0, 2:1, 3:2, 4:3, 5:4, 6:5, 0:6 }
  return SIGNALS[map[day]]
}
function getDayName() {
  return ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date().getDay()]
}
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const INITIAL_STATE = {
  clips:[], businessName:'', businessType:'', email:'',
  signalCounts:{1:0,2:0,3:0,4:0,5:0,6:0,7:0}, onboarded:false
}

function reducer(state, action) {
  switch(action.type) {
    case 'LOAD': return { ...state, ...action.payload }
    case 'ONBOARD': return { ...state, businessName:action.name, businessType:action.btype, email:action.email, onboarded:true }
    case 'ADD_CLIP': {
      const newCounts = { ...state.signalCounts, [action.clip.signalId]:(state.signalCounts[action.clip.signalId]||0)+1 }
      return { ...state, clips:[action.clip,...state.clips], signalCounts:newCounts }
    }
    case 'REMOVE_CLIP': return { ...state, clips:state.clips.filter(c=>c.id!==action.id) }
    case 'RESET': return INITIAL_STATE
    default: return state
  }
}

const G = '#C9A24A'
const BG = '#0B0B0B'

const s = {
  app: { minHeight:'100vh', background:BG, color:'#F5F0E8', fontFamily:"'Georgia', serif" },
  nav: { background:'#0f0f0f', borderBottom:'1px solid #1a1a1a', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:60, position:'sticky', top:0, zIndex:100 },
  navLogo: { fontSize:13, letterSpacing:3, color:G, fontFamily:'Georgia, serif', fontWeight:'bold' },
  main: { maxWidth:960, margin:'0 auto', padding:'32px 24px' },
  card: { background:'#111', border:'1px solid #1e1e1e', borderRadius:12, padding:24, marginBottom:20 },
  goldCard: { background:'#0f0e0a', border:'1px solid #2a2010', borderRadius:12, padding:24, marginBottom:20 },
  label: { display:'block', fontSize:11, letterSpacing:2, color:'#666', marginBottom:8, textTransform:'uppercase' },
  input: { width:'100%', background:'#0f0f0f', border:'1px solid #2a2a2a', borderRadius:8, padding:'12px 14px', color:'#F5F0E8', fontSize:14, fontFamily:'Georgia, serif', boxSizing:'border-box', outline:'none' },
  inputError: { width:'100%', background:'#0f0f0f', border:'1px solid #C9A24A', borderRadius:8, padding:'12px 14px', color:'#F5F0E8', fontSize:14, fontFamily:'Georgia, serif', boxSizing:'border-box', outline:'none' },
  btn: (variant='primary', disabled=false) => ({
    padding: variant==='sm' ? '8px 16px' : '12px 24px',
    borderRadius:8, border: variant==='outline' ? `1px solid ${G}` : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: variant==='sm' ? 11 : 13, letterSpacing:1,
    fontFamily:'Georgia, serif',
    background: disabled ? '#1a1a1a' : variant==='primary' ? G : variant==='outline' ? 'transparent' : '#1a1a1a',
    color: disabled ? '#444' : variant==='primary' ? BG : G,
    fontWeight: variant==='primary' ? 'bold' : 'normal',
    opacity: disabled ? 0.6 : 1,
    transition:'all 0.2s'
  }),
  tag: { display:'inline-block', padding:'4px 10px', borderRadius:20, background:'#1a1a1a', border:'1px solid #2a2a2a', fontSize:11, color:'#888', marginRight:6, marginBottom:4 },
  textarea: { width:'100%', background:'#0f0f0f', border:'1px solid #2a2a2a', borderRadius:8, padding:'12px 14px', color:'#F5F0E8', fontSize:13, fontFamily:'Georgia, serif', boxSizing:'border-box', outline:'none', resize:'vertical', minHeight:100 },
  signalChip: (active, color) => ({
    padding:'10px 14px', borderRadius:8, cursor:'pointer',
    border: active ? `1px solid ${color}` : '1px solid #1e1e1e',
    background: active ? '#0f0e0a' : '#0f0f0f',
    transition:'all 0.2s', textAlign:'center'
  }),
  bar: (pct, color) => ({ height:6, borderRadius:3, background:`linear-gradient(90deg, ${color} ${pct}%, #1e1e1e ${pct}%)`, marginTop:6 }),
  tab: (active) => ({ padding:'8px 20px', borderRadius:6, border:'none', cursor:'pointer', fontSize:13, letterSpacing:1, fontFamily:'Georgia, serif', background:active ? G : 'transparent', color:active ? BG : '#888', transition:'all 0.2s' }),
}

// ── LANDING PAGE ────────────────────────────────────────────
function Landing({ onStart }) {
  const today = getTodaySignal()
  const features = [
    { icon:'⚡', title:'60-Second Brief', desc:'Select your signal, choose your content type, get a complete production brief instantly.' },
    { icon:'📋', title:'Hook + Script + Visuals', desc:'Every brief includes your hook, voiceover script, visual direction, caption, and CTA.' },
    { icon:'📱', title:'Platform-Ready', desc:'Formatted for TikTok, Instagram, LinkedIn, YouTube Shorts, and Facebook.' },
    { icon:'🎯', title:'7-Signal Framework', desc:"Built on Brand Media Group's Seven Signals Method™ — the belief-driven content system." },
  ]
  return (
    <div style={{ minHeight:'100vh', background:BG }}>
      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navLogo}>BMG AUTHORITY ENGINE™</div>
        <a href="https://brandmediagroup.co" target="_blank" rel="noreferrer"
          style={{ fontSize:11, letterSpacing:1, color:'#666', textDecoration:'none' }}>brandmediagroup.co</a>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth:800, margin:'0 auto', padding:'80px 24px 60px', textAlign:'center' }}>
        <div style={{ display:'inline-block', padding:'6px 18px', borderRadius:20, border:`1px solid ${G}`, fontSize:11, letterSpacing:3, color:G, marginBottom:32 }}>
          FREE CONTENT BRIEF GENERATOR
        </div>
        <h1 style={{ fontSize:52, fontWeight:'normal', color:'#F5F0E8', lineHeight:1.15, marginBottom:20 }}>
          Generate your<br/><span style={{ color:G }}>7-Signal content brief</span><br/>in 60 seconds.
        </h1>
        <p style={{ fontSize:18, color:'#888', lineHeight:1.7, marginBottom:16, maxWidth:560, margin:'0 auto 16px' }}>
          Tell us your business. Pick your signal. Get a complete production brief — hook, script, visual direction, caption, and CTA — ready to hand to OpenArt or any video tool.
        </p>
        <p style={{ fontSize:14, color:'#555', marginBottom:48 }}>
          Free. No account. No pitch. Just a brief that works.
        </p>
        <button style={{ ...s.btn('primary'), padding:'18px 48px', fontSize:15, letterSpacing:2, borderRadius:10 }} onClick={onStart}>
          GET MY FREE BRIEF →
        </button>
        <p style={{ fontSize:12, color:'#444', marginTop:20, letterSpacing:1 }}>
          Used by sports, entertainment, fashion, and AI ops brands
        </p>
      </div>

      {/* TODAY'S SIGNAL BANNER */}
      <div style={{ maxWidth:800, margin:'0 auto 60px', padding:'0 24px' }}>
        <div style={{ background:'#0f0e0a', border:`1px solid #2a2010`, borderRadius:12, padding:'20px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:3, color:'#555', marginBottom:6 }}>TODAY — {getDayName().toUpperCase()}</div>
            <div style={{ fontSize:18, color:today.color, fontWeight:'bold', letterSpacing:1 }}>Signal {today.id}: {today.name}</div>
            <div style={{ fontSize:13, color:'#888', marginTop:4 }}>{today.tagline}</div>
          </div>
          <button style={{ ...s.btn('outline'), padding:'10px 22px', fontSize:12 }} onClick={onStart}>
            Create today's brief →
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth:800, margin:'0 auto 60px', padding:'0 24px' }}>
        <div style={{ textAlign:'center', fontSize:11, letterSpacing:3, color:'#555', marginBottom:32 }}>WHAT YOU GET</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {features.map((f,i) => (
            <div key={i} style={s.card}>
              <div style={{ fontSize:24, marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontSize:14, color:'#F5F0E8', fontWeight:'bold', marginBottom:8 }}>{f.title}</div>
              <div style={{ fontSize:13, color:'#666', lineHeight:1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SIGNALS PREVIEW */}
      <div style={{ maxWidth:800, margin:'0 auto 60px', padding:'0 24px' }}>
        <div style={{ textAlign:'center', fontSize:11, letterSpacing:3, color:'#555', marginBottom:24 }}>THE 7 SIGNALS</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {SIGNALS.map(sig => (
            <div key={sig.id} style={{ ...s.card, padding:'16px 18px', marginBottom:0, display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ fontSize:11, color:sig.color, fontWeight:'bold', minWidth:20 }}>{sig.id}</div>
              <div>
                <div style={{ fontSize:12, color:'#F5F0E8', letterSpacing:1, marginBottom:3 }}>{sig.name}</div>
                <div style={{ fontSize:11, color:'#555' }}>{sig.day}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ maxWidth:800, margin:'0 auto', padding:'0 24px 80px', textAlign:'center' }}>
        <div style={{ background:'#0f0f0f', borderRadius:16, border:'1px solid #1e1e1e', padding:'48px 32px' }}>
          <div style={{ fontSize:11, letterSpacing:3, color:'#555', marginBottom:16 }}>READY?</div>
          <h2 style={{ fontSize:28, color:'#F5F0E8', fontWeight:'normal', marginBottom:12 }}>Your first brief takes 60 seconds.</h2>
          <p style={{ color:'#666', fontSize:14, marginBottom:32 }}>No signup required. No credit card. Just your business name and one click.</p>
          <button style={{ ...s.btn('primary'), padding:'16px 44px', fontSize:14, letterSpacing:2 }} onClick={onStart}>
            START NOW →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop:'1px solid #1a1a1a', padding:'24px', textAlign:'center' }}>
        <p style={{ color:'#444', fontSize:11, letterSpacing:2, margin:0 }}>
          BRAND MEDIA GROUP — EVERY PROJECT BEGINS WITH BELIEF —{' '}
          <a href="https://brandmediagroup.co" style={{ color:G }}>BRANDMEDIAGROUP.CO</a>
        </p>
      </div>
    </div>
  )
}

// ── ONBOARDING ──────────────────────────────────────────────
function Onboarding({ dispatch, onBack }) {
  const [name, setName] = useState('')
  const [btype, setBtype] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = true
    if (!btype.trim()) e.btype = true
    if (!email.trim() || !email.includes('@')) e.email = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = () => {
    if (validate()) dispatch({ type:'ONBOARD', name:name.trim(), btype:btype.trim(), email:email.trim() })
  }

  return (
    <div style={{ minHeight:'100vh', background:BG, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ maxWidth:480, width:'100%' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:'#555', cursor:'pointer', fontSize:12, letterSpacing:1, marginBottom:32, padding:0 }}>
          ← Back
        </button>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:G, marginBottom:16 }}>BRAND MEDIA GROUP</div>
          <h1 style={{ fontSize:36, color:'#F5F0E8', fontWeight:'normal', marginBottom:12 }}>Authority Engine™</h1>
          <p style={{ color:'#666', fontSize:15, lineHeight:1.6 }}>Tell us about your business and we'll generate a complete content brief built around your Seven Signal.</p>
        </div>
        <div style={s.card}>
          <label style={s.label}>Your Business Name</label>
          <input
            style={{ ...(errors.name ? s.inputError : s.input), marginBottom: errors.name ? 4 : 20 }}
            value={name} onChange={e=>setName(e.target.value)}
            placeholder="e.g. Brand Media Group"
          />
          {errors.name && <p style={{ color:G, fontSize:11, marginBottom:16, marginTop:0 }}>Required</p>}

          <label style={s.label}>Business Type / Industry</label>
          <input
            style={{ ...(errors.btype ? s.inputError : s.input), marginBottom: errors.btype ? 4 : 20 }}
            value={btype} onChange={e=>setBtype(e.target.value)}
            placeholder="e.g. Insurance Agency, Real Estate, Marketing, Restaurant"
          />
          {errors.btype && <p style={{ color:G, fontSize:11, marginBottom:16, marginTop:0 }}>Required</p>}

          <label style={s.label}>Your Email (we'll send your brief)</label>
          <input
            style={{ ...(errors.email ? s.inputError : s.input), marginBottom: errors.email ? 4 : 28 }}
            value={email} onChange={e=>setEmail(e.target.value)}
            placeholder="you@yourbusiness.com" type="email"
          />
          {errors.email && <p style={{ color:G, fontSize:11, marginBottom:20, marginTop:0 }}>Valid email required</p>}

          <button
            style={{ ...s.btn('primary'), width:'100%', padding:'14px 0' }}
            onClick={submit}>
            ENTER THE ENGINE →
          </button>
        </div>
        <p style={{ textAlign:'center', color:'#333', fontSize:12, marginTop:16, lineHeight:1.6 }}>
          We may follow up to offer a free AI Ops Audit.<br/>No spam. Unsubscribe any time.
        </p>
        <p style={{ textAlign:'center', color:'#333', fontSize:11, marginTop:8 }}>Every Project Begins With Belief. Signal On.</p>
      </div>
    </div>
  )
}

// ── DASHBOARD ───────────────────────────────────────────────
function Dashboard({ state, setTab }) {
  const today = getTodaySignal()
  const totalClips = state.clips.length
  const maxCount = Math.max(...Object.values(state.signalCounts), 1)
  return (
    <div>
      <div style={s.goldCard}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:3, color:'#666', marginBottom:8 }}>TODAY — {getDayName().toUpperCase()}</div>
            <h1 style={{ fontSize:28, color:'#F5F0E8', fontWeight:'normal', marginBottom:6 }}>{getGreeting()}, {state.businessName}.</h1>
            <p style={{ color:'#888', fontSize:14, margin:0 }}>Today's signal is <span style={{ color:today.color, fontWeight:'bold' }}>{today.name}</span> — {today.tagline}</p>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:36, color:G, fontWeight:'bold' }}>{totalClips}</div>
            <div style={{ fontSize:11, letterSpacing:2, color:'#666' }}>BRIEFS CREATED</div>
          </div>
        </div>
        <div style={{ marginTop:20, padding:'14px 18px', background:BG, borderRadius:8, borderLeft:`3px solid ${today.color}` }}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:6 }}>TODAY'S PRODUCTION PHASE</div>
          <div style={{ color:'#F5F0E8', fontSize:13 }}>{today.phase}</div>
          <div style={{ color:'#888', fontSize:12, marginTop:4, fontStyle:'italic' }}>"{today.principle}"</div>
        </div>
        <button style={{ ...s.btn('primary'), marginTop:20 }} onClick={()=>setTab('CREATE')}>
          CREATE TODAY'S BRIEF →
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        <div style={s.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:16 }}>SIGNAL USAGE</div>
          {SIGNALS.map(sig => {
            const count = state.signalCounts[sig.id] || 0
            const pct = Math.round((count / maxCount) * 100)
            return (
              <div key={sig.id} style={{ marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11 }}>
                  <span style={{ color:'#888', letterSpacing:1 }}>{sig.name}</span>
                  <span style={{ color:sig.color }}>{count}</span>
                </div>
                <div style={s.bar(pct, sig.color)} />
              </div>
            )
          })}
        </div>
        <div style={s.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:16 }}>WHAT THIS WEEK NEEDS</div>
          {SIGNALS.map(sig => (
            <div key={sig.id} style={{ padding:'8px 0', borderBottom:'1px solid #1a1a1a', display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:sig.color, flexShrink:0 }} />
              <div>
                <span style={{ fontSize:12, color:'#F5F0E8' }}>{sig.day} — </span>
                <span style={{ fontSize:12, color:sig.color }}>{sig.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AUDIT CTA CARD */}
      <div style={{ background:'#0f0e0a', border:`1px solid ${G}`, borderRadius:12, padding:28, marginBottom:20, textAlign:'center' }}>
        <div style={{ fontSize:11, letterSpacing:3, color:G, marginBottom:12 }}>WANT BMG TO RUN THIS FOR YOU?</div>
        <h3 style={{ fontSize:20, color:'#F5F0E8', fontWeight:'normal', marginBottom:10 }}>Book your free AI Ops Audit.</h3>
        <p style={{ color:'#888', fontSize:13, lineHeight:1.6, marginBottom:20, maxWidth:480, margin:'0 auto 20px' }}>
          We'll review your current workflow and show you exactly what an AI-powered operations system would look like for your specific business. 15 minutes. No pitch. Just signal.
        </p>
        <a href="https://brandmediagroup.co" target="_blank" rel="noreferrer"
          style={{ ...s.btn('primary'), display:'inline-block', textDecoration:'none', padding:'12px 32px' }}>
          BOOK FREE AUDIT → brandmediagroup.co
        </a>
      </div>
    </div>
  )
}

// ── GENERATOR ───────────────────────────────────────────────
function Generator({ state, dispatch }) {
  const [step, setStep] = useState(1)
  const [selectedSignal, setSelectedSignal] = useState(null)
  const [clipType, setClipType] = useState('')
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [platforms, setPlatforms] = useState([])
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [shakeNext, setShakeNext] = useState(false)

  const nudge = () => {
    setShakeNext(true)
    setTimeout(()=>setShakeNext(false), 600)
  }

  const handleNext1 = () => { if (selectedSignal) setStep(2); else nudge() }
  const handleNext2 = () => { if (clipType) setStep(3); else nudge() }

  const togglePlatform = (p) => setPlatforms(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev, p])

  const generate = () => {
    if (!title) return
    setGenerating(true)
    setTimeout(() => {
      const sig = selectedSignal
      const scripts = {
        'Offer/Promo': {
          hook:`This is what ${state.businessType} looks like when it's done right.`,
          voiceover:`At ${state.businessName}, we don't just promise results — we build the system that delivers them. Signal ${sig.id}: ${sig.name}. ${sig.outcome} If you're ready to stop guessing and start building, let's talk.`,
          visuals:`${sig.symbol}. Cinematic shot — minimal movement, dramatic lighting, black and gold palette. Text overlay: "${sig.name}" fades in center frame. End tag: "${state.businessName}. Every Project Begins With Belief."`,
          caption:`${sig.tagline}\n\nAt ${state.businessName}, this is how we operate. Not inspiration — infrastructure.\n\n${platforms.map(p=>`#${p.replace('/','').replace(/ /g,'')}`).join(' ')} #SignalOn #${sig.name.replace(/ /g,'')}`,
          cta:`DM "AUDIT" to book your free 15-minute AI Ops review.`
        },
        'Brand Presence': {
          hook:`${sig.name}. Signal ${sig.id} of 7.`,
          voiceover:`${sig.tagline} At ${state.businessName}, ${sig.behavior.toLowerCase()} This is the ${sig.phase.toLowerCase()}. ${sig.principle}`,
          visuals:`Symbol: ${sig.symbol}. 8–10 second cinematic clip. Slow push-in. Minimal motion. Text: "${sig.name}" — centered, gold on black. End card: "${state.businessName}. Signal On."`,
          caption:`${sig.tagline}\n\n${sig.behavior}\n\nSignal ${sig.id} of the Seven Signals Method™ by ${state.businessName}.\n\n#SevenSignals #${sig.name.replace(/ /g,'')} #SignalOn #BrandMediaGroup`,
          cta:`Follow for all 7 signals this week.`
        },
        'Booking Promo': {
          hook:`Spots are limited. Here's what you get when you book.`,
          voiceover:`${state.businessName} is taking on ${state.businessType} clients who are ready to build real infrastructure. Signal ${sig.id}: ${sig.name}. ${sig.outcome} Book your free audit at brandmediagroup.co.`,
          visuals:`Calendar or scheduling interface with gold highlight. Close-up of confirmation screen. Text: "Book Now." Cinematic, minimal. Color: black and gold.`,
          caption:`We're running free AI Ops Audits for ${state.businessType} businesses this month.\n\n15 minutes. We look at your workflow. You leave with a clear picture of what AI changes for you.\n\nNo pitch. Just signal.\n\nLink in bio → brandmediagroup.co\n\n#FreeAudit #AIops #${state.businessType.replace(/ /g,'')}`,
          cta:`Book your free audit → brandmediagroup.co`
        },
        'Recruitment Ad': {
          hook:`We're building something real. We need people who move with intention.`,
          voiceover:`${state.businessName} operates on the Seven Signals Method™. Every role here runs on ${sig.name.toLowerCase()}. ${sig.tagline} If that's how you work, we should talk.`,
          visuals:`Office or workspace with intentional energy. Desks, screens, motion. Text: "${sig.name}" — gold. End: "${state.businessName} is hiring." Cinematic.`,
          caption:`${state.businessName} is growing.\n\nWe need people who operate on ${sig.name.toLowerCase()}. ${sig.tagline}\n\n${sig.principle}\n\nDM us to learn more.\n\n#Hiring #${sig.name.replace(/ /g,'')} #SignalOn`,
          cta:`DM "JOIN" to start the conversation.`
        },
        'Testimonial': {
          hook:`Here's what changed when they stopped guessing.`,
          voiceover:`Before ${state.businessName}, [Client Name] was [describe the problem]. After building their system on Signal ${sig.id}: ${sig.name}, [describe the result]. ${sig.outcome} This is what belief-driven infrastructure looks like.`,
          visuals:`Client b-roll or testimonial interview. Cut to results — analytics, screens, moments of clarity. Text overlay: "[Key result]". Gold accent. Professional, grounded.`,
          caption:`When you operate on ${sig.name.toLowerCase()}, the results speak.\n\n${sig.principle}\n\nThis is what our clients experience at ${state.businessName}.\n\n#ClientResult #${sig.name.replace(/ /g,'')} #SevenSignals #SignalOn`,
          cta:`Book your free audit to see what's possible for you.`
        },
        'Educational': {
          hook:`Most ${state.businessType} businesses skip this step. Here's what it costs them.`,
          voiceover:`Signal ${sig.id} in the Seven Signals Method™ is ${sig.name}. ${sig.tagline} The production phase is: ${sig.phase.toLowerCase()}. The principle: ${sig.principle} The outcome when you get this right: ${sig.outcome}`,
          visuals:`Motion graphics or talking head. Text annotations for each point. Symbol reference: ${sig.symbol}. Clean, minimal, cinematic. No clutter.`,
          caption:`${sig.name} — Signal ${sig.id} of 7.\n\n${sig.tagline}\n\nMost ${state.businessType} businesses skip this. The ones who don't build authority that compounds.\n\n#${sig.name.replace(/ /g,'')} #SevenSignals #${state.businessType.replace(/ /g,'')} #SignalOn`,
          cta:`Save this. Apply it this week.`
        }
      }
      const template = scripts[clipType] || scripts['Brand Presence']
      setResult({
        id:Date.now().toString(), title, topic,
        signalId:sig.id, signalName:sig.name, clipType, platforms,
        date:new Date().toLocaleDateString(),
        ...template
      })
      setGenerating(false)
    }, 1800)
  }

  const save = () => {
    dispatch({ type:'ADD_CLIP', clip:result })
    setStep(1); setSelectedSignal(null); setClipType(''); setTitle(''); setTopic(''); setPlatforms([]); setResult(null)
  }

  if (result) return (
    <div>
      <div style={s.goldCard}>
        <div style={{ fontSize:11, letterSpacing:3, color:G, marginBottom:8 }}>✓ BRIEF GENERATED</div>
        <h2 style={{ fontSize:22, color:'#F5F0E8', fontWeight:'normal', marginBottom:8 }}>{result.title}</h2>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <span style={s.tag}>Signal {result.signalId}: {result.signalName}</span>
          <span style={s.tag}>{result.clipType}</span>
          {result.platforms.map(p=><span key={p} style={s.tag}>{p}</span>)}
        </div>
      </div>

      {[['🎯 HOOK',result.hook],['🎙 VOICEOVER / SCRIPT',result.voiceover],['🎬 VISUAL DIRECTION',result.visuals],['📝 CAPTION',result.caption],['📣 CTA',result.cta]].map(([label,text])=>(
        <div key={label} style={s.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:10 }}>{label}</div>
          <p style={{ color:'#F5F0E8', fontSize:14, lineHeight:1.7, margin:0, whiteSpace:'pre-line' }}>{text}</p>
        </div>
      ))}

      <div style={{ display:'flex', gap:12, marginBottom:32, flexWrap:'wrap' }}>
        <button style={s.btn('primary')} onClick={save}>SAVE TO LIBRARY</button>
        <button style={s.btn('outline')} onClick={()=>setResult(null)}>REGENERATE</button>
      </div>

      {/* POST-GENERATION AUDIT CTA */}
      <div style={{ background:'#0f0e0a', border:`1px solid ${G}`, borderRadius:12, padding:32, textAlign:'center' }}>
        <div style={{ fontSize:11, letterSpacing:3, color:G, marginBottom:12 }}>WANT BMG TO BUILD AND RUN THIS FOR YOU?</div>
        <h3 style={{ fontSize:22, color:'#F5F0E8', fontWeight:'normal', marginBottom:10 }}>You just generated one brief.<br/>We automate this for your entire business.</h3>
        <p style={{ color:'#888', fontSize:14, lineHeight:1.7, marginBottom:24, maxWidth:520, margin:'0 auto 24px' }}>
          Book a free 15-minute AI Ops Audit. We'll review your workflow and show you what a fully automated content and operations system looks like for <strong style={{color:'#F5F0E8'}}>{state.businessName}</strong>. No pitch. Just signal.
        </p>
        <a href="https://brandmediagroup.co" target="_blank" rel="noreferrer"
          style={{ ...s.btn('primary'), display:'inline-block', textDecoration:'none', padding:'14px 36px', fontSize:14, letterSpacing:2 }}>
          BOOK FREE AUDIT → BRANDMEDIAGROUP.CO
        </a>
        <p style={{ color:'#444', fontSize:11, marginTop:16 }}>15 minutes. Free. No obligation.</p>
      </div>
    </div>
  )

  // STEP INDICATOR
  const StepBar = () => (
    <div style={{ display:'flex', gap:8, marginBottom:28, alignItems:'center' }}>
      {[1,2,3].map(n => (
        <div key={n} style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, background:step>=n ? G : '#1a1a1a', color:step>=n ? BG : '#666', fontWeight:'bold', transition:'all 0.3s' }}>{n}</div>
          {n<3 && <div style={{ width:40, height:1, background:step>n ? G : '#1e1e1e', transition:'all 0.3s' }} />}
        </div>
      ))}
      <span style={{ color:'#666', fontSize:12, marginLeft:8 }}>
        {step===1?'Select Signal':step===2?'Choose Type':'Clip Details'}
      </span>
    </div>
  )

  return (
    <div>
      <StepBar />

      {step === 1 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:'#666', marginBottom:20 }}>SELECT YOUR SIGNAL</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
            {SIGNALS.map(sig => {
              const isToday = sig.day === getDayName()
              const active = selectedSignal?.id === sig.id
              return (
                <div key={sig.id}
                  style={{ ...s.signalChip(active, sig.color), position:'relative' }}
                  onClick={()=>setSelectedSignal(sig)}>
                  {isToday && <div style={{ position:'absolute', top:8, right:8, fontSize:10, color:G }}>★ TODAY</div>}
                  <div style={{ fontSize:10, color:'#666', marginBottom:4 }}>{sig.id} — {sig.day.toUpperCase()}</div>
                  <div style={{ fontSize:13, color:active ? sig.color : '#F5F0E8', letterSpacing:1, fontWeight:'bold' }}>{sig.name}</div>
                  <div style={{ fontSize:11, color:'#555', marginTop:4 }}>{sig.symbol}</div>
                </div>
              )
            })}
          </div>
          {selectedSignal && (
            <div style={{ ...s.card, borderColor:'#2a2010', marginBottom:20 }}>
              <div style={{ fontSize:13, color:selectedSignal.color, marginBottom:6, fontWeight:'bold' }}>{selectedSignal.name}</div>
              <p style={{ color:'#888', fontSize:13, lineHeight:1.6, margin:0 }}>{selectedSignal.tagline}<br/><em style={{fontSize:12, marginTop:8, display:'block'}}>"{selectedSignal.principle}"</em></p>
            </div>
          )}
          {shakeNext && !selectedSignal && (
            <p style={{ color:G, fontSize:12, marginBottom:12, letterSpacing:1 }}>↑ Select a signal to continue</p>
          )}
          <button style={s.btn('primary', !selectedSignal)} onClick={handleNext1}>
            NEXT: CHOOSE TYPE →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:'#666', marginBottom:20 }}>SELECT CLIP TYPE</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:16 }}>
            {CLIP_TYPES.map(t => (
              <div key={t} style={s.signalChip(clipType===t, G)} onClick={()=>setClipType(t)}>
                <div style={{ fontSize:13, color:clipType===t ? G : '#F5F0E8' }}>{t}</div>
              </div>
            ))}
          </div>
          {shakeNext && !clipType && (
            <p style={{ color:G, fontSize:12, marginBottom:12, letterSpacing:1 }}>↑ Select a clip type to continue</p>
          )}
          <div style={{ display:'flex', gap:12, marginTop:16 }}>
            <button style={s.btn('ghost')} onClick={()=>setStep(1)}>← BACK</button>
            <button style={s.btn('primary', !clipType)} onClick={handleNext2}>NEXT: DETAILS →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:'#666', marginBottom:20 }}>CLIP DETAILS</div>
          <label style={s.label}>Clip Title</label>
          <input style={{...s.input, marginBottom:20}} value={title} onChange={e=>setTitle(e.target.value)}
            placeholder={`e.g. ${selectedSignal?.name} — ${state.businessName}`} />
          <label style={s.label}>Topic / Context (optional)</label>
          <textarea style={{...s.textarea, marginBottom:20}} value={topic} onChange={e=>setTopic(e.target.value)}
            placeholder="Any specific message, offer, or context to weave in..." />
          <label style={s.label}>Target Platforms</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
            {PLATFORMS.map(p => (
              <div key={p} style={{ ...s.signalChip(platforms.includes(p), G), padding:'8px 14px' }} onClick={()=>togglePlatform(p)}>
                <span style={{ fontSize:12, color:platforms.includes(p) ? G : '#888' }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button style={s.btn('ghost')} onClick={()=>setStep(2)}>← BACK</button>
            <button style={{ ...s.btn('primary', !title||generating), minWidth:180 }}
              onClick={()=>!generating&&generate()}
              disabled={!title||generating}>
              {generating ? '⟳  GENERATING...' : 'GENERATE BRIEF →'}
            </button>
          </div>
          {generating && (
            <div style={{ marginTop:24, padding:20, background:'#0f0e0a', borderRadius:8, border:'1px solid #2a2010' }}>
              <div style={{ fontSize:12, color:G, letterSpacing:2, marginBottom:8 }}>BUILDING YOUR BRIEF...</div>
              <div style={{ fontSize:13, color:'#666' }}>Applying Signal {selectedSignal?.id}: {selectedSignal?.name} to your {state.businessType} brief.</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── LIBRARY ─────────────────────────────────────────────────
function Library({ state, dispatch }) {
  const [filter, setFilter] = useState('ALL')
  const [expanded, setExpanded] = useState(null)
  const filtered = filter==='ALL' ? state.clips : state.clips.filter(c=>c.signalName===filter)
  return (
    <div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
        {['ALL',...SIGNALS.map(sig=>sig.name)].map(f=>(
          <button key={f} style={{...s.btn(filter===f?'primary':'ghost'), padding:'6px 14px', fontSize:11}} onClick={()=>setFilter(f)}>{f}</button>
        ))}
      </div>
      {filtered.length===0 ? (
        <div style={{ ...s.card, textAlign:'center', padding:40 }}>
          <p style={{ color:'#666' }}>No briefs yet. Head to CREATE to generate your first one.</p>
        </div>
      ) : filtered.map(c=>(
        <div key={c.id} style={s.card}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }} onClick={()=>setExpanded(expanded===c.id?null:c.id)}>
            <div>
              <div style={{ fontSize:14, color:'#F5F0E8', marginBottom:6 }}>{c.title}</div>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                <span style={s.tag}>{c.signalName}</span>
                <span style={s.tag}>{c.clipType}</span>
                <span style={s.tag}>{c.date}</span>
              </div>
            </div>
            <span style={{ color:'#666', fontSize:18 }}>{expanded===c.id?'−':'+'}</span>
          </div>
          {expanded===c.id&&(
            <div style={{ marginTop:20, paddingTop:20, borderTop:'1px solid #1e1e1e' }}>
              {[['HOOK',c.hook],['VOICEOVER',c.voiceover],['VISUALS',c.visuals],['CAPTION',c.caption],['CTA',c.cta]].map(([l,t])=>(
                <div key={l} style={{ marginBottom:16 }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:'#666', marginBottom:6 }}>{l}</div>
                  <p style={{ color:'#F5F0E8', fontSize:13, lineHeight:1.6, margin:0, whiteSpace:'pre-line' }}>{t}</p>
                </div>
              ))}
              <button style={{...s.btn('ghost'), padding:'6px 14px', fontSize:11, marginTop:8}} onClick={()=>dispatch({type:'REMOVE_CLIP',id:c.id})}>REMOVE</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── APP ROOT ────────────────────────────────────────────────
export default function AuthorityEngine() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [tab, setTab] = useState('DASHBOARD')
  const [loaded, setLoaded] = useState(false)
  const [showLanding, setShowLanding] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bmg-authority-engine')
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({ type:'LOAD', payload:parsed })
        if (!parsed.onboarded) setShowLanding(true)
      } else {
        setShowLanding(true)
      }
    } catch(e) {
      setShowLanding(true)
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem('bmg-authority-engine', JSON.stringify(state)) } catch(e) {}
  }, [state, loaded])

  if (!loaded) return (
    <div style={{ ...s.app, display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <div style={{ color:G, letterSpacing:3, fontSize:13 }}>LOADING...</div>
    </div>
  )

  if (showLanding && !state.onboarded) return <Landing onStart={()=>setShowLanding(false)} />
  if (!state.onboarded) return <Onboarding dispatch={dispatch} onBack={()=>setShowLanding(true)} />

  return (
    <div style={s.app}>
      <nav style={s.nav}>
        <div style={s.navLogo}>BMG AUTHORITY ENGINE™</div>
        <div style={{ display:'flex', gap:4 }}>
          {['DASHBOARD','CREATE','LIBRARY'].map(t=>(
            <button key={t} style={s.tab(tab===t)} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </div>
        <div style={{ fontSize:11, color:'#444', letterSpacing:1 }}>Signal On.</div>
      </nav>
      <main style={s.main}>
        {tab==='DASHBOARD' && <Dashboard state={state} setTab={setTab} />}
        {tab==='CREATE' && <Generator state={state} dispatch={dispatch} />}
        {tab==='LIBRARY' && <Library state={state} dispatch={dispatch} />}
      </main>
      <footer style={{ borderTop:'1px solid #1a1a1a', padding:'20px 24px', textAlign:'center' }}>
        <p style={{ color:'#444', fontSize:11, letterSpacing:2, margin:0 }}>
          BRAND MEDIA GROUP — EVERY PROJECT BEGINS WITH BELIEF —{' '}
          <a href="https://brandmediagroup.co" style={{ color:G }}>BRANDMEDIAGROUP.CO</a>
        </p>
      </footer>
    </div>
  )
}
