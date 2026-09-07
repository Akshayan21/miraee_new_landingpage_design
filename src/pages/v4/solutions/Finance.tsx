import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Finance Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Finance
// Before: Rechecking each department's spend separately, untangling one
//   misfiled entry or a missing one that keeps the books from matching, and
//   delays in reporting all round.
// With Miraee: Full control on spends, all in one place.
// Body: Committed spend shows at booking, not month-end. Track by
//   department, category and top spenders, and move reimbursements from
//   pending to paid in one table. The CFO Dashboard rolls up spend vs
//   budget, savings and cycle time, all exportable.
// Controls: accounts, approval chains, ceilings, suppliers, sign-off, log.
// Detail grid: "Close the books without chasing them" -- reports, spend
//   visibility and reimbursement automation, each as its own card.

const ICON_REPORT_READY = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
    </svg>
)
const ICON_SPEND_TRACKED = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
)
const ICON_REIMBURSE = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3" />
        <path d="M18 3v4h-4M6 21v-4h4" />
    </svg>
)

export default function V4SolutionFinance() {
    return (
        <RoleShowcasePage
            roleSlug="finance"
            roleTitle="Finance"
            shift="You used to reconcile the past. Now you watch the present."
            before="Rechecking each department's spend separately, untangling one misfiled entry or a missing one that keeps the books from matching, and delays in reporting all round."
            afterHeading="Full control on spends, all in one place."
            body="Committed spend shows at booking, not month-end. Track by department, category and top spenders, and move reimbursements from pending to paid in one table. The CFO Dashboard rolls up spend vs budget, savings and cycle time, all exportable."
            controls={["accounts", "approval chains", "ceilings", "suppliers", "sign-off", "log"]}
            detailsHeading="Close the books without chasing them."
            details={[
                {
                    icon: ICON_REPORT_READY,
                    title: "Reports that arrive ready.",
                    body: "Custom reporting shaped to each reader and exported in a click, no rebuilding the same spreadsheet every close.",
                },
                {
                    icon: ICON_SPEND_TRACKED,
                    title: "Every spend already accounted for.",
                    body: "Each expense is registered as it happens, with live spend tracking by department and category, so nothing surfaces late.",
                },
                {
                    icon: ICON_REIMBURSE,
                    title: "Reimbursements that move themselves.",
                    body: "Expenses connect directly to My Trips, so categorization is simple, or travelers can file by uploading a receipt or bank statement. Miraee extracts the specific trip expense, splits business from personal, and posts it straight to the ERP system, without the manual chase.",
                },
            ]} />
    )
}
