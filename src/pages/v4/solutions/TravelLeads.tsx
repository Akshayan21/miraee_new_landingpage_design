import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Travel Leads Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Travel leads (TC)
// Shift: You used to process bookings. Now you run a program.
// Body: A Live Tracker shows route, status and ETA for every traveler in motion. The Booking Queue holds every open request in one place, with analytics by team, entity and route. MICE and group booking built in, direct supply through Mondee.
// Controls: Live Tracker · Booking Queue · Program analytics

export default function V4SolutionTravelLeads() {
    return (
        <RoleShowcasePage
            roleSlug="travel-leads"
            roleTitle="Travel leads (TC)"
            shift="You used to process bookings. Now you run a program."
            body="A Live Tracker shows route, status and ETA for every traveler in motion. The Booking Queue holds every open request in one place, with analytics by team, entity and route. MICE and group booking built in, direct supply through Mondee."
            controls={["Live Tracker", "Booking Queue", "Program analytics"]}
        />
    )
}
