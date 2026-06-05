# Part 2 — AI Workflow Reflection

**What worked:** Cursor with Figma MCP to pull spacing, colors, and typography made scaffolding fast—`FilterPanel`, `RazorCard`, Zustand store, and layout with values like `#1a1a1a` and 280px panel width. Scoped prompts (“match toggle thumb to Figma”) kept follow-up fixes easy to verify in the diff.

**What didn’t:** AI missed details on the first build—filter materials, product data, and toggle styling needed manual Figma comparison. I trusted the initial grid until side-by-side review caught gaps. Search wasn’t in active filter chips though “Clear all” treated it as active.

**Next time:** Pull the full Figma spec via MCP first, implement section by section with a screenshot check before each commit, add search chips earlier, and use shadcn only where it matches the design.
