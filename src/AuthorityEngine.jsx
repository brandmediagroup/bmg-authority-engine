import { useState, useEffect, useReducer } from 'react'

const SIGNALS = [
  {
    id: 1, day: 'Monday', name: 'DISCIPLINE', color: '#C9A24A',
    tagline: 'Foundation of belief — structure over chaos.',
    behavior: 'Research, planning, daily routines executed without shortcuts.',
    symbol: 'Pen writing in a quiet workspace',
    phase: 'Pre-production — research, script lock-in, project setup',
    principle: 'Leaders who show up consistently earn trust before they earn attention.',
    outcome: 'Projects launch on time with zero excuses.'
  },
  {
    id: 2, day: 'Tuesday', name: 'MOMENTUM', color: '#E8B84B',
    tagline: 'Progress compounds through action.',
    behavior: 'Rapid ideation, project starts, prototypes generated.',
    symbol: 'Footsteps advancing forward',
    phase: 'Concept development — storyboards, shot lists, creative direction locked',
    principle: 'Momentum separates builders from dreamers.',
    outcome: 'Concepts move from idea to direction within days, not weeks.'
  },
  {
    id: 3, day: 'Wednesday', name: 'CRAFT', color: '#B8962E',
    tagline: 'Excellence through obsessive attention to detail.',
    behavior: 'Production time, editing sessions, creative revisions. Every frame matters.',
    symbol: 'Editing timeline on screen',
    phase: 'Production — filming, editing, sound design, visual effects',
    principle: 'Craft is the visible proof of invisible discipline.',
    outcome: 'Deliverables exceed expectations because every detail is intentional.'
  },
  {
    id: 4, day: 'Thursday', name: 'CALM CONFIDENCE', color: '#C9A24A',
    tagline: 'True authority moves with composure.',
    behavior: 'Decision checkpoints, team collaboration, leadership under pressure.',
    symbol: 'Steady breath — composed stillness',
    phase: 'Direction and refinement — creative review, quality control',
    principle: 'The leader who stays composed gives everyone else permission to do the same.',
    outcome: 'Clients never experience chaos. Every interaction communicates control.'
  },
  {
    id: 5, day: 'Friday', name: 'VISION', color: '#D4AF37',
    tagline: 'The ability to see what others cannot yet see.',
    behavior: 'Narrative outlines, strategic planning, future-state mapping.',
    symbol: 'City skyline at dawn',
    phase: 'Narrative alignment — story arc review, messaging strategy',
    principle: 'Vision is not prediction. It is the discipline of seeing clearly while others react.',
    outcome: 'Clients get direction, not just content.'
  },
  {
    id: 6, day: 'Saturday', name: 'PROGRESS', color: '#B8962E',
    tagline: 'Small steps repeated daily create extraordinary outcomes.',
    behavior: 'Revisions completed, performance improvements measured, systems refined.',
    symbol: 'Notebook pages filling up',
    phase: 'Iteration and improvement — A/B testing, analytics review',
    principle: 'Progress is proof. It converts belief from philosophy into results.',
    outcome: 'Measurable improvement on every cycle. Compounding returns over time.'
  },
  {
    id: 7, day: 'Sunday', name: 'AUTHORITY', color: '#C9A24A',
    tagline: 'Leadership earned through execution and results.',
    behavior: 'Project releases, content publication, audience reach expansion.',
    symbol: 'Closing a presentation with conviction',
    phase: 'Release and impact — final delivery, launch, distribution',
    principle: 'Authority feeds the next cycle of Discipline. The loop never stops.',
    outcome: 'Finished work becomes proof that the belief-driven approach works.'
  }
]

const CLIP_TYPES = ['Offer/Promo', 'Brand Presence', 'Booking Promo', 'Recruitment Ad', 'Testimonial', 'Educational']

const PLATFORMS = ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'Facebook', 'LinkedIn', 'X/Twitter']

function getTodaySignal() {
  const day = new Date().getDay()
  const map = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 }
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
  clips: [],
  businessName: '',
  businessType: '',
  monthlyGoal: 30,
  signalCounts: { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0 },
  onboarded: false
}

function reducer(state, action) {
  switch(action.type) {
    case 'LOAD': return { ...state, ...action.payload }
    case 'ONBOARD': return { ...state, businessName: action.name, businessType: action.btype, onboarded: true }
    case 'ADD_CLIP': {
      const newCounts = { ...state.signalCounts, [action.clip.signalId]: (state.signalCounts[action.clip.signalId]||0)+1 }
      return { ...state, clips: [action.clip, ...state.clips], signalCounts: newCounts }
    }
    case 'REMOVE_CLIP': return { ...state, clips: state.clips.filter(c => c.id !== action.id) }
    case 'RESET': return INITIAL_STATE
    default: return state
  }
}

const styles = {
  app: { minHeight: '100vh', background: '#0B0B0B', color: '#F5F0E8', fontFamily: "'Georgia', serif" },
  gold: '#C9A24A',
  nav: { background: '#0f0f0f', borderBottom: '1px solid #1a1a1a', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, position: 'sticky', top: 0, zIndex: 100 },
  navLogo: { fontSize: 13, letterSpacing: 3, color: '#C9A24A', fontFamily: 'Georgia, serif', fontWeight: 'bold' },
  navTabs: { display: 'flex', gap: 4 },
  tab: (active) => ({ padding: '8px 20px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, letterSpacing: 1, fontFamily: 'Georgia, serif', background: active ? '#C9A24A' : 'transparent', color: active ? '#0B0B0B' : '#888', transition: 'all 0.2s' }),
  main: { maxWidth: 960, margin: '0 auto', padding: '32px 24px' },
  card: { background: '#111', border: '1px solid #1e1e1e', borderRadius: 12, padding: 24, marginBottom: 20 },
  goldCard: { background: '#0f0e0a', border: '1px solid #2a2010', borderRadius: 12, padding: 24, marginBottom: 20 },
  h1: { fontSize: 28, color: '#F5F0E8', fontWeight: 'normal', marginBottom: 4 },
  h2: { fontSize: 18, color: '#C9A24A', letterSpacing: 2, fontWeight: 'normal', marginBottom: 16, fontSize: 13 },
  label: { display: 'block', fontSize: 11, letterSpacing: 2, color: '#666', marginBottom: 8, textTransform: 'uppercase' },
  input: { width: '100%', background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', color: '#F5F0E8', fontSize: 14, fontFamily: 'Georgia, serif', boxSizing: 'border-box', outline: 'none' },
  btn: (variant='primary') => ({
    padding: variant === 'sm' ? '8px 16px' : '12px 24px',
    borderRadius: 8,
    border: variant === 'outline' ? '1px solid #C9A24A' : 'none',
    cursor: 'pointer',
    fontSize: variant === 'sm' ? 11 : 13,
    letterSpacing: 1,
    fontFamily: 'Georgia, serif',
    background: variant === 'primary' ? '#C9A24A' : variant === 'outline' ? 'transparent' : '#1a1a1a',
    color: variant === 'primary' ? '#0B0B0B' : '#C9A24A',
    fontWeight: variant === 'primary' ? 'bold' : 'normal',
    transition: 'all 0.2s'
  }),
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 },
  signalChip: (active, color) => ({
    padding: '10px 14px', borderRadius: 8, cursor: 'pointer',
    border: active ? `1px solid ${color}` : '1px solid #1e1e1e',
    background: active ? '#0f0e0a' : '#0f0f0f',
    transition: 'all 0.2s', textAlign: 'center'
  }),
  bar: (pct, color) => ({
    height: 6, borderRadius: 3,
    background: `linear-gradient(90deg, ${color} ${pct}%, #1e1e1e ${pct}%)`,
    marginTop: 6
  }),
  tag: { display: 'inline-block', padding: '4px 10px', borderRadius: 20, background: '#1a1a1a', border: '1px solid #2a2a2a', fontSize: 11, color: '#888', marginRight: 6, marginBottom: 4 },
  textarea: { width: '100%', background: '#0f0f0f', border: '1px solid #2a2a2a', borderRadius: 8, padding: '12px 14px', color: '#F5F0E8', fontSize: 13, fontFamily: 'Georgia, serif', boxSizing: 'border-box', outline: 'none', resize: 'vertical', minHeight: 100 }
}

// ── Onboarding ─────────────────────────────────────────────
function Onboarding({ dispatch }) {
  const [name, setName] = useState('')
  const [btype, setBtype] = useState('')
  return (
    <div style={{ minHeight:'100vh', background:'#0B0B0B', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <div style={{ maxWidth:480, width:'100%' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ fontSize:11, letterSpacing:4, color:styles.gold, marginBottom:16 }}>BRAND MEDIA GROUP</div>
          <h1 style={{ fontSize:36, color:'#F5F0E8', fontWeight:'normal', marginBottom:12 }}>Authority Engine™</h1>
          <p style={{ color:'#666', fontSize:15, lineHeight:1.6 }}>Generate belief-driven content using the<br/>Seven Signals Method™</p>
        </div>
        <div style={styles.card}>
          <label style={styles.label}>Your Business Name</label>
          <input style={{...styles.input, marginBottom:20}} value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Brand Media Group" />
          <label style={styles.label}>Business Type / Industry</label>
          <input style={{...styles.input, marginBottom:28}} value={btype} onChange={e=>setBtype(e.target.value)} placeholder="e.g. Marketing Agency, Insurance, Real Estate" />
          <button style={{...styles.btn('primary'), width:'100%', padding:'14px 0'}}
            onClick={()=>{ if(name&&btype) dispatch({type:'ONBOARD',name,btype}) }}>
            ENTER THE ENGINE →
          </button>
        </div>
        <p style={{ textAlign:'center', color:'#444', fontSize:12, marginTop:20 }}>Every Project Begins With Belief. Signal On.</p>
      </div>
    </div>
  )
}

// ── Dashboard ──────────────────────────────────────────────
function Dashboard({ state }) {
  const today = getTodaySignal()
  const totalClips = state.clips.length
  const maxCount = Math.max(...Object.values(state.signalCounts), 1)
  const recommended = [
    { title: 'Brand Authority Clip', signal: today.name, type: 'Brand Presence' },
    { title: 'Client Success Story', signal: 'AUTHORITY', type: 'Testimonial' },
    { title: 'Behind the Process', signal: 'CRAFT', type: 'Educational' },
    { title: 'Offer Announcement', signal: 'MOMENTUM', type: 'Offer/Promo' },
  ]
  return (
    <div>
      <div style={styles.goldCard}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:3, color:'#666', marginBottom:8 }}>TODAY — {getDayName().toUpperCase()}</div>
            <h1 style={{ ...styles.h1, fontSize:32, marginBottom:6 }}>{getGreeting()}, {state.businessName}.</h1>
            <p style={{ color:'#888', fontSize:14 }}>Today's signal is <span style={{ color:today.color, fontWeight:'bold' }}>{today.name}</span> — {today.tagline}</p>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:36, color:styles.gold, fontWeight:'bold' }}>{totalClips}</div>
            <div style={{ fontSize:11, letterSpacing:2, color:'#666' }}>CLIPS CREATED</div>
          </div>
        </div>
        <div style={{ marginTop:20, padding:'14px 18px', background:'#0B0B0B', borderRadius:8, borderLeft:`3px solid ${today.color}` }}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:6 }}>TODAY'S PRODUCTION PHASE</div>
          <div style={{ color:'#F5F0E8', fontSize:13 }}>{today.phase}</div>
          <div style={{ color:'#888', fontSize:12, marginTop:4, fontStyle:'italic' }}>"{today.principle}"</div>
        </div>
      </div>

      <div style={{ ...styles.grid2, marginBottom:20 }}>
        <div style={styles.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:16 }}>SIGNAL USAGE</div>
          {SIGNALS.map(s => {
            const count = state.signalCounts[s.id] || 0
            const pct = Math.round((count / maxCount) * 100)
            return (
              <div key={s.id} style={{ marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:11 }}>
                  <span style={{ color:'#888', letterSpacing:1 }}>{s.name}</span>
                  <span style={{ color:s.color }}>{count}</span>
                </div>
                <div style={styles.bar(pct, s.color)} />
              </div>
            )
          })}
        </div>
        <div style={styles.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:16 }}>RECOMMENDED</div>
          {recommended.map((r,i) => (
            <div key={i} style={{ padding:'10px 0', borderBottom: i<3?'1px solid #1a1a1a':'none' }}>
              <div style={{ fontSize:13, color:'#F5F0E8', marginBottom:4 }}>{r.title}</div>
              <div style={{ display:'flex', gap:6 }}>
                <span style={styles.tag}>{r.signal}</span>
                <span style={styles.tag}>{r.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {state.clips.length > 0 && (
        <div style={styles.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:16 }}>RECENT CLIPS</div>
          {state.clips.slice(0,3).map(c => (
            <div key={c.id} style={{ padding:'12px 0', borderBottom:'1px solid #1a1a1a' }}>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ fontSize:14, color:'#F5F0E8' }}>{c.title}</span>
                <span style={{ fontSize:11, color:'#666' }}>{c.date}</span>
              </div>
              <div style={{ display:'flex', gap:6, marginTop:6 }}>
                <span style={styles.tag}>{c.signalName}</span>
                <span style={styles.tag}>{c.clipType}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Clip Generator ─────────────────────────────────────────
function Generator({ state, dispatch }) {
  const [step, setStep] = useState(1)
  const [selectedSignal, setSelectedSignal] = useState(null)
  const [clipType, setClipType] = useState('')
  const [title, setTitle] = useState('')
  const [topic, setTopic] = useState('')
  const [platforms, setPlatforms] = useState([])
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState(null)

  const togglePlatform = (p) => setPlatforms(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev, p])

  const generate = () => {
    setGenerating(true)
    setTimeout(() => {
      const s = selectedSignal
      const scripts = {
        'Offer/Promo': {
          hook: `This is what ${state.businessType} looks like when it's done right.`,
          voiceover: `At ${state.businessName}, we don't just promise results — we build the system that delivers them. Signal ${s.id}: ${s.name}. ${s.outcome} If you're ready to stop guessing and start building, let's talk.`,
          visuals: `${s.symbol}. Cinematic shot — minimal movement, dramatic lighting, black/gold palette. Text overlay: "${s.name}" fades in center frame. End tag: "${state.businessName}. Every Project Begins With Belief."`,
          caption: `${s.tagline}\n\nAt ${state.businessName}, this is how we operate. Not inspiration — infrastructure.\n\n${platforms.map(p=>`#${p.replace('/','').replace(' ','')}`).join(' ')} #SignalOn #${s.name.replace(' ','')}`,
          cta: `DM us "SIGNAL" to start your free audit.`
        },
        'Brand Presence': {
          hook: `${s.name}. This is Signal ${s.id} of 7.`,
          voiceover: `${s.tagline} At ${state.businessName}, ${s.behavior.toLowerCase()} This is the ${s.phase.toLowerCase()}. ${s.principle}`,
          visuals: `Symbol: ${s.symbol}. 8–10 second cinematic clip. Slow push-in. Minimal motion. Text: "${s.name}" — centered, gold on black. End tag: "${state.businessName}. Signal On."`,
          caption: `${s.tagline}\n\n${s.behavior}\n\nSignal ${s.id} of the Seven Signals Method™ by ${state.businessName}.\n\n#SevenSignals #${s.name.replace(' ','')} #SignalOn #BrandMediaGroup`,
          cta: `Follow for all 7 signals this week.`
        },
        'Educational': {
          hook: `Most ${state.businessType}s skip this step. Here's why it costs them.`,
          voiceover: `Signal ${s.id} in the Seven Signals Method™ is ${s.name}. ${s.tagline} The production phase is ${s.phase.toLowerCase()}. The leadership principle: ${s.principle} The client outcome: ${s.outcome}`,
          visuals: `Talking head or motion graphics. Text annotations for each point. Symbol reference: ${s.symbol}. Clean, minimal, cinematic. No clutter.`,
          caption: `${s.name} — Signal ${s.id} of 7.\n\n${s.tagline}\n\nMost skip this. The ones who don't build authority that compounds.\n\n#${s.name.replace(' ','')} #SevenSignals #${state.businessType.replace(' ','')}`,
          cta: `Save this for your next project.`
        }
      }
      const template = scripts[clipType] || scripts['Brand Presence']
      setResult({
        id: Date.now().toString(),
        title,
        topic,
        signalId: s.id,
        signalName: s.name,
        clipType,
        platforms,
        date: new Date().toLocaleDateString(),
        ...template
      })
      setGenerating(false)
    }, 1800)
  }

  const save = () => {
    dispatch({ type: 'ADD_CLIP', clip: result })
    setStep(1); setSelectedSignal(null); setClipType(''); setTitle(''); setTopic(''); setPlatforms([]); setResult(null)
  }

  if (result) return (
    <div>
      <div style={styles.goldCard}>
        <div style={{ fontSize:11, letterSpacing:3, color:styles.gold, marginBottom:8 }}>CLIP BRIEF GENERATED</div>
        <h2 style={{ fontSize:22, color:'#F5F0E8', fontWeight:'normal', marginBottom:4 }}>{result.title}</h2>
        <div style={{ display:'flex', gap:8, marginBottom:0 }}>
          <span style={styles.tag}>{result.signalName}</span>
          <span style={styles.tag}>{result.clipType}</span>
        </div>
      </div>
      {[['HOOK', result.hook], ['VOICEOVER / SCRIPT', result.voiceover], ['VISUAL DIRECTION', result.visuals], ['CAPTION', result.caption], ['CTA', result.cta]].map(([label, text]) => (
        <div key={label} style={styles.card}>
          <div style={{ fontSize:11, letterSpacing:2, color:'#666', marginBottom:10 }}>{label}</div>
          <p style={{ color:'#F5F0E8', fontSize:14, lineHeight:1.7, margin:0, whiteSpace:'pre-line' }}>{text}</p>
        </div>
      ))}
      <div style={{ display:'flex', gap:12 }}>
        <button style={styles.btn('primary')} onClick={save}>SAVE TO LIBRARY</button>
        <button style={styles.btn('outline')} onClick={()=>setResult(null)}>REGENERATE</button>
      </div>
    </div>
  )

  return (
    <div>
      <div style={{ display:'flex', gap:8, marginBottom:28 }}>
        {[1,2,3].map(n => (
          <div key={n} style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, background: step>=n ? styles.gold : '#1a1a1a', color: step>=n ? '#0B0B0B' : '#666', fontWeight:'bold' }}>{n}</div>
            {n<3 && <div style={{ width:40, height:1, background: step>n ? styles.gold : '#1e1e1e' }} />}
          </div>
        ))}
        <span style={{ color:'#666', fontSize:12, marginLeft:8, alignSelf:'center' }}>
          {step===1?'Select Signal':step===2?'Choose Type':'Clip Details'}
        </span>
      </div>

      {step === 1 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:'#666', marginBottom:20 }}>SELECT YOUR SIGNAL</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:28 }}>
            {SIGNALS.map(s => {
              const isToday = s.day === getDayName()
              return (
                <div key={s.id} style={styles.signalChip(selectedSignal?.id===s.id, s.color)} onClick={()=>setSelectedSignal(s)}>
                  <div style={{ fontSize:10, color:'#666', marginBottom:4 }}>{s.id} — {s.day.toUpperCase()}{isToday?' ★':''}</div>
                  <div style={{ fontSize:13, color: selectedSignal?.id===s.id ? s.color : '#F5F0E8', letterSpacing:1 }}>{s.name}</div>
                  <div style={{ fontSize:11, color:'#666', marginTop:4 }}>{s.symbol}</div>
                </div>
              )
            })}
          </div>
          {selectedSignal && (
            <div style={{ ...styles.card, borderColor:'#2a2010', marginBottom:20 }}>
              <div style={{ fontSize:13, color:selectedSignal.color, marginBottom:8 }}>{selectedSignal.name}</div>
              <p style={{ color:'#888', fontSize:13, lineHeight:1.6, margin:0 }}>{selectedSignal.tagline}<br/><em style={{fontSize:12}}>"{selectedSignal.principle}"</em></p>
            </div>
          )}
          <button style={styles.btn('primary')} onClick={()=>selectedSignal&&setStep(2)} disabled={!selectedSignal}>
            NEXT: CHOOSE TYPE →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:'#666', marginBottom:20 }}>SELECT CLIP TYPE</div>
          <div style={styles.grid3}>
            {CLIP_TYPES.map(t => (
              <div key={t} style={styles.signalChip(clipType===t, styles.gold)} onClick={()=>setClipType(t)}>
                <div style={{ fontSize:13, color: clipType===t ? styles.gold : '#F5F0E8' }}>{t}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:12, marginTop:28 }}>
            <button style={styles.btn('ghost')} onClick={()=>setStep(1)}>← BACK</button>
            <button style={styles.btn('primary')} onClick={()=>clipType&&setStep(3)}>NEXT: DETAILS →</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div style={{ fontSize:11, letterSpacing:3, color:'#666', marginBottom:20 }}>CLIP DETAILS</div>
          <label style={styles.label}>Clip Title</label>
          <input style={{...styles.input, marginBottom:20}} value={title} onChange={e=>setTitle(e.target.value)} placeholder={`e.g. ${selectedSignal?.name} — ${state.businessName}`} />
          <label style={styles.label}>Topic / Context (optional)</label>
          <textarea style={{...styles.textarea, marginBottom:20}} value={topic} onChange={e=>setTopic(e.target.value)} placeholder="Any specific message, offer, or context to include..." />
          <label style={styles.label}>Target Platforms</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:28 }}>
            {PLATFORMS.map(p => (
              <div key={p} style={{ ...styles.signalChip(platforms.includes(p), styles.gold), padding:'8px 14px' }} onClick={()=>togglePlatform(p)}>
                <span style={{ fontSize:12, color: platforms.includes(p) ? styles.gold : '#888' }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:12 }}>
            <button style={styles.btn('ghost')} onClick={()=>setStep(2)}>← BACK</button>
            <button style={{...styles.btn('primary'), minWidth:160}} onClick={()=>title&&generate()} disabled={!title||generating}>
              {generating ? 'GENERATING...' : 'GENERATE BRIEF →'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Library ────────────────────────────────────────────────
function Library({ state, dispatch }) {
  const [filter, setFilter] = useState('ALL')
  const [expanded, setExpanded] = useState(null)
  const filtered = filter==='ALL' ? state.clips : state.clips.filter(c=>c.signalName===filter)
  return (
    <div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:24 }}>
        {['ALL', ...SIGNALS.map(s=>s.name)].map(f => (
          <button key={f} style={{...styles.btn(filter===f?'primary':'ghost'), padding:'6px 14px', fontSize:11}}
            onClick={()=>setFilter(f)}>{f}</button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div style={{ ...styles.card, textAlign:'center', padding:40 }}>
          <p style={{ color:'#666' }}>No clips yet. Head to CREATE to generate your first brief.</p>
        </div>
      ) : filtered.map(c => (
        <div key={c.id} style={styles.card}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer' }} onClick={()=>setExpanded(expanded===c.id?null:c.id)}>
            <div>
              <div style={{ fontSize:14, color:'#F5F0E8', marginBottom:6 }}>{c.title}</div>
              <div style={{ display:'flex', gap:6 }}>
                <span style={styles.tag}>{c.signalName}</span>
                <span style={styles.tag}>{c.clipType}</span>
                <span style={styles.tag}>{c.date}</span>
              </div>
            </div>
            <span style={{ color:'#666', fontSize:18 }}>{expanded===c.id?'−':'+'}</span>
          </div>
          {expanded===c.id && (
            <div style={{ marginTop:20, paddingTop:20, borderTop:'1px solid #1e1e1e' }}>
              {[['HOOK',c.hook],['VOICEOVER',c.voiceover],['VISUALS',c.visuals],['CAPTION',c.caption],['CTA',c.cta]].map(([l,t])=>(
                <div key={l} style={{ marginBottom:16 }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:'#666', marginBottom:6 }}>{l}</div>
                  <p style={{ color:'#F5F0E8', fontSize:13, lineHeight:1.6, margin:0, whiteSpace:'pre-line' }}>{t}</p>
                </div>
              ))}
              <button style={{...styles.btn('ghost'), padding:'6px 14px', fontSize:11, marginTop:8}} onClick={()=>dispatch({type:'REMOVE_CLIP',id:c.id})}>REMOVE</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ── App Root ───────────────────────────────────────────────
export default function AuthorityEngine() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const [tab, setTab] = useState('DASHBOARD')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bmg-authority-engine')
      if (saved) dispatch({ type:'LOAD', payload: JSON.parse(saved) })
    } catch(e) {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try { localStorage.setItem('bmg-authority-engine', JSON.stringify(state)) } catch(e) {}
  }, [state, loaded])

  if (!loaded) return <div style={{ ...styles.app, display:'flex', alignItems:'center', justifyContent:'center', height:'100vh' }}><div style={{ color:styles.gold, letterSpacing:3, fontSize:13 }}>LOADING...</div></div>
  if (!state.onboarded) return <Onboarding dispatch={dispatch} />

  return (
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.navLogo}>BMG AUTHORITY ENGINE™</div>
        <div style={styles.navTabs}>
          {['DASHBOARD','CREATE','LIBRARY'].map(t => (
            <button key={t} style={styles.tab(tab===t)} onClick={()=>setTab(t)}>{t}</button>
          ))}
        </div>
        <div style={{ fontSize:11, color:'#444', letterSpacing:1 }}>Signal On.</div>
      </nav>
      <main style={styles.main}>
        {tab==='DASHBOARD' && <Dashboard state={state} />}
        {tab==='CREATE' && <Generator state={state} dispatch={dispatch} />}
        {tab==='LIBRARY' && <Library state={state} dispatch={dispatch} />}
      </main>
      <footer style={{ borderTop:'1px solid #1a1a1a', padding:'20px 24px', textAlign:'center' }}>
        <p style={{ color:'#444', fontSize:11, letterSpacing:2, margin:0 }}>
          BRAND MEDIA GROUP — EVERY PROJECT BEGINS WITH BELIEF — <a href="https://brandmediagroup.co" style={{ color:'#666' }}>BRANDMEDIAGROUP.CO</a>
        </p>
      </footer>
    </div>
  )
}
