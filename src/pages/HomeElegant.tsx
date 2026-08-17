import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GrainOverlay, ScrollProgress } from "../animations"
import { SiteNav, SiteFooter } from "../components/LegalFormKit"
import { Link } from "react-router-dom"
import dashboardImg from "../assets/dashboard.png"
import bookingCardImg from "../assets/booking-card.png"
import changeCardImg from "../assets/change-card.png"
import expensesCardImg from "../assets/expenses-card.png"
import "./HomeElegant.css"

const ease = [0.16, 1, 0.3, 1] as const
const MotionLink = motion.create(Link)

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const visible = useInView(ref, { once: true, margin: "-12% 0px" })
  return <motion.div ref={ref} className={className} initial={reduce ? { opacity: 0 } : { opacity: 0, y: 42, scale: .985, filter: "blur(8px)" }} animate={visible ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : {}} transition={{ duration: reduce ? .2 : .9, delay: reduce ? 0 : delay, ease }}>{children}</motion.div>
}

function MotionSection({ children, className, id, effect = "rise" }: { children: React.ReactNode; className: string; id?: string; effect?: "rise"|"wipe"|"scale"|"slide" }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const visible = useInView(ref, { once: true, margin: "-10% 0px" })
  const initial = effect === "wipe" ? { opacity: 0, clipPath: "inset(0 0 16% 0 round 32px)" } : effect === "scale" ? { opacity: 0, scale: .96 } : effect === "slide" ? { opacity: 0, x: 64 } : { opacity: 0, y: 54 }
  return <motion.section id={id} ref={ref} className={className} initial={reduce ? { opacity: 0 } : initial} animate={visible ? { opacity: 1, x: 0, y: 0, scale: 1, clipPath: "inset(0 0 0% 0 round 0px)" } : initial} transition={{ duration: reduce ? .2 : 1.05, ease }}>{children}</motion.section>
}

function SectionSignal({ light = false }: { light?: boolean }) { return <motion.div className={`el-section-signal${light ? " el-section-signal--light" : ""}`} aria-hidden="true" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .6 }} transition={{ duration: 1.15, ease }}><motion.i initial={{ left: "0%" }} whileInView={{ left: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: .12, ease }}/></motion.div> }

function PromptDemo() { return <motion.div className="el-demo-stage" initial={{ opacity: 0, scale: .94, y: 60 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1.1, delay: .35, ease }}>
  <div className="el-demo-stage__route" aria-hidden="true"><span>SFO</span><i/><b>7,337 mi</b><i/><span>SIN</span></div>
  <div className="el-demo-stage__note el-demo-stage__note--policy"><span>Policy</span><b>Approved</b></div>
  <div className="el-demo-stage__note el-demo-stage__note--savings"><span>Live savings</span><b>$428</b></div>
  <div className="el-console el-console--image">
    <img className="el-console__img" src={dashboardImg} alt="Miraee travel dashboard" />
  </div>
</motion.div> }

function Hero() {
  const ref = useRef<HTMLElement>(null); const reduce=useReducedMotion(); const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] }); const y = useTransform(scrollYProgress,[0,1],[0,120]); const opacity = useTransform(scrollYProgress,[0,.9],[1,0])
  return <section ref={ref} className="el-hero"><div className="el-hero__ghost" aria-hidden="true">agent</div><motion.div className="el-hero__inner" style={{ y:reduce?0:y, opacity:reduce?1:opacity }}>
    <motion.div className="el-hero__kicker" initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }}><div className="el-pill"><span/> AI-native corporate travel</div></motion.div>
    <h1><motion.span initial={{ y:"110%" }} animate={{ y:0 }} transition={{ duration:.9,ease }}>Your entire trip.</motion.span><motion.span className="el-hero__accent" initial={{ y:"110%" }} animate={{ y:0 }} transition={{ duration:.9,delay:.1,ease }}>Handled by one intelligent agent.</motion.span></h1>
    <motion.p initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:.45,duration:.7 }}>Miraee manages every journey end to end, from planning and booking to support and expenses, while keeping travelers happy and businesses in control.</motion.p>
    <motion.div className="el-hero__actions" initial={{ opacity:0,y:16 }} animate={{ opacity:1,y:0 }} transition={{ delay:.58,duration:.7 }}><Link className="el-button" to="/book-a-demo">See Miraee live <span aria-hidden="true">↗</span></Link><a className="el-text-link" href="#product">Explore plan for your organisation <span aria-hidden="true">↓</span></a></motion.div>
    <PromptDemo />
    <motion.div className="el-hero__proof" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.05,duration:.7,ease}}><span>One conversation</span><i/><span>Live inventory</span><i/><span>Policy built in</span><i/><span>Human support when needed</span></motion.div>
  </motion.div></section>
}

const proofStats = [["2M+","Properties"],["500+","Airlines"],["200+","AI agents"],["125M+","Travelers reached"],["20–30%","Wholesale savings"],["24/7","Human support"],["97%","Agent-managed"],["1","Platform"]]
function ProofStrip(){const reduce=useReducedMotion();return <section className="el-proof" aria-label="Miraee platform coverage"><motion.div className="el-proof__track" animate={reduce?{x:0}:{x:["0%","-50%"]}} transition={reduce?{duration:0}:{duration:32,repeat:Infinity,ease:"linear"}}>{[...proofStats,...proofStats].map((s,i)=><div key={`${s[0]}-${i}`}><b>{s[0]}</b><span>{s[1]}</span></div>)}</motion.div></section>}

const eras = [["1990s","Phone calls and paper tickets","Manual planning took hours.",["Phone calls · long waits","Fax approvals · manual everything","Paper tickets · easy to lose","Filing cabinets · hard to track"]],["2000s","Call centers and corporate desks","Online booking arrived, but rigid portals and approvals remained.",["Call centers · hold music","Booking portals · clunky UX","Corporate cards · manual reconciliation","Expense reports · weeks to file"]],["Today","Portals you operate","Travelers stitch disconnected apps, policy, and expense together.",["Disconnected apps · 12+ vendors","Manual policy · guesswork","Self-service · you do the work","Scattered data · no single view"]],["2026","An agent that operates for you","Specialized agents book, negotiate, rebook, and reconcile with human backup.",["AI agents · 200+ specialized","Auto-booking · seconds, not hours","Human backup · 24/7","One platform · everything connected"]]] as const
function Evolution(){return <section className="el-legacy-section"><SectionSignal/><Reveal className="el-section-head"><span>How travel got here</span><h2>From tools you operate<br/>to an agent that <em>operates for you.</em></h2><p>Miraee doesn’t add another dashboard. It becomes the connecting layer across inventory, policy, payments, expense, and people.</p></Reveal><div className="el-era-orbit" aria-hidden="true"><i/><i/><i/><i/></div><div className="el-era-grid">{eras.map((e,i)=><Reveal className="el-era" key={e[0]} delay={i*.08}><span>{e[0]}</span><b>{e[1]}</b><p>{e[2]}</p><ul>{e[3].map(x=><li key={x}>{x}</li>)}</ul></Reveal>)}</div></section>}

const pains = [["5","separate systems","Disconnected systems","Booking, travel desks, payments, expense software, and employee benefits."],["12+","vendors","Vendors to manage","A dozen services stitched together, none sharing the full journey."],["0","built for them","The traveler does the work","The person actually traveling becomes the coordinator."]]
function Friction(){const systems=[["Search & book","Traveler","12 options"],["Policy approval","Manager","Waiting"],["Payment","Finance","Pending"],["Trip changes","Travel desk","Ticket opened"],["Expense","Accounting","Receipt missing"]];return <section className="el-friction el-handoff"><Reveal className="el-handoff__head"><span className="el-label">The problem</span><h2>Every handoff<br/><em>fragments the journey.</em></h2><p>Every handoff changes the owner, loses the context, and gives the traveler another system to coordinate.</p></Reveal><Reveal className="el-relay" delay={.08}><div className="el-relay__trip"><span>One employee trip</span><b>SFO → SIN</b></div><div className="el-relay__track"><div className="el-relay__line" aria-hidden="true"/>{systems.map((s,i)=><div className={`el-relay__stop el-relay__stop--${i%2===0?"up":"down"}`} key={s[0]}><div className="el-relay__node"><span>{i+1}</span></div><div className="el-relay__card"><small>{s[1]} owns it</small><h3>{s[0]}</h3><b>{s[2]}</b></div></div>)}</div><div className="el-relay__verdict"><span>Five owners</span><i/> <span>Four handoffs</span><i/> <strong>Zero shared context</strong></div></Reveal><div className="el-handoff__metrics">{pains.map((p,i)=><Reveal key={p[2]} delay={i*.06}><span>0{i+1}</span><strong>{p[0]}</strong><small>{p[1]}</small><p>{p[2]}</p></Reveal>)}</div></section>}

const allCapabilities = [["Plan","Describe a trip naturally and get an in-policy itinerary in seconds.","<60s"],["Book","Flights, hotels, rail, and cars from live wholesale inventory.","20–30%"],["Expense","Receipts, coding, reports, and reconciliation prepared automatically.","0 forms"],["Change","The agent proactively rebooks disruptions within policy.","97%"],["24/7 support","Human-in-the-loop backup whenever a trip needs a real person.","24/7"],["Personal travel","The same agent can plan employee trips without mixing company spend.","1 agent"]]
function CapabilityMatrix(){return <section className="el-capabilities"><SectionSignal/><Reveal className="el-section-head"><span>The complete platform</span><h2>Six capabilities.<br/><em>One continuous context.</em></h2></Reveal><div className="el-cap-grid">{allCapabilities.map((c,i)=><Reveal className={`el-cap-card el-cap-card--${i+1}`} key={c[0]} delay={(i%3)*.07}><span>0{i+1}</span><h3>{c[0]}</h3><p>{c[1]}</p><b>{c[2]}</b><i aria-hidden="true"/></Reveal>)}</div></section>}

const differentiators=[["Global content, local experiences","Millions of properties and hundreds of airlines, plus hyperlocal experiences, no one else has digitized.","2M+ properties"],["A swarm of specialized agents","Booking, policy, negotiation, rebooking, and expense agents that execute, not just answer.","200+ deep AI agents"],["Human in the loop","Real support and oversight where it matters, so autonomy never means blind trust.","24/7 human support"]]
function PlatformDifference(){return <section className="el-differentiators"><Reveal className="el-section-head"><span>The platform</span><h2>Global reach.<br/><em>Personal execution.</em></h2></Reveal><div>{differentiators.map((d,i)=><Reveal key={d[0]} delay={i*.1}><span>0{i+1}</span><h3>{d[0]}</h3><p>{d[1]}</p><b>{d[2]}</b></Reveal>)}</div></section>}

const audienceRoles=[["Traveler","Ask once. Get a complete, policy-safe trip."],["Finance","See committed spend before it becomes an expense."],["Travel lead","Set the rules. Let the agent run the program."]]
function People(){return <section id="people" className="el-people"><Reveal className="el-section-head"><span>Built around people</span><h2>Everyone gets<br/><em>what they need.</em></h2></Reveal><div className="el-people-stage"><div className="el-people-stage__halo"/>{audienceRoles.map((r,i)=><Reveal className={`el-person el-person--${i+1}`} key={r[0]} delay={i*.1}><span>0{i+1}</span><h3>{r[0]}</h3><p>{r[1]}</p></Reveal>)}</div></section>}

const experiences=["Festivals and culture","Once-in-a-trip moments","Local performances","Markets and makers","The bleisure weekend","Food and discovery"]
function Experiences(){return <section className="el-experiences"><Reveal><span className="el-label">Experiences</span><h2>Not bookable<br/>anywhere else.</h2><p>The city after 5pm, the festival, or the family weekend bolted onto a work trip—booked separately from company spend, in one tap.</p><strong>92% of experiences</strong></Reveal><div>{experiences.map((x,i)=><Reveal key={x} delay={(i%3)*.07}><span>0{i+1}</span><b>{x}</b></Reveal>)}</div></section>}

const workflow = [["01","Plan","Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds."],["02","Book","Flights, hotels, and cars from wholesale inventory—with real savings in one tap."],["03","Expense","Receipts, reports, and reconciliation handled automatically. No forms, no chasing."],["04","Change","Plans shift and the agent rebooks within policy, before you even ask."]]
function HowItWorks(){const actions=[[workflow[0],"Understands intent","A policy-safe itinerary appears in seconds."],[workflow[1],"Completes the work","The right flight, hotel, and car are booked together."],[workflow[3],"Stays ahead","The agent watches the trip and resolves changes as they happen."],[workflow[2],"Closes the loop","Receipts and reconciliation are finished automatically."]];return <section id="how-it-works" className="el-workflow el-journey-flow"><Reveal className="el-journey-flow__head"><span className="el-label">How it works</span><h2>Ask once.<br/><em>Keep moving.</em></h2><p>Miraee carries one continuous context through the entire journey. You never restart, repeat yourself, or manage the process.</p></Reveal><Reveal className="el-flow2" delay={.08}><div className="el-flow2__ask"><span>You ask</span><p>“Singapore next Tuesday. Window seat. Within policy.”</p></div><div className="el-flow2__rail">{actions.map(([s,label,copy],i)=><div className="el-flow2__step" key={s[0]}><div className="el-flow2__dot"><span>0{i+1}</span></div><div className="el-flow2__body"><small>{label}</small><h3>{s[1]}</h3><p>{copy}</p><b>{i===0?"< 60 sec":i===1?"One approval":i===2?"24 / 7":"Zero forms"}</b></div></div>)}</div><div className="el-flow2__result"><span>Journey state</span><b>Everything handled.</b><small>Plan · book · protect · expense</small></div></Reveal></section>}

const compareRows = [["Natural-language planning","—","Included"],["Live policy decisions","Partial","Included"],["Personal + business travel","—","Included"],["Proactive disruption handling","—","Included"],["Expense prepared automatically","Partial","Included"]]
function Comparison(){return <section className="el-comparison"><SectionSignal/><Reveal className="el-section-head"><span>The difference</span><h2>Not another booking tool.<br/><em>A new operating model.</em></h2><p>Legacy tools wait for clicks. Miraee understands intent, makes decisions, and completes the work.</p></Reveal><Reveal><div className="el-compare-table" role="table" aria-label="Miraee compared with a legacy travel management company"><div role="row"><b role="columnheader">Capability</b><b role="columnheader">Legacy TMC</b><b role="columnheader">Miraee</b></div>{compareRows.map(r=><div role="row" key={r[0]}><span role="cell">{r[0]}</span><span role="cell">{r[1]}</span><strong role="cell">{r[2]}</strong></div>)}</div></Reveal></section>}

function BusinessCase(){return <section className="el-business-case"><Reveal className="el-section-head"><span>The business case</span><h2>Loved by employees.<br/><em>Trusted by finance.</em></h2></Reveal><div>{[["20–30%","Travel savings, validated apples-to-apples versus incumbents"],["97%","Of the journey managed by the agent, end to end"],["1","Platform for business and personal travel alike"]].map((x,i)=><Reveal key={x[0]} delay={i*.1}><strong>{x[0]}</strong><p>{x[1]}</p></Reveal>)}</div></section>}

function Partners(){const points=[["01","Premium travelers","Access a large, engaged traveler base."],["02","Brand-forward NDC","Merchandise rich content in real time."],["03","The whole traveler","Win business and personal travel alike."]];return <section className="el-partners"><Reveal><span className="el-label">For airlines and suppliers</span><h2>Be part of<br/>your travelers’<br/>best experiences.</h2><p>Miraee puts partner brands in front of premium, high-frequency travelers—for the business trip and the personal one—with content they control.</p><Link className="el-button" to="/book-a-demo">Partner with Miraee <span aria-hidden="true">↗</span></Link></Reveal><div className="el-partner-points">{points.map((x,i)=><Reveal key={x[0]} delay={i*.08}><span>{x[0]}</span><b>{x[1]}</b><p>{x[2]}</p></Reveal>)}</div></section>}

function FeatureVisual({ type }: { type: "book"|"change"|"expense" }) {
  if(type==="book") return <img className="el-visual-img" src={bookingCardImg} alt="Trip options showing a multi-city flight itinerary with pricing"/>
  if(type==="change") return <img className="el-visual-img" src={changeCardImg} alt="Modification request showing requested flight changes and expected savings"/>
  return <img className="el-visual-img" src={expensesCardImg} alt="Trip expenses list with policy flags and auto-reconciled totals"/>
}

const features = [
  ["01","Plan and book","Ask naturally. Miraee searches live inventory, understands preferences, and applies policy before presenting the right journey.","book"],
  ["02","Handle every change","When plans change, the agent finds alternatives, checks cost and policy, and brings you one clear decision.","change"],
  ["03","Close the expense loop","Bookings, payments, receipts, and policy stay connected so expense work becomes seamless.","expense"]
] as const

function Product() {
  return <MotionSection id="product" className="el-product" effect="rise">
    <SectionSignal />
    <Reveal className="el-section-head"><span>One continuous system</span><h2>From &quot;I need to go&quot;<br/>to <em>everything handled.</em></h2><p>A personal travel agent for employees. A real-time operating layer for finance and travel teams.</p></Reveal>
    <div className="el-feature-list">{features.map(([n,t,d,type],i) => <article className={`el-feature el-feature--${i+1}`} key={t}>
      <Reveal className="el-feature__copy"><span>{n} / 03</span><h3>{t}</h3><p>{d}</p><Link to="/book-a-demo">See how it works <span aria-hidden="true">&#8594;</span></Link></Reveal>
      <Reveal className="el-feature__visual" delay={.12}><FeatureVisual type={type}/></Reveal>
    </article>)}</div>
  </MotionSection>
}

function Outcomes() { const cards=[["For employees","A trip that feels personal—not procedural.","4.8/5","traveler experience"],["For finance","Control spend before it becomes an expense.","20–30%","wholesale savings"],["For travel teams","Run by exception instead of managing every booking.","24/7","agent + human care"]]; return <section id="outcomes" className="el-outcomes"><Reveal className="el-section-head el-section-head--light"><span>Designed for everyone</span><h2>Less work.<br/><em>Better journeys.</em></h2></Reveal><div className="el-outcome-grid">{cards.map((c,i)=><Reveal className="el-outcome" key={c[0]} delay={i*.1}><span>0{i+1}</span><h3>{c[0]}</h3><p>{c[1]}</p><div><strong>{c[2]}</strong><small>{c[3]}</small></div></Reveal>)}</div></section> }

function Intelligence() { return <section className="el-intel"><SectionSignal/><div className="el-intel__sticky"><Reveal><span className="el-label">Agentic by design</span><h2>It doesn’t wait<br/>for clicks.</h2><p>Miraee understands intent, reasons across company rules and traveler context, then completes the work with permission.</p></Reveal></div><div className="el-intel__stack">{[["Understands","Natural requests, traveler preferences, meeting context, loyalty, and policy."],["Decides","Balances price, convenience, company controls, and personal priorities."],["Acts","Books, changes, communicates, captures receipts, and escalates to humans when needed."]].map((x,i)=><Reveal className="el-intel-card" key={x[0]} delay={i*.1}><span>0{i+1}</span><h3>{x[0]}</h3><p>{x[1]}</p><div className="el-intel-card__glow"/></Reveal>)}</div></section> }

function Security() { return <section id="security" className="el-security"><SectionSignal/><Reveal><span className="el-label">Enterprise foundations</span><h2>Fast for people.<br/>Safe for the business.</h2><p>Every action is governed, permissioned, traceable, and ready for enterprise controls.</p></Reveal><div className="el-security__grid">{[["SOC 2","Operational controls"],["SSO / SCIM","Identity management"],["GDPR","Privacy by design"],["Audit logs","Every agent action"]].map((x,i)=><Reveal className="el-trust" key={x[0]} delay={i*.08}><i>0{i+1}</i><b>{x[0]}</b><span>{x[1]}</span></Reveal>)}</div></section> }

function CTA() { return <section className="el-cta"><SectionSignal light/><motion.div className="el-cta__halo" animate={{scale:[1,1.15,1],opacity:[.5,.8,.5]}} transition={{duration:7,repeat:Infinity}}/><Reveal><span className="el-label">See the agent in action</span><h2>See it handle<br/>a real trip, live.</h2><p>Bring a real trip. We’ll show you how Miraee handles it in twenty minutes.</p><MotionLink whileHover={{y:-4,scale:1.02}} whileTap={{scale:.97}} className="el-button el-button--light" to="/book-a-demo">Book your demo <span aria-hidden="true">↗</span></MotionLink></Reveal></section> }

export default function HomeElegant(){ return <><a className="el-skip-link" href="#main-content">Skip to main content</a><SiteNav/><main id="main-content" className="el-site"><ScrollProgress/><GrainOverlay/><Hero/><ProofStrip/><Product/><Evolution/><Friction/><PlatformDifference/><CapabilityMatrix/><People/><Outcomes/><HowItWorks/><Comparison/><BusinessCase/><Intelligence/><Security/><Experiences/><div id="partners"><Partners/></div><CTA/></main><SiteFooter/></> }
