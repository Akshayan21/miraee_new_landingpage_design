import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GrainOverlay, ScrollProgress } from "../animations"
import { SiteNav, SiteFooter } from "../components/LegalFormKit"
import { Link } from "react-router-dom"
import dashboardImg from "../assets/dashboard.png"
import bookingCardImg from "../assets/booking-card.png"
import changeCardImg from "../assets/change-card.png"
import expensesCardImg from "../assets/expenses-card.png"
import flightCardImg from "../assets/Flight_card.png"
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
    <motion.div className="el-hero__proof" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.05,duration:.7,ease}}><span>One thread</span><i/><span>Live inventory</span><i/><span>Policy built in</span><i/><span>Human support when needed</span></motion.div>
  </motion.div></section>
}

const proofStats = [["2M+","Properties"],["500+","Airlines"],["200+","AI agents"],["125M+","Travelers reached"],["20–30%","Wholesale savings"],["24/7","Human support"],["97%","Agent-managed"],["1","Platform"]]
function ProofStrip(){const reduce=useReducedMotion();return <section className="el-proof" aria-label="Miraee platform coverage"><motion.div className="el-proof__track" animate={reduce?{x:0}:{x:["0%","-50%"]}} transition={reduce?{duration:0}:{duration:32,repeat:Infinity,ease:"linear"}}>{[...proofStats,...proofStats].map((s,i)=><div key={`${s[0]}-${i}`}><b>{s[0]}</b><span>{s[1]}</span></div>)}</motion.div></section>}

const pains = [["5","separate systems","Disconnected systems","Booking, travel desks, payments, expense software, and employee benefits."],["12+","vendors","Vendors to manage","A dozen services stitched together, none sharing the full journey."],["0","built for them","The traveler does the work","The person actually traveling becomes the coordinator."]]
function Friction(){
  const fragments=[
    ["Traveler","Search & book","12 options"],
    ["Manager","Policy approval","Waiting"],
    ["Finance","Payment","Pending"],
    ["Travel desk","Trip changes","Ticket opened"],
    ["Accounting","Expense","Receipt missing"]
  ]
  return <section className="el-friction el-handoff">
    <Reveal className="el-handoff__head"><span className="el-label">The problem</span><h2>Every handoff<br/><em>fragments the journey.</em></h2><p>Every handoff changes the owner, loses the context, and gives the traveler another system to coordinate.</p></Reveal>
    <Reveal className="el-shatter" delay={.08}>
      <div className="el-shatter__label"><span>One employee trip</span><b>SFO → SIN</b><i/> <small>Split across five systems</small></div>
      <div className="el-shatter__document">
        <div className="el-shatter__ghost" aria-hidden="true">ONE JOURNEY</div>
        {fragments.map(([owner,title,state],i)=><motion.article className={`el-shard el-shard--${i+1}`} key={title} initial={{opacity:0,y:i%2?30:-30,rotate:i%2?2:-2}} whileInView={{opacity:1,y:0,rotate:0}} viewport={{once:true}} transition={{duration:.72,delay:.18+i*.11,ease}}>
          <div className="el-shard__top"><span>0{i+1}</span><small>{owner} owns it</small></div>
          <h3>{title}</h3><div className="el-shard__state"><i/>{state}</div>
          <b aria-hidden="true">{i===0?"SFO":i===4?"SIN":"•••"}</b>
        </motion.article>)}
        {[1,2,3,4].map(i=><motion.div className={`el-shatter__break el-shatter__break--${i}`} key={i} initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true}} transition={{duration:.5,delay:.55+i*.1,ease}}/>)}
      </div>
      <div className="el-shatter__verdict"><span>Five owners</span><i/><span>Four broken handoffs</span><i/><strong>No one sees the whole trip</strong></div>
    </Reveal>
    <div className="el-handoff__metrics">{pains.map((p,i)=><Reveal key={p[2]} delay={i*.06}><span>0{i+1}</span><strong>{p[0]}</strong><small>{p[1]}</small><p>{p[2]}</p></Reveal>)}</div>
  </section>
}

const allCapabilities = [["Plan","Describe a trip naturally and get an in-policy itinerary in seconds.","<60s"],["Book","Flights, hotels, rail, and cars from live wholesale inventory.","20–30%"],["Expense","Receipts, coding, reports, and reconciliation prepared automatically.","0 forms"],["Change","The agent proactively rebooks disruptions within policy.","97%"],["Continuous support","Human-in-the-loop backup whenever a trip needs a real person.","24/7"],["Personal travel","The same agent can plan employee trips without mixing company spend.","1 agent"]]
function CapabilityMatrix(){return <section className="el-capabilities"><SectionSignal/><Reveal className="el-section-head"><span>The complete platform</span><h2>Six capabilities.<br/><em>One continuous context.</em></h2></Reveal><div className="el-cap-grid">{allCapabilities.map((c,i)=><Reveal className={`el-cap-card el-cap-card--${i+1}`} key={c[0]} delay={(i%3)*.07}><span>0{i+1}</span><h3>{c[0]}</h3><p>{c[1]}</p><b>{c[2]}</b><i aria-hidden="true"/></Reveal>)}</div></section>}

const differentiators=[["Global content, local experiences","Millions of properties and 500+ airlines, plus hyperlocal experiences, no one else has digitized.","2M+ properties"],["A swarm of specialized agents","Booking, policy, negotiation, rebooking, and expense agents that execute, not just answer.","200+ AI agents"],["Human in the loop","Real support and oversight where it matters, so autonomy never means blind trust.","24/7 human support"]]
function PlatformDifference(){return <section className="el-differentiators"><Reveal className="el-section-head"><span>The platform</span><h2>Global reach.<br/><em>Personal execution.</em></h2></Reveal><div>{differentiators.map((d,i)=><Reveal key={d[0]} delay={i*.1}><span>0{i+1}</span><h3>{d[0]}</h3><p>{d[1]}</p><b>{d[2]}</b></Reveal>)}</div></section>}

const experiences=["Festivals and culture","Once-in-a-trip moments","Local performances","Markets and makers","The bleisure weekend","Food and discovery"]
function Experiences(){return <section className="el-experiences"><Reveal><span className="el-label">Experiences</span><h2>Not bookable<br/>anywhere else.</h2><p>The city after 5pm, the festival, or the family weekend bolted onto a work trip—booked separately from company spend, in one tap.</p></Reveal><div>{experiences.map((x,i)=><Reveal key={x} delay={(i%3)*.07}><span>0{i+1}</span><b>{x}</b></Reveal>)}</div></section>}

const workflow = [["01","Plan","Describe the trip in plain language. Miraee builds an in-policy itinerary in seconds."],["02","Book","Flights, hotels, and cars from wholesale inventory—with real savings in one tap."],["03","Expense","Receipts, reports, and reconciliation handled automatically. No forms, no chasing."],["04","Change","Plans shift and the agent rebooks within policy, before you even ask."]]
function HowItWorks(){
  const actions=[
    ["01","Plan","Policy-safe itinerary","< 60 sec"],
    ["02","Book","Flight + hotel confirmed","1 approval"],
    ["03","Protect","Disruption watched","24 / 7"],
    ["04","Expense","Receipt reconciled","0 forms"]
  ]
  return <section id="how-it-works" className="el-workflow el-journey-flow">
    <Reveal className="el-journey-flow__head"><span className="el-label">How it works</span><h2>Ask once.<br/><em>Keep moving.</em></h2><p>Miraee carries one continuous context through the entire journey. You never restart, repeat yourself, or manage the process.</p></Reveal>
    <Reveal className="el-orbit-flow" delay={.08}>
      <div className="el-orbit-flow__request"><small>Your request</small><p>“Singapore next Tuesday.<br/>Window seat. Within policy.”</p><span><i/>Sent to Miraee</span></div>
      <div className="el-orbit-flow__stage">
        <div className="el-orbit-flow__rings" aria-hidden="true"><i/><i/><i/></div>
        <motion.div className="el-orbit-flow__pulse" aria-hidden="true" animate={{scale:[.82,1.18],opacity:[.34,0]}} transition={{duration:2.6,repeat:Infinity,ease:"easeOut"}}/>
        <div className="el-orbit-flow__core"><small>One continuous</small><strong>Context</strong><span><i/>Active</span></div>
        {actions.map(([n,title,state,metric],i)=><motion.article className={`el-orbit-card el-orbit-card--${i+1}`} key={title} initial={{opacity:0,scale:.9}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{duration:.7,delay:.28+i*.13,ease}}>
          <span>{n}</span><small>{title}</small><h3>{state}</h3><b>{metric}</b>
        </motion.article>)}
        <div className="el-orbit-flow__memory"><span>Always remembered</span><b>Window seat</b><i/> <b>Company policy</b><i/> <b>SFO home airport</b></div>
      </div>
      <motion.figure className="el-orbit-flow__result el-orbit-flow__result--image" initial={{opacity:0,x:22}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.75,delay:.7,ease}}><img src={flightCardImg} alt="Completed SFO to Singapore journey with flight, hotel, and expenses handled"/></motion.figure>
      <div className="el-orbit-flow__foot"><span>Ask</span><i/><b>Miraee carries the context</b><i/><span>Arrive</span></div>
    </Reveal>
  </section>
}

const compareRows = [["Natural-language planning","—","Included"],["Live policy decisions","Partial","Included"],["Personal + business travel","—","Included"],["Proactive disruption handling","—","Included"],["Expense prepared automatically","Partial","Included"]]
function Comparison(){return <section className="el-comparison"><SectionSignal/><Reveal className="el-section-head"><span>The difference</span><h2>Not another booking tool.<br/><em>A new operating model.</em></h2><p>Legacy tools wait for clicks. Miraee understands intent, works within your policy, and completes the trip.</p></Reveal><Reveal><div className="el-compare-table" role="table" aria-label="Miraee compared with a legacy travel management company"><div role="row"><b role="columnheader">Capability</b><b role="columnheader">Legacy TMC</b><b role="columnheader">Miraee</b></div>{compareRows.map(r=><div role="row" key={r[0]}><span role="cell">{r[0]}</span><span role="cell">{r[1]}</span><strong role="cell">{r[2]}</strong></div>)}</div></Reveal></section>}

function BusinessCase(){return <section className="el-business-case"><Reveal className="el-section-head"><span>The business case</span><h2>Loved by employees.<br/><em>Trusted by finance.</em></h2></Reveal><div className="el-business-metrics">{[["01","Savings","20–30%","Wholesale savings, validated apples-to-apples versus incumbents"],["02","Automation","97%","Of the journey managed by the agent, end to end"],["03","One system","1","Platform for business and personal travel alike"]].map((x,i)=><Reveal key={x[0]} delay={i*.1}><div className="el-business-metric__label"><span>{x[0]}</span><b>{x[1]}</b></div><strong>{x[2]}</strong><p>{x[3]}</p><i aria-hidden="true"/></Reveal>)}</div></section>}

function Partners(){const points=[["01","Premium travelers","Access a large, engaged traveler base."],["02","Brand-forward NDC","Merchandise rich content in real time."],["03","The whole traveler","Win business and personal travel alike."]];return <section className="el-partners"><Reveal><span className="el-label">For airlines and suppliers</span><h2>Be part of<br/>your travelers’<br/>best experiences.</h2><p>Miraee puts partner brands in front of premium, high-frequency travelers—for the business trip and the personal one—with content they control.</p><Link className="el-button" to="/book-a-demo">Partner with Miraee <span aria-hidden="true">↗</span></Link></Reveal><div className="el-partner-points">{points.map((x,i)=><Reveal key={x[0]} delay={i*.08}><span>{x[0]}</span><b>{x[1]}</b><p>{x[2]}</p></Reveal>)}</div></section>}

function FeatureVisual({ type }: { type: "book"|"change"|"expense" }) {
  if(type==="book") return <img className="el-visual-img" src={bookingCardImg} alt="Trip options showing a multi-city flight itinerary with pricing"/>
  if(type==="change") return <img className="el-visual-img" src={changeCardImg} alt="Modification request showing requested flight changes and expected savings"/>
  return <img className="el-visual-img" src={expensesCardImg} alt="Trip expenses list with policy flags and auto-reconciled totals"/>
}

const features = [
  ["01","Plan and book","Ask naturally. Miraee searches live inventory, understands preferences, and applies policy before presenting the right journey.","book"],
  ["02","Handle every change","When plans change, the agent finds alternatives, checks cost and policy, and brings you one clear decision.","change"],
  ["03","Close the expense loop","Bookings, payments, receipts, and policy stay connected so expense management becomes seamless.","expense"]
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

function Outcomes() { const cards=[["For employees","Ask once. Get a complete, policy-safe trip.","A trip that feels personal—not procedural.","4.8/5","traveler experience"],["For finance","See committed spend before it becomes an expense.","Complete transparency over company expenditure.","20–30%","wholesale savings"],["For travel teams","Set the rules once and run the program by exception.","No more managing every single booking and update.","24/7","agent + human care"]]; return <section id="outcomes" className="el-outcomes"><Reveal className="el-section-head el-section-head--light"><span>Designed for everyone</span><h2>Less work.<br/><em>Better journeys.</em></h2></Reveal><div className="el-outcome-grid">{cards.map(([title,shift,expect,stat,statLabel],i)=><Reveal className="el-outcome" key={title} delay={i*.1}><span>0{i+1}</span><h3>{title}</h3><p className="el-outcome__shift">{shift}</p><p className="el-outcome__expect">{expect}</p><div><strong>{stat}</strong><small>{statLabel}</small></div></Reveal>)}</div></section> }

function Security() { return <section id="security" className="el-security"><SectionSignal/><Reveal><span className="el-label">Enterprise foundations</span><h2>Fast for people.<br/>Safe for the business.</h2><p>Every action is governed, permissioned, traceable, and ready for enterprise controls.</p></Reveal><div className="el-security__grid">{[["SOC 2","Operational controls"],["SSO / SCIM","Identity management"],["GDPR","Privacy by design"],["Audit logs","Every agent action"]].map((x,i)=><Reveal className="el-trust" key={x[0]} delay={i*.08}><i>0{i+1}</i><b>{x[0]}</b><span>{x[1]}</span></Reveal>)}</div></section> }

function CTA() { return <section className="el-cta"><SectionSignal light/><motion.div className="el-cta__halo" animate={{scale:[1,1.15,1],opacity:[.5,.8,.5]}} transition={{duration:7,repeat:Infinity}}/><Reveal><span className="el-label">See the agent in action</span><h2>See it, handle<br/>a real trip, live.</h2><p>Bring a real trip. We’ll show you how Miraee handles it in twenty minutes.</p><MotionLink whileHover={{y:-4,scale:1.02}} whileTap={{scale:.97}} className="el-button el-button--light" to="/book-a-demo">Book your demo <span aria-hidden="true">↗</span></MotionLink></Reveal></section> }

export default function HomeElegant(){ return <><a className="el-skip-link" href="#main-content">Skip to main content</a><SiteNav/><main id="main-content" className="el-site"><ScrollProgress/><GrainOverlay/><Hero/><ProofStrip/><Product/><Friction/><PlatformDifference/><CapabilityMatrix/><Outcomes/><HowItWorks/><Comparison/><BusinessCase/><Security/><Experiences/><div id="partners"><Partners/></div><CTA/></main><SiteFooter/></> }
