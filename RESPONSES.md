# Part 2 — AI Workflow Reflection

**What worked:** Cursor with Figma MCP to pull spacing, colors, and typography made scaffolding fast—`FilterPanel`, `RazorCard`, Zustand store, and layout with values like `#1a1a1a` and 280px panel width. Scoped prompts (“match toggle thumb to Figma”) kept follow-up fixes easy to verify in the diff.

**What didn’t:** AI missed details on the first build—filter materials, product data, and toggle styling needed manual Figma comparison. i had to fix the featured "box" and in satock toggle as part of design issues. Search wasn’t in active filter chips though “Clear all” treated it as active.

**Next time:** Begin the full implementation on cursor terminal, implement section by section with a screenshot check before each commit, add search chips earlier, implement the ui first so i can test each segment on a visual level first.
