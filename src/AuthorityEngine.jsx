import { useState, useEffect, useReducer } from 'react'

const SIGNALS = [
  { id:1, day:'Monday',    name:'DISCIPLINE',       color:'#2563EB', bg:'#EFF6FF', tagline:'Foundation of belief — structure over chaos.', behavior:'Research, planning, daily routines executed without shortcuts.', symbol:'Pen writing in a quiet workspace', phase:'Pre-production — research, script lock-in, project setup', principle:'Leaders who show up consistently earn trust before they earn attention.', outcome:'Projects launch on time with zero excuses.' },
  { id:2, day:'Tuesday',   name:'MOMENTUM',         color:'#EA580C', bg:'#FFF7ED', tagline:'Progress compounds through action.', behavior:'Rapid ideation, project starts, prototypes generated.', symbol:'Footsteps advancing forward', phase:'Concept development — storyboards, shot lists, creative direction locked', principle:'Momentum separates builders from dreamers.', outcome:'Concepts move from idea to direction within days, not weeks.' },
  { id:3, day:'Wednesday', name:'CRAFT',            color:'#059669', bg:'#ECFDF5', tagline:'Excellence through obsessive attention to detail.', behavior:'Production time, editing sessions, creative revisions. Every frame matters.', symbol:'Editing timeline on screen', phase:'Production — filming, editing, sound design, visual effects', principle:'Craft is the visible proof of invisible discipline.', outcome:'Deliverables exceed expectations because every detail is intentional.' },
  { id:4, day:'Thursday',  name:'CALM CONFIDENCE', color:'#7C3AED', bg:'#F5F3FF', tagline:'True authority moves with composure.', behavior:'Decision checkpoints, team collaboration, leadership under pressure.', symbol:'Steady breath — composed stillness', phase:'Direction and refinement — creative review, quality control', principle:'The leader who stays composed gives everyone else permission to do the same.', outcome:'Clients never experience chaos. Every interaction communicates control.' },
  { id:5, day:'Friday',    name:'VISION',           color:'#0891B2', bg:'#ECFEFF', tagline:'The ability to see what others cannot yet see.', behavior:'Narrative outlines, strategic planning, future-state mapping.', symbol:'City skyline at dawn', phase:'Narrative alignment — story arc review, messaging strategy', principle:'Vision is not prediction. It is the discipline of seeing clearly while others react.', outcome:'Clients get direction, not just content.' },
  { id:6, day:'Saturday',  name:'PROGRESS',         color:'#DC2626', bg:'#FEF2F2', tagline:'Small steps repeated daily create extraordinary outcomes.', behavior:'Revisions completed, performance improvements measured, systems refined.', symbol:'Notebook pages filling up', phase:'Iteration and improvement — A/B testing, analytics review', principle:'Progress is proof. It converts belief from philosophy into results.', outcome:'Measurable improvement on every cycle. Compounding returns over time.' },
  { id:7, day:'Sunday',    name:'AUTHORITY',        color:'#D97706', bg:'#FFFBEB', tagline:'Leadership earned through execution and results.', behavior:'Project releases, content publication, audience reach expansion.', symbol:'Closing a presentation with conviction', phase:'Release and impact — final delivery, launch, distribution', principle:'Authority feeds the next cycle of Discipline. The loop never stops.', outcome:'Finished work becomes proof that the belief-driven approach works.' }
]

const CLIP_TYPES = ['Offer/Promo','Brand Presence','Booking Promo','Recruitment Ad','Testimonial','Educational']
const PLATFORMS  = ['Instagram Reels','TikTok','YouTube Shorts','Facebook','LinkedIn','X/Twitter']

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
    case 'LOAD':       return { ...state, ...action.payload }
    case 'ONBOARD':    return { ...state, businessName:action.name, businessType:action.btype, email:action.email, onboarded:true }
    case 'ADD_CLIP': {
      const newCounts = { ...state.signalCounts, [action.clip.signalId]:(state.signalCounts[action.clip.signalId]||0)+1 }
      return { ...state, clips:[action.clip,...state.clips], signalCounts:newCounts }
    }
    case 'REMOVE_CLIP': return { ...state, clips:state.clips.filter(c=>c.id!==action.id) }
    case 'RESET':       return INITIAL_STATE
    default:            return state
  }
}

// ── DESIGN TOKENS ────────────────────────────────────────────
const BLUE   = '#2563EB'
const BG     = '#FFFFFF'
const SURFACE= '#F8FAFC'
const BORDER = '#E2E8F0'
const TEXT   = '#0F172A'
const MUTED  = '#64748B'
const LIGHT  = '#CBD5E1'

const s = {
  app: {
    minHeight: '100vh',
    background: SURFACE,
    color: TEXT,
    fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif"
  },
  nav: {
    background: BG,
    borderBottom: `1px solid ${BORDER}`,
    padding: '0 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 1px 8px rgba(0,0,0,0.06)'
  },
  navLogo: {
    fontSize: 13,
    letterSpacing: 3,
    color: BLUE,
    fontWeight: 800
  },
  main: { maxWidth: 960, margin: '0 auto', padding: '32px 24px' },

  card: {
    background: BG,
    border: `1px solid ${BORDER}`,
    borderRadius: 14,
    padding: 24,
    marginBottom: 20,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
  },
  heroCard: {
    background: 'linear-gradient(135deg, #1D4ED8 0%, #0891B2 100%)',
    borderRadius: 18,
    padding: 36,
    marginBottom: 24,
    color: '#FFFFFF'
  },

  label: {
    display: 'block',
    fontSize: 11,
    letterSpacing: 2,
    color: MUTED,
    marginBottom: 8,
    textTransform: 'uppercase',
    fontWeight: 600
  },
  input: {
    width: '100%',
    background: SURFACE,
    border: `1.5px solid ${BORDER}`,
    borderRadius: 10,
    padding: '13px 16px',
    color: TEXT,
    fontSize: 15,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  inputError: {
    width: '100%',
    background: '#FEF2F2',
    border: '1.5px solid #EF4444',
    borderRadius: 10,
    padding: '13px 16px',
    color: TEXT,
    fontSize: 15,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    outline: 'none'
  },
  textarea: {
    width: '100%',
    background: SURFACE,
    border: `1.5px solid ${BORDER}`,
    borderRadius: 10,
    padding: '13px 16px',
    color: TEXT,
    fontSize: 14,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    outline: 'none',
    resize: 'vertical',
    minHeight: 100
  },

  btn: (variant='primary', disabled=false) => ({
    padding: variant==='sm' ? '8px 16px' : '13px 26px',
    borderRadius: 10,
    border: variant==='outline' ? `1.5px solid ${BLUE}` : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontSize: variant==='sm' ? 11 : 13,
    letterSpacing: 0.5,
    fontFamily: 'inherit',
    fontWeight: 700,
    background: disabled ? '#E2E8F0'
      : variant==='primary' ? BLUE
      : variant==='outline' ? 'transparent'
      : SURFACE,
    color: disabled ? LIGHT
      : variant==='primary' ? '#FFFFFF'
      : variant==='outline' ? BLUE
      : MUTED,
    opacity: disabled ? 0.7 : 1,
    transition: 'all 0.18s',
    boxShadow: variant==='primary' && !disabled ? '0 2px 8px rgba(37,99,235,0.25)' : 'none'
  }),

  tag: {
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: 20,
    background: '#EFF6FF',
    border: `1px solid #BFDBFE`,
    fontSize: 11,
    color: BLUE,
    marginRight: 6,
    marginBottom: 4,
    fontWeight: 600
  },

  signalChip: (active, color, bg) => ({
    padding: '12px 14px',
    borderRadius: 12,
    cursor: 'pointer',
    border: active ? `2px solid ${color}` : `1.5px solid ${BORDER}`,
    background: active ? bg : BG,
    transition: 'all 0.18s',
    textAlign: 'center',
    boxShadow: active ? `0 2px 8px ${color}30` : '0 1px 3px rgba(0,0,0,0.04)'
  }),

  bar: (pct, color) => ({
    height: 7,
    borderRadius: 4,
    background: `linear-gradient(90deg, ${color} ${pct}%, ${BORDER} ${pct}%)`,
    marginTop: 6
  }),

  tab: (active) => ({
    padding: '8px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontSize: 12,
    letterSpacing: 1,
    fontFamily: 'inherit',
    fontWeight: 700,
    background: active ? BLUE : 'transparent',
    color: active ? '#FFFFFF' : MUTED,
    transition: 'all 0.18s'
  }),
}

// ── LANDING PAGE ─────────────────────────────────────────────
function Landing({ onStart }) {
  const today = getTodaySignal()
  const features = [
    { icon:'⚡', title:'60-Second Brief', desc:'Select your signal, choose your content type, get a complete production brief instantly.' },
    { icon:'📋', title:'Hook + Script + Visuals', desc:'Every brief includes your hook, voiceover script, visual direction, caption, and CTA.' },
    { icon:'📱', title:'Platform-Ready', desc:'Formatted for TikTok, Instagram, LinkedIn, YouTube Shorts, and Facebook.' },
    { icon:'🎯', title:'7-Signal Framework', desc:"Built on Brand Media Group's Seven Signals Method™ — the belief-driven content system." },
  ]
  return (
    <div style={{ minHeight:'100vh', background:'#F8FAFC' }}>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navLogo}>BMG AUTHORITY ENGINE™</div>
        <a href="https://brandmediagroup.co" target="_blank" rel="noreferrer"
          style={{ fontSize:12, letterSpacing:1, color:MUTED, textDecoration:'none', fontWeight:600 }}>
          brandmediagroup.co
        </a>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth:800, margin:'0 auto', padding:'80px 24px 60px', textAlign:'center' }}>
        <div style={{ display:'inline-block', padding:'6px 20px', borderRadius:20, background:'#EFF6FF', border:`1px solid #BFDBFE`, fontSize:11, letterSpacing:3, color:BLUE, marginBottom:32, fontWeight:700 }}>
          FREE CONTENT BRIEF GENERATOR
        </div>
        <h1 style={{ fontSize:54, fontWeight:800, color:TEXT, lineHeight:1.1, marginBottom:20, letterSpacing:-1 }}>
          Generate your<br/><span style={{ color:BLUE }}>7-Signal content brief</span><br/>in 60 seconds.
        </h1>
        <p style={{ fontSize:18, color:MUTED, lineHeight:1.7, marginBottom:16, maxWidth:560, margin:'0 auto 16px' }}>
          Tell us your business. Pick your signal. Get a complete production brief — hook, script, visual direction, caption, and CTA — ready to hand to any video tool.
        </p>
        <p style={{ fontSize:14, color:LIGHT, marginBottom:48, fontWeight:500 }}>
          Free. No account. No pitch. Just a brief that works.
        </p>
        <button
          style={{ ...s.btn('primary'), padding:'18px 52px', fontSize:16, letterSpacing:1, borderRadius:12, boxShadow:'0 4px 20px rgba(37,99,235,0.30)' }}
          onClick={onStart}>
          GET MY FREE BRIEF →
        </button>
        <p style={{ fontSize:12, color:LIGHT, marginTop:20, letterSpacing:1 }}>
          Used by sports, entertainment, fashion, and AI ops brands
        </p>
      </div>

      {/* TODAY'S SIGNAL BANNER */}
      <div style={{ maxWidth:800, margin:'0 auto 60px', padding:'0 24px' }}>
        <div style={{ background:today.bg, border:`1.5px solid ${today.color}30`, borderRadius:16, padding:'22px 28px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, boxShadow:`0 2px 12px ${today.color}15` }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:3, color:MUTED, marginBottom:6, fontWeight:600 }}>TODAY — {getDayName().toUpperCase()}</div>
            <div style={{ fontSize:20, color:today.color, fontWeight:800, letterSpacing:0.5 }}>Signal {today.id}: {today.name}</div>
            <div style={{ fontSize:14, color:MUTED, marginTop:5 }}>{today.tagline}</div>
          </div>
          <button style={{ ...s.btn('outline'), padding:'10px 22px', fontSize:12, borderColor:today.color, color:today.color }} onClick={onStart}>
            Create today's brief →
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ maxWidth:800, margin:'0 auto 60px', padding:'0 24px' }}>
        <div style={{ textAlign:'center', fontSize:11, letterSpacing:3, color:MUTED, marginBottom:32, fontWeight:700 }}>WHAT YOU GET</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {features.map((f,i) => (
            <div key={i} style={{ ...s.card, transition:'transform 0.2s' }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
              <div style={{ fontSize:15, color:TEXT, fontWeight:700, marginBottom:8 }}>{f.title}</div>
              <div style={{ fontSize:13, color:MUTED, lineHeight:1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SIGNALS PREVIEW */}
      <div style={{ maxWidth:800, margin:'0 auto 60px', padding:'0 24px' }}>
        <div style={{ textAlign:'center', fontSize:11, letterSpacing:3, color:MUTED, marginBottom:24, fontWeight:700 }}>THE 7 SIGNALS</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {SIGNALS.map(sig => (
            <div key={sig.id} style={{ ...s.card, padding:'16px 20px', marginBottom:0, display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:sig.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:13, color:sig.color, fontWeight:800 }}>{sig.id}</span>
              </div>
              <div>
                <div style={{ fontSize:13, color:TEXT, fontWeight:700, letterSpacing:0.5, marginBottom:2 }}>{sig.name}</div>
                <div style={{ fontSize:11, color:MUTED }}>{sig.day}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM CTA */}
      <div style={{ maxWidth:800, margin:'0 auto', padding:'0 24px 80px', textAlign:'center' }}>
        <div style={{ background:'linear-gradient(135deg, #1D4ED8 0%, #0891B2 100%)', borderRadius:20, padding:'52px 32px', boxShadow:'0 8px 32px rgba(37,99,235,0.25)' }}>
          <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,255,255,0.6)', marginBottom:16, fontWeight:700 }}>READY?</div>
          <h2 style={{ fontSize:32, color:'#FFFFFF', fontWeight:800, marginBottom:12, letterSpacing:-0.5 }}>Your first brief takes 60 seconds.</h2>
          <p style={{ color:'rgba(255,255,255,0.7)', fontSize:15, marginBottom:36 }}>No signup required. No credit card. Just your business name and one click.</p>
          <button
            style={{ background:'#FFFFFF', color:BLUE, border:'none', borderRadius:12, padding:'16px 48px', fontSize:15, letterSpacing:1, fontWeight:800, cursor:'pointer', boxShadow:'0 4px 16px rgba(0,0,0,0.15)' }}
            onClick={onStart}>
            START NOW →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop:`1px solid ${BORDER}`, padding:'28px 24px', textAlign:'center', background:BG }}>
        <p style={{ color:LIGHT, fontSize:11, letterSpacing:2, margin:0, fontWeight:600 }}>
          BRAND MEDIA GROUP — EVERY PROJECT BEGINS WITH BELIEF —{' '}
          <a href="https://brandmediagroup.co" style={{ color:BLUE, textDecoration:'none' }}>BRANDMEDIAGROUP.CO</a>
        </p>
      </div>
    </div>
  )
}

// ── ZAPIER WEBHOOK ───────────────────────────────────────────
const ZAPIER_WEBHOOK = 'https://hooks.zapier.com/hooks/catch/REPLACE_WITH_YOUR_ZAP_ID'

// ── ONBOARDING ───────────────────────────────────────────────
function Onboarding({ dispatch, onBack }) {
  const [name,   setName]   = useState('')
  const [btype,  setBtype]  = useState('')
  const [email,  setEmail]  = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!name.trim())                        e.name  = true
    if (!btype.trim())                       e.btype = true
    if (!email.trim() || !email.includes('@')) e.email = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = () => {
    if (validate()) {
      fetch(ZAPIER_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(), email: email.trim(),
          businessType: btype.trim(),
          source: 'Authority Engine',
          date: new Date().toISOString()
        })
      }).catch(() => {})
      dispatch({ type:'ONBOARD', name:name.trim(), btype:btype.trim(), email:email.trim() })
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:SURFACE, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ maxWidth:480, width:'100%' }}>
        <button onClick={onBack} style={{ background:'none', border:'none', color:MUTED, cursor:'pointer', fontSize:13, marginBottom:32, padding:0, fontWeight:600, display:'flex', alignItems:'center', gap:6 }}>
          ← Back
        </button>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:56, height:56, borderRadius:16, background:'#EFF6FF', marginBottom:20 }}>
            <span style={{ fontSize:26 }}>⚡</span>
          </div>
          <div style={{ fontSize:11, letterSpacing:4, color:BLUE, marginBottom:12, fontWeight:700 }}>BRAND MEDIA GROUP</div>
          <h1 style={{ fontSize:34, color:TEXT, fontWeight:800, marginBottom:10, letterSpacing:-0.5 }}>Authority Engine™</h1>
          <p style={{ color:MUTED, fontSize:15, lineHeight:1.65 }}>Tell us about your business and we'll generate a complete content brief built around your Seven Signal.</p>
        </div>

        {/* Form Card */}
        <div style={{ ...s.card, padding:32 }}>
          <label style={s.label}>Your Business Name</label>
          <input
            style={{ ...(errors.name ? s.inputError : s.input), marginBottom: errors.name ? 4 : 20 }}
            value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Brand Media Group"
          />
          {errors.name && <p style={{ color:'#EF4444', fontSize:12, marginBottom:16, marginTop:0, fontWeight:600 }}>Required</p>}

          <label style={s.label}>Business Type / Industry</label>
          <input
            style={{ ...(errors.btype ? s.inputError : s.input), marginBottom: errors.btype ? 4 : 20 }}
            value={btype} onChange={e => setBtype(e.target.value)}
            placeholder="e.g. Insurance Agency, Real Estate, Marketing, Restaurant"
          />
          {errors.btype && <p style={{ color:'#EF4444', fontSize:12, marginBottom:16, marginTop:0, fontWeight:600 }}>Required</p>}

          <label style={s.label}>Your Email (we'll send your brief)</label>
          <input
            style={{ ...(errors.email ? s.inputError : s.input), marginBottom: errors.email ? 4 : 28 }}
            value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@yourbusiness.com" type="email"
          />
          {errors.email && <p style={{ color:'#EF4444', fontSize:12, marginBottom:20, marginTop:0, fontWeight:600 }}>Valid email required</p>}

          <button
            style={{ ...s.btn('primary'), width:'100%', padding:'15px 0', fontSize:14, letterSpacing:1, borderRadius:11 }}
            onClick={submit}>
            ENTER THE ENGINE →
          </button>
        </div>

        <p style={{ textAlign:'center', color:LIGHT, fontSize:12, marginTop:16, lineHeight:1.6 }}>
          We may follow up to offer a free AI Ops Audit.<br/>No spam. Unsubscribe any time.
        </p>
        <p style={{ textAlign:'center', color:LIGHT, fontSize:11, marginTop:8, fontWeight:600, letterSpacing:1 }}>
          Every Project Begins With Belief. Signal On.
        </p>
      </div>
    </div>
  )
}

// ── DASHBOARD ────────────────────────────────────────────────
function Dashboard({ state, setTab }) {
  const today      = getTodaySignal()
  const totalClips = state.clips.length
  const maxCount   = Math.max(...Object.values(state.signalCounts), 1)
  return (
    <div>
      {/* Hero greeting card */}
      <div style={s.heroCard}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:20 }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:3, color:'rgba(255,255,255,0.6)', marginBottom:10, fontWeight:700 }}>TODAY — {getDayName().toUpperCase()}</div>
            <h1 style={{ fontSize:30, color:'#FFFFFF', fontWeight:800, marginBottom:6, letterSpacing:-0.5 }}>{getGreeting()}, {state.businessName}.</h1>
            <p style={{ color:'rgba(255,255,255,0.75)', fontSize:15, margin:0 }}>
              Today's signal is <strong style={{ color:'#FFFFFF' }}>{today.name}</strong> — {today.tagline}
            </p>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:42, color:'#FFFFFF', fontWeight:800, lineHeight:1 }}>{totalClips}</div>
            <div style={{ fontSize:11, letterSpacing:2, color:'rgba(255,255,255,0.6)', fontWeight:700 }}>BRIEFS CREATED</div>
          </div>
        </div>
        <div style={{ marginTop:22, padding:'16px 20px', background:'rgba(255,255,255,0.12)', borderRadius:10, backdropFilter:'blur(4px)' }}>
          <div style={{ fontSize:11, letterSpacing:2, color:'rgba(255,255,255,0.6)', marginBottom:6, fontWeight:700 }}>TODAY'S PRODUCTION PHASE</div>
          <div style={{ color:'#FFFFFF', fontSize:14, fontWeight:600 }}>{today.phase}</div>
          <div style={{ color:'rgba(255,255,255,0.7)', fontSize:13, marginTop:4, fontStyle:'italic' }}>"{today.principle}"</div>
        </div>
        <button
          style={{ background:'#FFFFFF', color:BLUE, border:'none', borderRadius:10, padding:'12px 26px', fontSize:13, letterSpacing:0.5, fontWeight:800, cursor:'pointer', marginTop:22, boxShadow:'0 2px 8px rgba(0,0,0,0.12)' }}
          onClick={() => setTab('CREATE')}>
          CREATE TODAY'S BRIEF →
        </button>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        {/* Signal Usage */}
        <div style={s.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:MUTED, marginBottom:18, fontWeight:700 }}>SIGNAL USAGE</div>
          {SIGNALS.map(sig => {
            const count = state.signalCounts[sig.id] || 0
            const pct   = Math.round((count / maxCount) * 100)
            return (
              <div key={sig.id} style={{ marginBottom:13 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12 }}>
                  <span style={{ color:MUTED, fontWeight:600 }}>{sig.name}</span>
                  <span style={{ color:sig.color, fontWeight:700 }}>{count}</span>
                </div>
                <div style={s.bar(pct, sig.color)} />
              </div>
            )
          })}
        </div>

        {/* This week */}
        <div style={s.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:MUTED, marginBottom:18, fontWeight:700 }}>THIS WEEK'S SIGNALS</div>
          {SIGNALS.map(sig => (
            <div key={sig.id} style={{ padding:'9px 0', borderBottom:`1px solid ${BORDER}`, display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:sig.color, flexShrink:0 }} />
              <div>
                <span style={{ fontSize:12, color:TEXT, fontWeight:600 }}>{sig.day} — </span>
                <span style={{ fontSize:12, color:sig.color, fontWeight:700 }}>{sig.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit CTA Card */}
      <div style={{ background:'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)', border:`none`, borderRadius:16, padding:32, marginBottom:20, textAlign:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.12)' }}>
        <div style={{ fontSize:11, letterSpacing:3, color:'#7DD3FC', marginBottom:12, fontWeight:700 }}>WANT BMG TO RUN THIS FOR YOU?</div>
        <h3 style={{ fontSize:22, color:'#FFFFFF', fontWeight:800, marginBottom:10, letterSpacing:-0.3 }}>Book your free AI Ops Audit.</h3>
        <p style={{ color:'rgba(255,255,255,0.7)', fontSize:14, lineHeight:1.7, marginBottom:24, maxWidth:480, margin:'0 auto 24px' }}>
          We'll review your current workflow and show you exactly what an AI-powered operations system would look like for your specific business. 15 minutes. No pitch. Just signal.
        </p>
        <a href="https://brandmediagroup.co" target="_blank" rel="noreferrer"
          style={{ background:BLUE, color:'#FFFFFF', textDecoration:'none', display:'inline-block', borderRadius:10, padding:'13px 32px', fontSize:13, letterSpacing:0.5, fontWeight:800, boxShadow:'0 2px 12px rgba(37,99,235,0.35)' }}>
          BOOK FREE AUDIT → brandmediagroup.co
        </a>
      </div>
    </div>
  )
}

// ── GENERATOR ────────────────────────────────────────────────
function Generator({ state, dispatch }) {
  const [step,           setStep]           = useState(1)
  const [selectedSignal, setSelectedSignal] = useState(null)
  const [clipType,       setClipType]       = useState('')
  const [title,          setTitle]          = useState('')
  const [topic,          setTopic]          = useState('')
  const [platforms,      setPlatforms]      = useState([])
  const [generating,     setGenerating]     = useState(false)
  const [result,         setResult]         = useState(null)
  const [shakeNext,      setShakeNext]      = useState(false)

  const nudge = () => { setShakeNext(true); setTimeout(()=>setShakeNext(false), 600) }
  const handleNext1 = () => { if (selectedSignal) setStep(2); else nudge() }
  const handleNext2 = () => { if (clipType)       setStep(3); else nudge() }
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
          visuals:`${sig.symbol}. Cinematic shot — minimal movement, dramatic lighting. Text overlay: "${sig.name}" fades in center frame. End tag: "${state.businessName}. Every Project Begins With Belief."`,
          caption:`${sig.tagline}\n\nAt ${state.businessName}, this is how we operate. Not inspiration — infrastructure.\n\n${platforms.map(p=>`#${p.replace('/','').replace(/ /g,'')}`).join(' ')} #SignalOn #${sig.name.replace(/ /g,'')}`,
          cta:`DM "AUDIT" to book your free 15-minute AI Ops review.`
        },
        'Brand Presence': {
          hook:`${sig.name}. Signal ${sig.id} of 7.`,
          voiceover:`${sig.tagline} At ${state.businessName}, ${sig.behavior.toLowerCase()} This is the ${sig.phase.toLowerCase()}. ${sig.principle}`,
          visuals:`Symbol: ${sig.symbol}. 8–10 second cinematic clip. Slow push-in. Minimal motion. Text: "${sig.name}" — centered. End card: "${state.businessName}. Signal On."`,
          caption:`${sig.tagline}\n\n${sig.behavior}\n\nSignal ${sig.id} of the Seven Signals Method™ by ${state.businessName}.\n\n#SevenSignals #${sig.name.replace(/ /g,'')} #SignalOn #BrandMediaGroup`,
          cta:`Follow for all 7 signals this week.`
        },
        'Booking Promo': {
          hook:`Spots are limited. Here's what you get when you book.`,
          voiceover:`${state.businessName} is taking on ${state.businessType} clients who are ready to build real infrastructure. Signal ${sig.id}: ${sig.name}. ${sig.outcome} Book your free audit at brandmediagroup.co.`,
          visuals:`Calendar or scheduling interface with accent highlight. Close-up of confirmation screen. Text: "Book Now." Cinematic, minimal.`,
          caption:`We're running free AI Ops Audits for ${state.businessType} businesses this month.\n\n15 minutes. We look at your workflow. You leave with a clear picture of what AI changes for you.\n\nNo pitch. Just signal.\n\nLink in bio → brandmediagroup.co\n\n#FreeAudit #AIops #${state.businessType.replace(/ /g,'')}`,
          cta:`Book your free audit → brandmediagroup.co`
        },
        'Recruitment Ad': {
          hook:`We're building something real. We need people who move with intention.`,
          voiceover:`${state.businessName} operates on the Seven Signals Method™. Every role here runs on ${sig.name.toLowerCase()}. ${sig.tagline} If that's how you work, we should talk.`,
          visuals:`Office or workspace with intentional energy. Desks, screens, motion. Text: "${sig.name}". End: "${state.businessName} is hiring." Cinematic.`,
          caption:`${state.businessName} is growing.\n\nWe need people who operate on ${sig.name.toLowerCase()}. ${sig.tagline}\n\n${sig.principle}\n\nDM us to learn more.\n\n#Hiring #${sig.name.replace(/ /g,'')} #SignalOn`,
          cta:`DM "JOIN" to start the conversation.`
        },
        'Testimonial': {
          hook:`Here's what changed when they stopped guessing.`,
          voiceover:`Before ${state.businessName}, [Client Name] was [describe the problem]. After building their system on Signal ${sig.id}: ${sig.name}, [describe the result]. ${sig.outcome} This is what belief-driven infrastructure looks like.`,
          visuals:`Client b-roll or testimonial interview. Cut to results — analytics, screens, moments of clarity. Text overlay: "[Key result]". Professional, grounded.`,
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
      setResult({ id:Date.now().toString(), title, topic, signalId:sig.id, signalName:sig.name, clipType, platforms, date:new Date().toLocaleDateString(), ...template })
      setGenerating(false)
    }, 1800)
  }

  const save = () => {
    dispatch({ type:'ADD_CLIP', clip:result })
    setStep(1); setSelectedSignal(null); setClipType(''); setTitle(''); setTopic(''); setPlatforms([]); setResult(null)
  }

  // ── RESULT VIEW ──
  if (result) return (
    <div>
      <div style={{ ...s.card, borderLeft:`4px solid #22C55E`, background:'#F0FDF4', borderColor:'#22C55E' }}>
        <div style={{ fontSize:11, letterSpacing:3, color:'#16A34A', marginBottom:8, fontWeight:700 }}>✓ BRIEF GENERATED</div>
        <h2 style={{ fontSize:22, color:TEXT, fontWeight:800, marginBottom:10 }}>{result.title}</h2>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <span style={{ ...s.tag, background:SIGNALS.find(s=>s.id===result.signalId)?.bg, borderColor:`${SIGNALS.find(s=>s.id===result.signalId)?.color}40`, color:SIGNALS.find(s=>s.id===result.signalId)?.color }}>Signal {result.signalId}: {result.signalName}</span>
          <span style={s.tag}>{result.clipType}</span>
          {result.platforms.map(p=><span key={p} style={s.tag}>{p}</span>)}
        </div>
      </div>

      {[['🎯 HOOK',result.hook],['🎙 VOICEOVER / SCRIPT',result.voiceover],['🎬 VISUAL DIRECTION',result.visuals],['📝 CAPTION',result.caption],['📣 CTA',result.cta]].map(([label,text])=>(
        <div key={label} style={s.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:MUTED, marginBottom:10, fontWeight:700 }}>{label}</div>
          <p style={{ color:TEXT, fontSize:14, lineHeight:1.75, margin:0, whiteSpace:'pre-line' }}>{text}</p>
        </div>
      ))}

      <div style={{ display:'flex', gap:12, marginBottom:32, flexWrap:'wrap' }}>
        <button style={s.btn('primary')} onClick={save}>SAVE TO LIBRARY</button>
        <button style={s.btn('outline')} onClick={()=>setResult(null)}>REGENERATE</button>
      </div>

      {/* Post-generation CTA */}
      <div style={{ background:'linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)', borderRadius:16, padding:36, textAlign:'center', boxShadow:'0 4px 20px rgba(0,0,0,0.12)' }}>
        <div style={{ fontSize:11, letterSpacing:3, color:'#7DD3FC', marginBottom:12, fontWeight:700 }}>WANT BMG TO BUILD AND RUN THIS FOR YOU?</div>
        <h3 style={{ fontSize:24, color:'#FFFFFF', fontWeight:800, marginBottom:10, letterSpacing:-0.3 }}>You just generated one brief.<br/>We automate this for your entire business.</h3>
        <p style={{ color:'rgba(255,255,255,0.7)', fontSize:14, lineHeight:1.7, marginBottom:28, maxWidth:520, margin:'0 auto 28px' }}>
          Book a free 15-minute AI Ops Audit. We'll review your workflow and show you what a fully automated content and operations system looks like for <strong style={{color:'#FFFFFF'}}>{state.businessName}</strong>. No pitch. Just signal.
        </p>
        <a href="https://brandmediagroup.co" target="_blank" rel="noreferrer"
          style={{ background:BLUE, color:'#FFFFFF', textDecoration:'none', display:'inline-block', borderRadius:10, padding:'15px 40px', fontSize:14, letterSpacing:0.5, fontWeight:800, boxShadow:'0 4px 16px rgba(37,99,235,0.40)' }}>
          BOOK FREE AUDIT → BRANDMEDIAGROUP.CO
        </a>
        <p style={{ color:'rgba(255,255,255,0.4)', fontSize:11, marginTop:16 }}>15 minutes. Free. No obligation.</p>
      </div>
    </div>
  )

  // ── STEP INDICATOR ──
  const StepBar = () => (
    <div style={{ display:'flex', gap:8, marginBottom:28, alignItems:'center' }}>
      {[1,2,3].map(n => (
        <div key={n} style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, background:step>=n ? BLUE : BORDER, color:step>=n ? '#FFFFFF' : MUTED, transition:'all 0.3s', boxShadow:step>=n?`0 2px 8px ${BLUE}30`:'' }}>{n}</div>
          {n<3 && <div style={{ width:40, height:2, borderRadius:1, background:step>n ? BLUE : BORDER, transition:'all 0.3s' }} />}
        </div>
      ))}
      <span style={{ color:MUTED, fontSize:13, marginLeft:8, fontWeight:600 }}>
        {step===1?'Select Signal':step===2?'Choose Type':'Clip Details'}
      </span>
    </div>
  )

  return (
    <div>
      <StepBar />

      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:MUTED, marginBottom:20, fontWeight:700 }}>SELECT YOUR SIGNAL</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
            {SIGNALS.map(sig => {
              const isToday = sig.day === getDayName()
              const active  = selectedSignal?.id === sig.id
              return (
                <div key={sig.id}
                  style={{ ...s.signalChip(active, sig.color, sig.bg), position:'relative' }}
                  onClick={() => setSelectedSignal(sig)}>
                  {isToday && <div style={{ position:'absolute', top:8, right:10, fontSize:10, color:sig.color, fontWeight:700 }}>★ TODAY</div>}
                  <div style={{ fontSize:10, color:MUTED, marginBottom:5, fontWeight:600 }}>{sig.id} — {sig.day.toUpperCase()}</div>
                  <div style={{ fontSize:13, color:active ? sig.color : TEXT, letterSpacing:0.5, fontWeight:800 }}>{sig.name}</div>
                  <div style={{ fontSize:11, color:MUTED, marginTop:4 }}>{sig.symbol}</div>
                </div>
              )
            })}
          </div>
          {selectedSignal && (
            <div style={{ ...s.card, borderLeft:`4px solid ${selectedSignal.color}`, background:selectedSignal.bg, marginBottom:20 }}>
              <div style={{ fontSize:14, color:selectedSignal.color, marginBottom:6, fontWeight:800 }}>{selectedSignal.name}</div>
              <p style={{ color:MUTED, fontSize:13, lineHeight:1.65, margin:0 }}>
                {selectedSignal.tagline}<br/>
                <em style={{fontSize:12, marginTop:8, display:'block', color:selectedSignal.color}}>"{selectedSignal.principle}"</em>
              </p>
            </div>
          )}
          {shakeNext && !selectedSignal && (
            <p style={{ color:'#EF4444', fontSize:12, marginBottom:12, fontWeight:600 }}>↑ Select a signal to continue</p>
          )}
          <button style={s.btn('primary', !selectedSignal)} onClick={handleNext1}>
            NEXT: CHOOSE TYPE →
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:MUTED, marginBottom:20, fontWeight:700 }}>SELECT CLIP TYPE</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:16 }}>
            {CLIP_TYPES.map(t => (
              <div key={t} style={s.signalChip(clipType===t, BLUE, '#EFF6FF')} onClick={() => setClipType(t)}>
                <div style={{ fontSize:13, color:clipType===t ? BLUE : TEXT, fontWeight:clipType===t?700:500 }}>{t}</div>
              </div>
            ))}
          </div>
          {shakeNext && !clipType && (
            <p style={{ color:'#EF4444', fontSize:12, marginBottom:12, fontWeight:600 }}>↑ Select a clip type to continue</p>
          )}
          <div style={{ display:'flex', gap:12, marginTop:16 }}>
            <button style={s.btn('ghost')} onClick={() => setStep(1)}>← BACK</button>
            <button style={s.btn('primary', !clipType)} onClick={handleNext2}>NEXT: DETAILS →</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:MUTED, marginBottom:20, fontWeight:700 }}>CLIP DETAILS</div>
          <label style={s.label}>Clip Title</label>
          <input style={{...s.input, marginBottom:20}} value={title} onChange={e=>setTitle(e.target.value)}
            placeholder={`e.g. ${selectedSignal?.name} — ${state.businessName}`} />
          <label style={s.label}>Topic / Context (optional)</label>
          <textarea style={{...s.textarea, marginBottom:20}} value={topic} onChange={e=>setTopic(e.target.value)}
            placeholder="Any specific message, offer, or context to weave in..." />
          <label style={s.label}>Target Platforms</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
            {PLATFORMS.map(p => (
              <div key={p} style={{ ...s.signalChip(platforms.includes(p), BLUE, '#EFF6FF'), padding:'9px 16px' }} onClick={()=>togglePlatform(p)}>
                <span style={{ fontSize:12, color:platforms.includes(p) ? BLUE : MUTED, fontWeight:platforms.includes(p)?700:500 }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button style={s.btn('ghost')} onClick={()=>setStep(2)}>← BACK</button>
            <button
              style={{ ...s.btn('primary', !title||generating), minWidth:190 }}
              onClick={() => !generating && generate()}
              disabled={!title||generating}>
              {generating ? '⟳  GENERATING...' : 'GENERATE BRIEF →'}
            </button>
          </div>
          {generating && (
            <div style={{ marginTop:24, padding:20, background:'#EFF6FF', borderRadius:12, border:`1px solid #BFDBFE` }}>
              <div style={{ fontSize:12, color:BLUE, letterSpacing:2, marginBottom:8, fontWeight:700 }}>BUILDING YOUR BRIEF...</div>
              <div style={{ fontSize:13, color:MUTED }}>Applying Signal {selectedSignal?.id}: {selectedSignal?.name} to your {state.businessType} brief.</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── LIBRARY ──────────────────────────────────────────────────
function Library({ state, dispatch }) {
  const [filter,   setFilter]   = useState('ALL')
  const [expanded, setExpanded] = useState(null)
  const filtered = filter==='ALL' ? state.clips : state.clips.filter(c=>c.signalName===filter)
  return (
    <div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
        {['ALL',...SIGNALS.map(sig=>sig.name)].map(f=>(
          <button key={f}
            style={{ padding:'7px 16px', borderRadius:8, border:`1.5px solid ${filter===f?BLUE:BORDER}`, cursor:'pointer', fontSize:11, fontFamily:'inherit', fontWeight:700, background:filter===f?BLUE:BG, color:filter===f?'#FFFFFF':MUTED, transition:'all 0.18s' }}
            onClick={()=>setFilter(f)}>{f}</button>
        ))}
      </div>
      {filtered.length===0 ? (
        <div style={{ ...s.card, textAlign:'center', padding:48 }}>
          <div style={{ fontSize:32, marginBottom:12 }}>📋</div>
          <p style={{ color:MUTED, fontSize:15, fontWeight:500 }}>No briefs yet. Head to CREATE to generate your first one.</p>
        </div>
      ) : filtered.map(c => {
        const sig = SIGNALS.find(sg=>sg.id===c.signalId)
        return (
          <div key={c.id} style={s.card}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }} onClick={()=>setExpanded(expanded===c.id?null:c.id)}>
              <div>
                <div style={{ fontSize:15, color:TEXT, marginBottom:7, fontWeight:700 }}>{c.title}</div>
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  <span style={{ ...s.tag, background:sig?.bg, borderColor:`${sig?.color}40`, color:sig?.color }}>{c.signalName}</span>
                  <span style={s.tag}>{c.clipType}</span>
                  <span style={s.tag}>{c.date}</span>
                </div>
              </div>
              <span style={{ color:MUTED, fontSize:20, fontWeight:700 }}>{expanded===c.id?'−':'+'}</span>
            </div>
            {expanded===c.id && (
              <div style={{ marginTop:20, paddingTop:20, borderTop:`1px solid ${BORDER}` }}>
                {[['HOOK',c.hook],['VOICEOVER',c.voiceover],['VISUALS',c.visuals],['CAPTION',c.caption],['CTA',c.cta]].map(([l,t])=>(
                  <div key={l} style={{ marginBottom:18 }}>
                    <div style={{ fontSize:10, letterSpacing:2, color:MUTED, marginBottom:6, fontWeight:700 }}>{l}</div>
                    <p style={{ color:TEXT, fontSize:14, lineHeight:1.7, margin:0, whiteSpace:'pre-line' }}>{t}</p>
                  </div>
                ))}
                <button
                  style={{ padding:'7px 16px', borderRadius:8, border:`1.5px solid #FCA5A5`, cursor:'pointer', fontSize:11, fontFamily:'inherit', fontWeight:700, background:'#FEF2F2', color:'#DC2626', marginTop:8 }}
                  onClick={()=>dispatch({type:'REMOVE_CLIP',id:c.id})}>
                  REMOVE
                </button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── APP ROOT ─────────────────────────────────────────────────
export default function AuthorityEngine() {
  const [state,       dispatch]      = useReducer(reducer, INITIAL_STATE)
  const [tab,         setTab]        = useState('DASHBOARD')
  const [loaded,      setLoaded]     = useState(false)
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
    } catch(e) { setShowLanding(true) }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem('bmg-authority-engine', JSON.stringify(state)) } catch(e) {}
  }, [state, loaded])

  if (!loaded) return (
    <div style={{ minHeight:'100vh', background:SURFACE, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ color:BLUE, letterSpacing:3, fontSize:13, fontWeight:700 }}>LOADING...</div>
    </div>
  )

  if (showLanding && !state.onboarded) return <Landing onStart={()=>setShowLanding(false)} />
  if (!state.onboarded)                return <Onboarding dispatch={dispatch} onBack={()=>setShowLanding(true)} />

  return (
    <div style={s.app}>
      <nav style={s.nav}>
        <div style={s.navLogo}>BMG AUTHORITY ENGINE™</div>
        <div style={{ display:'flex', gap:4 }}>
          {['DASHBOARD','CREATE','LIBRARY'].map(t=>(
            <button key={t} style={s.tab(tab===t)} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </div>
        <div style={{ fontSize:11, color:MUTED, letterSpacing:1, fontWeight:700 }}>Signal On.</div>
      </nav>
      <main style={s.main}>
        {tab==='DASHBOARD' && <Dashboard state={state} setTab={setTab} />}
        {tab==='CREATE'    && <Generator state={state} dispatch={dispatch} />}
        {tab==='LIBRARY'   && <Library   state={state} dispatch={dispatch} />}
      </main>
      <footer style={{ borderTop:`1px solid ${BORDER}`, padding:'24px', textAlign:'center', background:BG }}>
        <p style={{ color:LIGHT, fontSize:11, letterSpacing:2, margin:0, fontWeight:600 }}>
          BRAND MEDIA GROUP — EVERY PROJECT BEGINS WITH BELIEF —{' '}
          <a href="https://brandmediagroup.co" style={{ color:BLUE, textDecoration:'none' }}>BRANDMEDIAGROUP.CO</a>
        </p>
      </footer>
    </div>
  )
}
