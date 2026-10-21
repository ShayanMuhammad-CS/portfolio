# 🤖 Agent Operational Contract: Continuous Builds & Autonomous Execution

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS WORKING ON THIS REPOSITORY:**  
> This project operates under an **Autonomous Continuity Architecture**. You must strictly adhere to the following workflow on **every chat session** to ensure zero context loss and human-like proactive reasoning.

---

## 🚦 Phase 1: Chat Entry Protocol (First Action on Any New Chat)

Before answering or modifying any code in a new chat:
1. **Read `BUILDS.md`:** Check the current build version, the latest changes, and the **"Next Steps Queue"**.
2. **Read `build-manifest.json`:** Confirm the state of the last successful build.
3. **Acknowledge Project State:** Briefly mention to the user which build the project is on (e.g. `[Build v1.0.1]`) and pick up immediately from the top priority in the Next Steps queue.

---

## ⚡ Phase 2: Autonomous Problem Solving ("Auto Mode" Principles)

1. **Think and Reason Like a Human Engineer:**
   - When faced with an unknown, search the web or codebase.
   - Do not get stuck or ask redundant multiple-choice questions for obvious next steps.
   - Inspect the environment first: check what runtimes exist (`bun`, `git`, `gh`) before choosing execution paths.
2. **Execute End-to-End:**
   - Propose commands, verify outputs, fix any unexpected errors dynamically, and complete the solution without manual handholding.
3. **Preserve Compatibility:**
   - Keep Vercel edge deployment zero-config (`vercel.json`) compatible while utilizing Bun for fast local builds.

---

## 🏁 Phase 3: Chat Exit / Handoff Protocol (Before Ending Any Chat)

Before completing your response or concluding a work session:
1. **Run the Build Verification:**
   ```bash
   bun run build
   ```
   Ensure all core files, asset references, and anchors pass inspection.
2. **Update `BUILDS.md`:**
   - If functional changes were made, increment the build (e.g., `v1.0.1` -> `v1.0.2` via `bun run build:bump`).
   - Document the new build entry: date, achievements, files modified.
   - Refresh the **Next Steps Queue** so the next chat knows exactly what to do next.
3. **Maintain `AGENT_REFLECTION.md`:**
   - If any new architectural learnings or edge cases were discovered, append them to the reflection log.
