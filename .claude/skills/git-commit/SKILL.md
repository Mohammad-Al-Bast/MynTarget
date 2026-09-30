---
name: git-commit
description: Git version control assistant for the brain-learning-center-dashboard-dashboard project. Drafts conventional commit messages from staged changes, audits recent commit history for convention violations, helps name branches, and prepares pull request titles and descriptions. Use when committing, branching, opening a PR, or reviewing git history quality.
---

# git-commit

Git workflow assistant for brain-learning-center-dashboard-dashboard. Drafts commit messages, audits history, names branches, and prepares PRs -- all following the rules in `AGENTS.md` (`git-rules` section).

No co-author lines. No AI tool attributions. No generator signatures. Ever.

---

## Mode 1: Draft a Commit Message

When the user has staged changes and wants a commit message, run the following, then draft the message.

```bash
git diff --staged --stat
```

```bash
git diff --staged
```

Read both outputs carefully. Then:

1. Identify the correct **type** from the diff (feat / fix / refactor / style / perf / test / docs / chore / ci).
2. Identify the **scope** from the directories or domain most affected.
3. Write a subject line: `<type>(<scope>): <imperative-verb> <what-changed>` -- max 72 characters, lowercase, no period.
4. Decide if a body is needed. It is needed when:
   - The change is not obvious from the subject alone
   - There is a business reason worth recording
   - Multiple related things changed and context helps
5. If issues are referenced, add a footer (`Closes #N` or `Refs #N`).
6. Output the final message as a code block so the user can copy it directly.

### Subject line checklist before outputting

- [ ] Type is one of the valid types
- [ ] Scope matches the actual area changed
- [ ] Verb is imperative (add, fix, remove, extract, update, move, rename -- not added/adds/fixing)
- [ ] Under 72 characters
- [ ] Lowercase
- [ ] No period at end
- [ ] No AI attribution anywhere in the message

### Example output format

```
feat(orders): add bulk status update to order table

Allows operators to select multiple orders and apply a status
change in a single action, reducing repetitive clicks for
high-volume workflows.

Closes #214
```

---

## Mode 2: Audit Recent Commit History

When the user wants to check whether recent commits follow conventions, run:

```bash
git log --oneline -20
```

Then read each subject line and check against these rules:

| Check | Rule |
|---|---|
| Type | Starts with a valid type keyword |
| Format | `type(scope): subject` or `type: subject` |
| Case | All lowercase before the colon |
| Tense | Imperative (not past tense) |
| Length | Subject line under 72 characters |
| Clarity | Subject describes a real change, not "WIP", "fix", "update", "stuff" |
| Clean | No co-author lines, no AI attributions |

For any violation, note the commit hash, the problem, and what the corrected subject would look like.

Report format:

```
Commit History Audit (last 20)
==============================
Passing: N
Violations: N

[abc1234] "fixed bug" -- type missing, vague subject
  Suggested: fix(orders): resolve status badge not updating on cancel

[def5678] "Updated components and fixed styles" -- two concerns, past tense
  Suggested: split into two commits:
    style(globals): correct CSS property declaration order
    refactor(components): update import paths after directory restructure
```

---

## Mode 3: Name a Branch

When the user describes what they are about to work on, output a branch name following the convention:

```
<type>/<short-description>
```

Rules:
- Lowercase, hyphens only
- 3-5 word description
- Type matches what the commits on the branch will be
- No ticket numbers in the branch name (those go in commit footers)

Examples for common requests:

| Request | Branch name |
|---|---|
| "Add user profile page" | `feat/user-profile-page` |
| "Fix the login redirect loop" | `fix/login-redirect-loop` |
| "Clean up the order components" | `refactor/order-components` |
| "Update all dependencies" | `chore/update-dependencies` |
| "Add unit tests for useOrderFilters" | `test/order-filters-hook` |

---

## Mode 4: Prepare a Pull Request

When the user is ready to open a PR, run:

```bash
git log main..HEAD --oneline
```

```bash
git diff main...HEAD --stat
```

Read the commit list and diff stat to understand the full scope of the branch. Then draft:

**Title**: Same format as a commit subject -- `type(scope): description`, max 72 characters.

**Body structure**:

```
## What changed

- [bullet list of key changes, one per logical area]

## Why

[1-3 sentences on the motivation. What problem does this solve or what value does it add.]

## How to test

- [step-by-step manual test instructions]
- [any edge cases worth checking]

## References

Closes #N
```

Rules for the PR body:
- Write in plain declarative sentences -- no marketing language
- No em dashes
- No emojis
- No AI attribution of any kind
- "What changed" bullets are short noun phrases or imperative phrases, not full sentences
- "Why" is 1-3 sentences maximum -- if it needs more, the PR is too large

---

## Mode 5: Check for Common Git Hygiene Issues

Run a quick hygiene check on the current working tree and recent history.

```bash
git status
```

```bash
git stash list
```

```bash
git log --all --oneline --decorate | head -20
```

```bash
grep -rn "console\.log\|debugger\|TODO\|FIXME\|HACK" \
  app components hooks lib services \
  --include="*.tsx" --include="*.ts" \
  2>/dev/null | grep -v "node_modules\|.next" | head -30
```

Report:

```
Git Hygiene Check
=================
Uncommitted changes: [none / N files]
Stashed entries: [none / N stashes -- consider whether they are still needed]
Debugging artifacts in tracked files: [none / list with file:line]
Long-lived branches (older than 2 weeks): [list if any]
```

---

## What Never Appears in Any Output from This Skill

- `Co-Authored-By:` lines
- Any AI tool name (Claude, Codex, GPT, Copilot, Cursor, or any variant)
- "Generated by", "Created with", "AI-assisted"
- Emoji in commit messages or PR text
- Em dashes in any written output
