import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Travel Leads Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Travel leads (TC)
// Before: Processing bookings one by one, chasing travelers for status,
//   and running MICE and group trips through separate tools and
//   spreadsheets.
// With Miraee: Now you run a program.
// Body: A Live Tracker shows route, status and ETA for every traveler in
//   motion. The Booking Queue holds every open request in one place, with
//   analytics by team, entity and route. MICE and group booking built in,
//   direct supply through Mondee.
// Controls: Live Tracker · Booking Queue · Program analytics
// Detail grid: "An assistant that handles all your work, digitally" --
//   live tracker, booking queue and program analytics, each its own card.

const ICON_LIVE_TRACKER = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="7" r="2.2" />
        <circle cx="18" cy="17" r="2.2" />
        <path d="M8 8.5c3 2 5 4 8 6.5" strokeDasharray="2 3" />
    </svg>
)
const ICON_QUEUE = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h10" />
    </svg>
)
const ICON_PROGRAM = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.2" />
        <circle cx="5" cy="17" r="2.2" />
        <circle cx="19" cy="17" r="2.2" />
        <path d="M12 7.2L6.3 15M12 7.2l5.7 7.8M7 17h10" />
    </svg>
)

export default function V4SolutionTravelLeads() {
    return (
        <RoleShowcasePage
            roleSlug="travel-leads"
            roleTitle="Travel leads (TC)"
            shift="You used to process bookings. Now you run a program."
            before="Processing bookings one by one, chasing travelers for status, and running MICE and group trips through separate tools and spreadsheets."
            afterHeading="Now you run a program."
            body="A Live Tracker shows route, status and ETA for every traveler in motion. The Booking Queue holds every open request in one place, with analytics by team, entity and route. MICE and group booking built in, direct supply through Mondee."
            controls={["Live Tracker", "Booking Queue", "Program analytics"]}
            detailsHeading="An assistant that handles all your work, digitally."
            details={[
                {
                    icon: ICON_LIVE_TRACKER,
                    title: "Everyone in motion, on one screen.",
                    body: "The Live Tracker shows route, status, flight and ETA, alongside Active Trips, Upcoming and Travelers Abroad at a glance.",
                },
                {
                    icon: ICON_QUEUE,
                    title: "Every request in one queue.",
                    body: "The Booking Queue holds every open booking, traveler, dates, items and status, so nothing slips.",
                },
                {
                    icon: ICON_PROGRAM,
                    title: "A program, not just bookings.",
                    body: "Analytics by team, entity and route, with MICE and group booking built in and direct supply through Mondee.",
                },
            ]} />
    )
}
