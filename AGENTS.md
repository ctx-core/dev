# ctx-core-dev

Composable monorepo of @ctx-core/* TypeScript packages. Functional-first, zero-dependency utilities.

## Architecture

```
lib/              187 packages — core utilities, reactive primitives, UI components
tools/            4 packages — dev tooling (git, package, TypeScript)
bin/              Shell scripts for build, dev environment, dependency management
dormant/          Archived/inactive packages
.changeset/       Changesets config for versioning
```

## Stack

- **Language:** TypeScript (ES2022 target, strict mode)
- **Package manager:** bun workspaces (migrated from pnpm)
- **Versioning:** Changesets
- **Test runner:** uvu
- **Build:** @ctx-core/build (custom)
- **Environment:** mise (.mise.toml)

## Core Package

`ctx-core` (v7.2.32) — 48 modular sub-exports (array, promise, rmemo, uuid, etc.). Each is tree-shakeable.

## Release Workflow

Three-step version → commit → publish:

```bash
# 1. Version bump — applies changesets, generates CHANGELOG diffs, populates COMMIT_EDITMSG files
changeset-version-COMMIT_EDITMSG

# 2. Recursive commit — opens editor for review, then commits in each workspace package
recursive-git-commit

# 3. Publish — parallel publish to npm, skips already-published versions
publish--force          # publish all
publish--force -d       # dry run
publish--force -s       # single package (run from package dir)
```

### How it works

- `changeset-version-COMMIT_EDITMSG` runs `bun changeset version` then `CHANGELOG-diff-COMMIT_EDITMSG` to populate per-package `COMMIT_EDITMSG` files from CHANGELOG diffs.
- `recursive-git-commit` creates a temp commit script, opens `$EDITOR` for review, then runs it in each workspace package + submodule. Uses `COMMIT_EDITMSG` if present, else empty message.
- `publish--force` uses GNU `parallel` to publish all packages concurrently via `bun publish`. Compares local version vs. npm registry — only publishes if version differs. Reports failures with joblog.

## Dependency Management

### Upgrade dependencies

```bash
# 1. Check npm registry and update all subpackage dependencies to latest, auto-create changesets
ctx_core__monorepo_pnpm__dependencies__update

# 2. Install updated dependencies
bun install

# 3. Then follow the Release Workflow (changeset-version-COMMIT_EDITMSG → recursive-git-commit → publish--force)
```

**How `ctx_core__monorepo_pnpm__dependencies__update` works:**
1. **Syncs the checkout first** — `ctx_core__workspace_submodules__check_stale.sh` fetches all 191 workspace submodules (`lib/*`, `tools/*`, `vendor/*`) in parallel, fast-forwards any that are behind, and aborts only if one could not be fast-forwarded
2. Runs `monorepo_pnpm__dependencies__update` (from `lib/monorepo/`) which queries the npm registry for latest versions of each dependency across all workspace packages
3. Filters out `@ctx-core/dev` and unchanged entries
4. Pipes results to `package-manifest-changeset` which auto-creates changeset entries for the version bumps

**Why the stale check exists:** the sweep rewrites each package manifest from what it
reads on disk. On a stale submodule checkout it does not under-update — it **reverts**
newer upstream work. Observed concretely: a sweep run against a checkout 8 commits
behind would have reintroduced a removed `elysia` dependency, dropped `bun-types`, and
reverted `typescript ^7.0.2` back to `next`.

These submodules are consumed, not developed in, so a behind checkout is a sync problem
to fix rather than a decision to surface — fast-forwarding is the **default**.

```bash
# Fast-forward everything that is behind, then re-check (the default)
ctx_core__workspace_submodules__check_stale.sh

# Report only, change nothing
ctx_core__workspace_submodules__check_stale.sh --check-only

# Bypass (does not make the revert safe — it just stops warning about it)
CTX_CORE_ALLOW_STALE_SUBMODULES=1 ctx_core__monorepo_pnpm__dependencies__update
```

A **diverged** submodule — one carrying local commits upstream does not have — is never
rewritten. It is reported and the sweep refuses, because fast-forwarding is recoverable
but discarding unpushed local work is not.

**Quick alternative** (less precise — uses semver ranges, no changesets):
```bash
bun-update    # runs: bun update && strip-workspace.sh
```

## Local Development with yalc

For testing local changes in consumer projects (e.g., briantakita.me-dev) without publishing to npm:

```bash
# Install yalc globally (one-time):
bun add -g yalc

# Publish all workspace packages to local yalc store + push to consumers:
yalc-publish-all.sh          # --push is the default

# Publish without pushing:
yalc-publish-all.sh --no-push

# In the consumer project, add packages from yalc:
yalc add rebuildjs relysjs @ctx-core/sass
bun install
```

**Why yalc instead of symlinks:** Cross-monorepo symlinks cause TypeScript type identity conflicts — the same package resolved from two different `node_modules` paths creates incompatible types. yalc copies packages into the consumer's `node_modules`, so all types resolve from a single tree.

**Workflow:** Edit in ctx-core-dev → `yalc-publish-all.sh` → consumer auto-updates (via `--push`). When done, `yalc remove --all` in the consumer to revert to npm versions.

## Dev Environment

```bash
# Start tmux dev layout (4 panes: shell, tig, build, etc.)
tmux-dev

# Watch mode build
build-watch
```

## Key Directories

| Path | Purpose |
|------|---------|
| `lib/ctx-core/` | Core utility package (48 exports) |
| `lib/monorepo/` | Monorepo automation scripts |
| `lib/monorepo/bin/` | Release workflow scripts |
| `tools/` | Dev tooling packages |
| `bin/` | Root-level shell scripts |
| `.changeset/` | Changesets config (`commit: false`, `access: restricted`) |

## Naming Convention

See [NAMING.md](NAMING.md) for the full Immutable Tag Naming Convention.

**Key rules:**
- Tags are lowercase singular, joined by `_` (snake_case)
- `__` separates namespaces/dimensions: `auth0__user__validate()`
- External names preserve their casing: `Response_header_name`
- Factory functions use `create_` prefix: `create_memo()`
- Reactive signals use `$` suffix: `pathname$`
- Types use `_T` suffix: `ctx_T`
- **Never mutate a name when composing it**

## Conventions

- Each `lib/*/` package publishes to `@ctx-core/*` on npm.
- `strip-workspace` removes `workspace:*` references before publish.
- COMMIT_EDITMSG files are per-package, auto-generated from CHANGELOG diffs.
- `.mise.toml` adds `bin/`, `node_modules/.bin/`, `lib/*/bin/`, `tools/*/bin/` to PATH.
- Changesets `access: restricted` default — overridden to `public` by `publish--force`.

## Git Rules

- Commit from within the repo, not from parent.
- Use `recursive-git-commit` for bulk commits across packages.
- `changeset-version-COMMIT_EDITMSG` must run before `recursive-git-commit`.


## Library Context Policy

This library follows the agent-loop library-context policy. Contributors
authoring `AGENTS.md`, `SKILL.md`, or runbooks in this repo must read:

[Library Context Policy](../instruction-files/LIBRARY_CONTEXT_POLICY.md)

before making changes.

<!-- tsift:code-navigation v=0.1.64 -->
## Code Navigation

Keep this block self-contained for Codex/OpenCode prompt reuse. If this repository also ships current `.claude/skills/tsift/SKILL.md` or `runbooks/code-navigation.md`, use those deeper runbooks for command detail instead of expanding this block.

Run `tsift status` at session start from the owning repo root. If the task or file lives under a git submodule (for example `src/tsift/...`), switch to that submodule root first so the harness loads the narrower local instructions and repo state instead of the superproject root. If status prints a `run:` recommendation for stale or missing tsift state, run `tsift status --fix` before relying on tsift results; when the harness cannot perform write commands, ask the user to run the printed command instead. Codex projects can install a prompt-time auto-reindex hook with `tsift init --codex`; OpenCode projects can install per-project tsift command shortcuts with `tsift init --opencode`.

Use the commands listed in its `use:` output:
- `tsift --envelope source-read <file> --budget normal` — AST-symbol projection with span metadata and source-window expansion commands (prefer over cat/head for source code files)
- `tsift --envelope symbol-read <symbol> --budget normal` — token-budgeted symbol body, AST span metadata, child refs, and graph/source expansion commands
- `tsift --envelope search <query> --budget normal` — AST-aware hybrid search preview (prefer over grep/rg)
- `tsift --envelope explain <symbol> --budget normal` — callers, callees, community preview
- `tsift graph <symbol> --callers` / `--callees` — call graph navigation
- `tsift summarize <symbol>` — cached summary (only when listed in `use:`)
- `tsift workflow search` — ordered exact/search/explain/summarize/digest recipe that preserves result handles across expansions

When a search envelope includes `report.scale_guard`, run one of its `narrow_commands` before dispatching parallel agents. The guard means the original result set or corpus is broad enough that fan-out should start from a narrower cited handle, path, or exact query.

Prefer bounded digest commands over raw transcript, diff, and verbose-log reads:
- `tsift --envelope session-review <path> --next-context --budget normal` or `tsift --envelope context-pack <path> --budget normal` instead of replaying long session docs, JSONL transcripts, or agent-doc runtime logs with `cat`, `tail`, or `sed`.
- `tsift diff-digest [path]` (`--cached`, `--revision <rev>`) instead of `git diff`, `git show`, or patch-style `git log`.
- `tsift --envelope digest-runner --kind test --path . --shell-command '<test command>'` / `tsift --envelope digest-runner --kind log --path . --shell-command '<build command>'` for noisy test/build/install output, or let the rewrite/hooks create those artifact-backed envelopes for `cargo test`, `pytest`, and verbose cargo commands.
- If RTK is installed, digest-runner delegates supported generic command families through `rtk rewrite` and records the chosen compact filter in `report.filter` while preserving tsift artifact handles.
- Codex, OpenCode, and other harnesses without Claude-style `PreToolUse` hooks should run `tsift rewrite --run '<command>'` before broad `rg`/recursive grep, raw transcript/session/log reads, `git diff`/`git show`/single-patch `git log`, `cargo test`/`pytest`, and cargo build/check/clippy/install commands so the same search, session-digest, diff-digest, and digest-runner rewrites apply manually. OpenCode can install this path as `/tsift-rewrite-run` with `tsift init --opencode`.

For local verification, run `make check` before committing. After local changes, check the latest GitHub Actions CI run with `gh run list --workflow CI --limit 1` and fix any failing tests before calling the work complete.

Only read full source files when tsift results are insufficient.
<!-- /tsift:code-navigation -->
