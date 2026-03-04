---
session: ac459535-6cee-47ba-87dd-88f33ea6bd2f
resume: null
agent: null
model: null
branch: null
---
# Immutable Tag Naming Convention

A universal naming meta-convention. Works with any codebase — camelCase, PascalCase, snake_case. Evolved from the [Tag Path](https://briantakita.me/posts/tag-vector-0-introduction) system.

## Core Principle

**Never mutate a name when composing it into a larger name.**

This one rule gives you: literal string search finds **every** usage of any tag, regardless of position in a compound name.

## How it works with any convention

The immutable tag convention doesn't replace your repo's style — it extends it. Whatever naming convention the codebase uses, immutability is preserved by joining with `_`:

### In a camelCase repo (JS/TS)

External camelCase names are preserved. New tags compose with `_`:

```ts
// camelCase name from a dependency — keep it as-is
import { createContext } from 'react'

// Extend with immutable tags: createContext + auth
function createContext_auth() { return createContext(null) }

// Or wrap conventionally
function createAuthContext() { return createContext(null) }  // mutates "auth" → "Auth"
```

With immutable tagging, `createContext` stays searchable as one tag. With conventional `createAuthContext`, searching for `createContext` won't find it.

### In a PascalCase repo (types, classes)

```ts
// PascalCase type from platform — keep it
type Response_header = { name: string, value: string }

// PascalCase class from framework — keep it
class Elysia_compression_plugin extends Plugin { ... }

// Search for "Response" or "Elysia" — always found
```

### In a snake_case repo (Python, Rust, ctx-core)

Native compatibility. snake_case is already immutable:

```python
person_name = "Elon Musk"        # person + name — both searchable
company_person_name = "Elon Musk" # company + person + name
```

## Rules

### 1. Tags are singular

Never pluralize. Use collection suffixes (see Data Shape) or the word `list`/`set`:

```ts
const post_list = [...]            // not "posts"
const company_name_a = [...]       // array suffix
```

Why: `company` is always `company`. Searching for `company` finds every usage. Pluralization (`companies`) breaks the search.

### 2. `_` joins tags

Standard underscore join. Each tag preserves its exact spelling:

```ts
const person_name = 'Elon Musk'
const company_person_name = 'Elon Musk'
```

In a camelCase codebase, use `_` to extend existing names:

```ts
const fetchData_user = fetch('/api/user')    // fetchData (external) + user (your tag)
```

### 3. `__` separates dimensions / namespaces

Double underscore joins multi-dimensional vectors or domain namespaces:

```ts
function auth0__user__validate() { ... }
function blog_post__estimate_read_minutes() { ... }
const as_of_2023__highest_net_worth__company_person_name = 'Elon Musk'
```

### 4. External names preserve their casing

Whatever convention a dependency or platform uses — keep it:

```ts
const Response_header_name = '...'         // Response from Web API
const HTMLElement_class_list = '...'       // HTMLElement from DOM
const createElement_form = '...'           // createElement from React
const useEffect_cleanup = '...'            // useEffect from React
```

### 5. Factory functions

Use whichever prefix your codebase convention prefers:

| Convention | Pattern | Example |
|---|---|---|
| snake_case | `create_` prefix | `create_memo()`, `create_cache()` |
| camelCase | `create` prefix | `createMemo()` (external), `createMemo_auth()` (extended) |
| Short utilities | No prefix | `memo()`, `sig()`, `ctx()` |

### 6. Reactive signals use `$` suffix

```ts
const pathname$ = sig('/')
const auth_domain$ = sig('example.auth0.com')
```

Aligns with Svelte (`$:`) and RxJS (`observable$`) conventions.

### 7. Types use `_T` suffix

```ts
type ctx_T = { ... }
type post_meta_T = { title: string, slug: string }
```

## Data Shape Suffixes

Encode the data structure in the name:

| Suffix | Meaning | Example |
|--------|---------|---------|
| `_a` | Array | `post_a`, `company_person_name_a` |
| `_R` | Record | `company_id_R_ceo_name` |
| `_M` | Map | `company_id_M_ceo_name` |

## Reactive Patterns

Signal triples follow `[signal$, getter, setter]`:

```ts
const [auth_domain$, auth_domain, set_auth_domain] = use_sig_triple()
```

Reactive behaviors/effects use `use_` prefix (React/Solid convention):

```ts
function use_sig_triple() { ... }
```

## Package Names

Double-dash `--` separates domain hierarchy:

```
domain--server--briantakita
ui--browser--blog
```

Pattern: `<category>--<platform>--<feature>`

## Why immutability matters

| Property | Immutable Tag | camelCase | PascalCase |
|----------|---------------|-----------|------------|
| Case preserved | Yes | No — mutates 2nd word | No — mutates 1st word |
| Singular preserved | Yes | No — uses plurals | No — uses plurals |
| Grep-exact | Yes | Needs regex | Needs regex |
| Works with any base convention | Yes | — | — |

**The key test:** Can you search for any tag as a literal string and find every usage? Immutable tagging says yes. camelCase says no — `person` in `personName` requires case-insensitive search and produces false positives.

## Interop

The convention is designed for gradual adoption:

1. **New names** in an existing codebase — use immutable tags to extend existing names
2. **Existing names** — leave them alone, don't rename
3. **Public APIs** — optionally export conventional aliases alongside immutable names:

```ts
export function create_auth_context() { ... }
export const createAuthContext = create_auth_context  // conventional alias
```

The goal is not to replace your codebase's convention but to add immutability as a composable property.
