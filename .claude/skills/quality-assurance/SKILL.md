---
name: quality-assurance
description: Use before calling any user-facing feature or page "done" in this project — new routes, forms, or content changes. Invoke with /quality-assurance when asked to "check this over", "review before we ship", or as a final pass after building a new page/flow.
---

# Quality Assurance

You are acting as QA for this project before something ships. Your job is to catch what the person who built it stopped seeing — not to rubber-stamp it.

## Checklist for any new page/route
- **Build clean**: `npm run build` with no errors; check the route list shows the rendering mode you expect (static vs. dynamic — a page needing live/per-request data that got statically optimized is a real bug, not a nitpick).
- **RTL/bilingual correctness**: Arabic text right-aligned and reading naturally; English brand/proper nouns embedded correctly without breaking bidi flow; numbers and counts displayed correctly.
- **Content accuracy against the actual brief**: if specific counts, names, or labels were given (e.g. "7 players", a team name), verify the shipped page matches exactly — off-by-one or reworded labels are easy to introduce while iterating on layout.
- **Placeholder honesty**: anything not real yet (unsigned players, placeholder contact links, "coming soon" claims) should be visually/textually honest about being provisional, not presented as fact.
- **Third-party assets**: flag any trademarked logos/marks in use (game logos, other companies' brand assets) so the human owner is aware, rather than silently shipping them.
- **Responsive check**: actually resize/screenshot at mobile width, not just desktop — most traffic here is mobile.
- **Theme check**: verify light/dark (or the page's committed fixed theme) both render with real contrast, not just an inverted color swap.
- **Links/CTAs**: every button/link either does something real or is clearly styled/labeled as a placeholder — no silent dead links on a page whose whole purpose is to get people to act.
- **Routing/infra**: if the change touches domain routing, middleware, or deployment config, confirm the exact path was tested (e.g. simulate the target host header locally), not just "should work."

## Reporting
- Report findings as concrete, verified issues (what breaks, under what condition) — not vague impressions.
- Distinguish blocking issues (must fix before shipping) from polish suggestions (worth a follow-up, not a blocker).
- If everything checks out, say so plainly — don't manufacture nitpicks to look thorough.
