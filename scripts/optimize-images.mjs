// One-off / repeatable image optimizer.
// Converts oversized source photos to WebP and shrinks the favicon.
// Run with: npm run optimize:images
import sharp from "sharp"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { existsSync } from "node:fs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const assets = join(root, "src", "assets")

// Photos → WebP, capped at 1920px wide, quality 80.
const photos = [
    "timeline-1990s.png",
    "timeline-2000.png",
    "timeline_today.png",
    "timeline_agent.png",
    "miraee-traveler-hero.png",
    "miraee-team.png",
    "miraee-experience-market.png",
    "miraee-supplier-cabin.png",
    "miraee-role-employee.png",
    "miraee-role-finance.png",
    "miraee-role-travel-team.png",
    "miraee-about-company.png",
    "miraee-security-hero.png",
    "dashboard.png",
    "booking-card.png",
    "change-card.png",
    "expenses-card.png",
]

for (const file of photos) {
    const src = join(assets, file)
    if (!existsSync(src)) continue
    const out = src.replace(/\.png$/, ".webp")
    const info = await sharp(src)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(out)
    console.log(`${file} → ${file.replace(/\.png$/, ".webp")}  (${(info.size / 1024).toFixed(0)} KB)`)
}

for (const file of ["atribution-opt_out.png", "dispute_resolution.png"]) {
    const src = join(assets, file)
    if (!existsSync(src)) continue
    const out = src.replace(/\.png$/, ".webp")
    const info = await sharp(src).webp({ quality: 88, smartSubsample: true }).toFile(out)
    console.log(`${file} → ${file.replace(/\.png$/, ".webp")}  (${(info.size / 1024).toFixed(0)} KB)`)
}

// Favicon → 180×180 PNG (covers both favicon + apple-touch-icon).
const faviconSource = join(assets, "favicon.png")
if (existsSync(faviconSource)) {
    const favInfo = await sharp(faviconSource)
        .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toFile(join(assets, "favicon-180.png"))
    console.log(`favicon.png → favicon-180.png  (${(favInfo.size / 1024).toFixed(0)} KB)`)
}
