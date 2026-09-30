---
name: arch-review
description: Architecture audit and improvement driver for the brain-learning-center-dashboard-dashboard codebase. Scans for structural violations -- oversized files, duplicated code, misplaced logic, bad naming, inline constants -- and surfaces prioritized refactoring opportunities. Use when reviewing architecture, improving structure, auditing a feature, or doing a periodic codebase health check.
---

# arch-review

Architecture audit for the brain-learning-center-dashboard-dashboard codebase. Runs structured checks against the rules in `AGENTS.md` (`code-architecture-rules` section), reports violations by priority, and applies or recommends specific fixes.

---

## What This Skill Checks

1. File size violations, but not 100% strict in some case it can pass (components >150 lines, pages >80, utils >60)
2. Logic in component bodies (state/effects that belong in custom hooks)
3. Duplicated JSX blocks or logic across files
4. Inline magic values (hardcoded strings, numbers, routes)
5. Missing separation of concerns (API calls in components, types defined inline)
6. Naming convention violations
7. Client components that should be Server Components
8. Missing or misplaced constants, types, services

---

## Step 1: File Size Audit

Find oversized files first -- they almost always contain multiple responsibilities.

```bash
echo "=== Pages over 80 lines ===" && \
find app -name "page.tsx" | xargs wc -l | sort -rn | awk '$1 > 80 && $2 != "total"'

echo "=== Components over 150 lines ===" && \
find components -name "*.tsx" | xargs wc -l | sort -rn | awk '$1 > 150 && $2 != "total"'

echo "=== Hooks over 100 lines ===" && \
find hooks -name "*.ts" -o -name "*.tsx" | xargs wc -l 2>/dev/null | sort -rn | awk '$1 > 100 && $2 != "total"'

echo "=== Utilities over 60 lines ===" && \
find lib -name "*.ts" | xargs wc -l 2>/dev/null | sort -rn | awk '$1 > 60 && $2 != "total"'
```

For each violation, read the file and identify what responsibilities to split out.

---

## Step 2: Logic in Component Bodies

Find component files that contain business logic that should be in a custom hook.

```bash
echo "=== Components with useState ===" && \
grep -rl "useState" components --include="*.tsx" | grep -v "components/ui"

echo "=== Components with useEffect ===" && \
grep -rl "useEffect" components --include="*.tsx" | grep -v "components/ui"

echo "=== Components with fetch or axios ===" && \
grep -rn "fetch(\|axios\." components --include="*.tsx" | grep -v "components/ui"
```

For each result, check whether the state/effect is purely UI-driven (e.g., a toggle, a focus trap) or business-driven (data fetching, form submission, calculations). Business-driven logic must move to a hook in `hooks/`.

---

## Step 3: Inline Constants and Magic Values

```bash
echo "=== Hardcoded route strings ===" && \
grep -rn '"\/' app components hooks --include="*.tsx" --include="*.ts" \
  | grep -v "node_modules\|.next\|import\|require\|// " \
  | grep -v 'components.json\|tsconfig' \
  | head -30

echo "=== Hardcoded API paths ===" && \
grep -rn '"/api/' app components hooks services --include="*.tsx" --include="*.ts" \
  | grep -v "node_modules\|.next\|// " | head -30

echo "=== Magic numbers (non-zero, non-one standalone numbers) ===" && \
grep -rn '\b[2-9][0-9]*\b' components hooks lib --include="*.tsx" --include="*.ts" \
  | grep -v "node_modules\|.next\|// \|className\|px\|rem\|ms\|s " | head -30
```

Any string or number that appears more than once or has business meaning belongs in `constants/`.

---

## Step 4: Duplication Scan

Identify JSX and logic that appears in multiple files.

```bash
echo "=== Repeated className patterns (possible shared component candidates) ===" && \
grep -roh 'className="[^"]\{40,\}"' components app --include="*.tsx" \
  | sort | uniq -c | sort -rn | head -20

echo "=== Files importing the same set of hooks (may share logic) ===" && \
grep -rl "useState\|useEffect\|useCallback" components --include="*.tsx" \
  | grep -v "components/ui" | head -20
```

Then read the flagged files and look for repeated JSX structure (same card layout, same empty state, same form row pattern). Each repetition is a component waiting to be extracted.

---

## Step 5: Naming Convention Check

```bash
echo "=== Hooks not starting with 'use' ===" && \
find hooks -name "*.ts" -o -name "*.tsx" | grep -v "/use" | grep -v "node_modules"

echo "=== Component files not in PascalCase ===" && \
find components -name "*.tsx" | grep -v "components/ui" \
  | awk -F/ '{file=$NF; gsub(".tsx","",file); if(file !~ /^[A-Z]/) print}'

echo "=== Boolean variables without is/has/can prefix ===" && \
grep -rn "const \(loading\|error\|open\|visible\|active\|enabled\|disabled\)\b" \
  components hooks app --include="*.tsx" --include="*.ts" \
  | grep -v "node_modules\|.next\|// " | head -20

echo "=== Event handlers not prefixed with 'handle' ===" && \
grep -rn "const \(submit\|click\|change\|close\|open\|save\|delete\|cancel\)\b" \
  components app --include="*.tsx" \
  | grep -v "node_modules\|.next\|// " | head -20
```

---

## Step 6: Client vs Server Boundary

```bash
echo "=== Files with 'use client' ===" && \
grep -rl '"use client"' app components --include="*.tsx" --include="*.ts" \
  | grep -v "node_modules\|.next"

echo "=== 'use client' files that also fetch data (should be Server Components) ===" && \
grep -rl '"use client"' app components --include="*.tsx" \
  | xargs grep -l "fetch(\|axios\." 2>/dev/null \
  | grep -v "node_modules\|.next"
```

A file with `"use client"` that also fetches data is almost always wrong. The fetch should happen in a parent Server Component and be passed down as props.

---

## Step 7: Missing Directory Structure

Check that the layer separation exists:

```bash
echo "=== Directory structure ===" && \
ls -d app components hooks services lib constants types 2>/dev/null || echo "Some directories missing"

echo "=== Services directory ===" && \
ls services/ 2>/dev/null || echo "No services/ directory (API calls may be scattered)"

echo "=== Constants directory ===" && \
ls constants/ 2>/dev/null || echo "No constants/ directory (magic values likely inline)"

echo "=== Types directory ===" && \
ls types/ 2>/dev/null || echo "No types/ directory (types may be defined inline)"
```

If a directory is missing and the codebase is non-trivial, create it and migrate the relevant files.

---

## Reporting Format

After running all steps, produce a report in this format:

```
Architecture Audit Report
=========================
Date: [today]
Files scanned: N

CRITICAL (fix before next feature)
---
- [file]: [violation] -- [recommended action]

HIGH (fix this sprint)
---
- [file]: [violation] -- [recommended action]

MEDIUM (schedule for refactor)
---
- [file]: [violation] -- [recommended action]

QUICK WINS (under 10 minutes each)
---
- [specific action]

Missing infrastructure
---
- [ ] services/ directory
- [ ] constants/ directory
- [ ] types/ directory
```

Severity guide:
- **Critical**: logic/data-fetching in component body, file 2x over limit, duplicated business logic
- **High**: file over limit, inline API routes, duplicated JSX block
- **Medium**: naming violations, missing type extractions, minor duplication
- **Quick win**: rename a boolean, extract a single constant, move a type to `types/`

---

## Common Refactor Patterns

### Extract component from oversized file

When a component is over 150 lines, identify the largest self-contained JSX block, move it to a new file in the same directory, and import it:

```
Before: components/orders/OrderDashboard.tsx (220 lines, contains OrderTable and OrderFilters)
After:
  components/orders/OrderDashboard.tsx (80 lines, composes the two)
  components/orders/OrderTable.tsx (90 lines)
  components/orders/OrderFilters.tsx (60 lines)
```

### Extract custom hook from component

When a component contains `useState` + `useEffect` + handler functions that all relate to one concern:

```
Before: components/orders/OrderList.tsx (contains fetch logic, pagination state, filter state, JSX)
After:
  components/orders/OrderList.tsx (JSX only, receives data and handlers via hook)
  hooks/orders/useOrderList.ts (all state, effects, and handlers)
```

### Extract constant

```
Before: <div className="max-w-[1280px]"> in 4 files
After:  constants/ui.ts -> export const CONTENT_MAX_WIDTH = "max-w-[1280px]"
        Usage: <div className={CONTENT_MAX_WIDTH}>
```

### Extract service function

```
Before: const res = await fetch("/api/orders") inside a hook in 3 places
After:  services/orders.service.ts -> export const fetchOrders = () => fetch("/api/orders")
        Hooks import from the service
```

---

## When to Run

Run this skill:
- At the start of a new feature (audit the area you are about to touch)
- After a feature is complete (catch structural debt before it merges)
- Periodically as a standalone codebase health check
- When a file is about to be modified and feels complex -- audit it first, refactor if needed, then add the feature
