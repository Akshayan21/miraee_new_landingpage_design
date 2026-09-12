import RoleShowcasePage from "./RoleShowcasePage"
import financeVideo from "../../../assets/Video/Finance.mp4"
import financePhoto from "../../../assets/finance.jpg"

// Solutions: Finance Page
// Content strictly from Miraee Website Content - V4 & User Instructions
// Video: Finance.mp4 (muted, loop, background, no buttons/emojis)

export default function V4SolutionFinance() {
    return (
        <RoleShowcasePage
            roleSlug="finance"
            roleTitle="Finance"
            ctaText="Explore the Finance solution"
            shift="Rechecking each department's spend separately, untangling one misfiled entry or a missing one that keeps the books from matching, and delays in reporting all round. Now full control on spends, all in one place."
            before="Rechecking each department's spend separately, untangling one misfiled entry or a missing one that keeps the books from matching, and delays in reporting all round."
            afterHeading="Unprecedented visibility and cost control."
            body="Stop savings leakage, automate reconciliation, and drive hard-dollar savings straight to the bottom line."
            controls={["Accounts", "Approval chains", "Ceilings", "Suppliers", "Sign-off", "Audit log"]}
            videoSrc={financeVideo}
            roleImage={financePhoto}
            detailGroups={[
                {
                    eyebrow: "The pains you know",
                    heading: "Where finance still bleeds money.",
                    items: [
                        {
                            title: "Fragmented spend.",
                            body: "A dozen vendors across five systems creates blind spots and spending no one is tracking.",
                        },
                        {
                            title: "Administrative drain.",
                            body: "Finance loses thousands of hours a year chasing missing receipts and fixing GL coding errors.",
                        },
                    ],
                },
                {
                    eyebrow: "How Miraee answers each",
                    heading: "Savings that compound, admin that disappears.",
                    items: [
                        {
                            title: "Better fares, on every search.",
                            body: "Miraee compares Tabhi wholesale, your own contracts, Miraee deals and third-party content on every search: an illustrative 20–30% saving on fares.*",
                        },
                        {
                            title: "Savings the travellers help you make.",
                            body: "Each traveller sees a Price-to-Beat. Choose cheaper and part of the saving goes to their personal wallet: an illustrative 5–10% further reduction in spend, driven by behaviour, not policing.*",
                        },
                        {
                            title: "Admin and recovery, automated.",
                            body: "Receipts are captured, coded to the right GL and checked against policy automatically. Miraee actively recovers unused tickets, unclaimed refunds and duplicate reimbursements: an illustrative 1,200+ admin hours saved a year.*",
                        },
                    ],
                    footnote: "*Illustrative figures based on aggregate customer data. Individual results vary by route, policy and travel mix.",
                },
            ]}
        />
    )
}
