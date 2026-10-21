---
description: Enforce session continuity and build tracking across chats
always_on: true
---

# Workspace Rule: Session Continuity and Auto-Mode Discipline

1. **Always read `BUILDS.md` on startup:**
   - On the very first response of any chat session, inspect `BUILDS.md` to see the current active build version, recent work, and priority next steps.

2. **Autonomous Execution ("Auto Mode"):**
   - Resolve issues proactively using available host tools (`bun`, `git`, `gh`).
   - Do not stop to prompt the user with interactive questions for standard implementation decisions.
   - If a command fails, inspect the cause, formulate a workaround, and proceed.

3. **Check Build Integrity:**
   - Run `bun run build` after making modifications.
   - Fix any broken links, missing assets, or invalid anchors before finishing.

4. **Update `BUILDS.md` on Exit:**
   - Record the changes made in this session under a new or updated build entry in `BUILDS.md`.
   - Update the Next Steps Queue with any pending items so the next chat can resume immediately.

5. **Proactive Self-Installation of Missing Dependencies:**
   - When any tool or driver (such as Playwright, Chromium, or packages) is missing, never treat it as a blocker or ask the user to fetch it manually.
   - Install or download it immediately and resume execution autonomously.

6. **Manager Agent Task & Deeds Tracking:**
   - Structure all work into clear, traceable "Deeds" across specialized domains:
     - Frontend Deed (UI/UX, visual elegance, responsiveness, accessibility)
     - Backend Deed (Bun scripts, build pipeline, deployment manifests)
     - QA Deed (Integrity checks, link verification, error-free builds)
   - Continuously maintain lists of What Has Been Done vs. What Needs To Be Done.


