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
pnpm-publish--force          # publish all
pnpm-publish--force -d       # dry run
pnpm-publish--force -s       # single package (run from package dir)
```

### How it works

- `changeset-version-COMMIT_EDITMSG` runs `pnpm changeset version` then `CHANGELOG-diff-COMMIT_EDITMSG` to populate per-package `COMMIT_EDITMSG` files from CHANGELOG diffs.
- `recursive-git-commit` creates a temp commit script, opens `$EDITOR` for review, then `pnpm recursive exec` runs it in each package. Uses `COMMIT_EDITMSG` if present, else empty message.
- `pnpm-publish--force` uses GNU `parallel` to publish all packages concurrently. Compares local version vs. npm registry — only publishes if version differs. Reports failures with joblog.

## Dependency Management

### Upgrade dependencies

```bash
# 1. Check npm registry and update all subpackage dependencies to latest, auto-create changesets
ctx_core__monorepo_pnpm__dependencies__update

# 2. Install updated dependencies
pnpm i --recursive

# 3. Then follow the Release Workflow (changeset-version-COMMIT_EDITMSG → recursive-git-commit → pnpm-publish--force)
```

**How `ctx_core__monorepo_pnpm__dependencies__update` works:**
1. Runs `monorepo_pnpm__dependencies__update` (from `lib/monorepo/`) which queries the npm registry for latest versions of each dependency across all workspace packages
2. Filters out `@ctx-core/dev` and unchanged entries
3. Pipes results to `package-manifest-changeset` which auto-creates changeset entries for the version bumps

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
- Changesets `access: restricted` default — overridden to `public` by `pnpm-publish--force`.

## Git Rules

- Commit from within the repo, not from parent.
- Use `recursive-git-commit` for bulk commits across packages.
- `changeset-version-COMMIT_EDITMSG` must run before `recursive-git-commit`.
