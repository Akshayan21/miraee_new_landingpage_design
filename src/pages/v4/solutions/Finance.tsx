import RoleShowcasePage from "./RoleShowcasePage"

// Dedicated Solutions: Finance Page
// Content strictly from Miraee Website Content - V4:
// Eyebrow: BUILT FOR EACH SEAT
// Subheadline: Everyone lands on a dashboard shaped to their role.
// Title: Finance
// Shift: You used to reconcile the past. Now you watch the present.
// Body: Committed spend shows at booking, not month-end. Track by department, category and top spenders; move reimbursements from pending to paid in one table. The CFO Dashboard rolls up spend vs budget, savings and cycle time, all exportable.
// Controls: accounts, approval chains, ceilings, suppliers, sign-off, log.

export default function V4SolutionFinance() {
    return (
        <RoleShowcasePage
            roleSlug="finance"
            roleTitle="Finance"
            shift="You used to reconcile the past. Now you watch the present."
            body="Committed spend shows at booking, not month-end. Track by department, category and top spenders; move reimbursements from pending to paid in one table. The CFO Dashboard rolls up spend vs budget, savings and cycle time, all exportable."
            controls={["accounts", "approval chains", "ceilings", "suppliers", "sign-off", "log"]}
        />
    )
}
