ctx-core

A composable monorepo web-service/front-end toolkit that emphasizes:

* starter apps & quick prototyping with a scalable architecture
* {up,down}-scalable complexity
* functional-dominant hybrid style of programming
* data flow
* simple & composable interfaces
* reuse across projects
* anti-fragile development

# Install

## NPM packages

The simplest way to use @ctx-core packages is to simply use npm to install them.

## Forking ctx-core with Lerna & git submodule

If you want to fork ctx-core for your own usage you can:

* fork this repository
* install [lerna](https://lerna.js.org/) to manage multiple repositories
* `git submodule add <ctx-core-fork-url> lib/ctx-core`
* If you use a read-only git url for deployment & want to edit your ctx-core fork,
		you can edit the git config
	* `vim .git/modules/lib/ctx-core/config`
	* edit `url = git@github.com:your-fork-account/ctx-core.git`

# Usage

1. Fork ctx-core & add your ctx-core fork as a git submodule.
1. Create a `.gitignore` file in your project with
```shell
/.env
```
1. Create a .env file (see the .env.sample.* files in the ctx-core directory)

Please send pull requests.

# Technologies

* [es6](https://github.com/lukehoban/es6features)
* [sveltejs](https://svelte.technology/)
* [sapper](https://sapper.svelte.dev/)

# Techniques

* [Reactive Programming](https://www.wikiwand.com/en/Reactive_programming)
* [Explicit Naming Conventions](http://www.briantakita.com/posts/naming-conventions/)

# Explicit Domain Driven Design

"The Map is not the territory"

<em>—Alfred Korzybski</em>

"All non-trivial abstractions, to some degree, are leaky"

<em>—Joel Spolsky</em>

I view software as a creative model of Existence. Software, in emulating other entities in Existence, also exists as entities.

Language, using a schema, provides a system of abstraction enabling one to model something.
Language is context sensitive & composable. With the Language tool, we craft systems of illusion, intelligence, & life.

## Naming Conventions

Source Code is a UX to interface with the raw machine.

The affordances provided by programming languages allows one to:

* name abstractions
* create patterns & metaphor
* express one's model of Existence
* create a tool to perform work

# Optionality — Degrees of Freedom over Forecasting

I prefer to have optionality over compound planing (assumptions, based on assumptions, &hellip;).
We live in a complex & interconnected existence; with the potential for a diverse set of outcomes.
Complexity, interconnectivity, novelty, & creation is beyond any single entity's ability to effectively forecast.

Language evolves as our conscious understanding evolves&hellip;& vice versa.
Ambiguity is a tool of consciousness to compel us to explore the dissonance in our current model of Existence.
Follow the rabbit hole&hellip;and a richer Existence awaits.

# Monorepo

I chose to use a monorepo:

* to reduce development friction in managing my various projects
* to utilize patterns across my projects

Monorepos are, once again, gaining favor as a way to efficiently manage disparate projects.
I choose to use monorepos across my projects to create value & optionality for my clients and to model abstract patterns to continuously improve the products.

# Demos

I work for clients that often utilize proprietary data sources. Currently, ctx-core has a starter app that is a quovo portfolio viewer.
I am working on creating more starter apps & getting a demo account with quovo.

In the mean time, I can do private demos (with additional examples that I can't show in public) on Google Hangout. Please contact me at: <a href="mailto:brian.takita+ctx-core@gmail.com?subject=ctx-core">brian.takita@gmail.com</a>

# Acknowledgements & Gratitude

Thank you to all of you adventurous spirits who push the edge, cross boundaries, & create convergence to enrich our collective Existence.

Thank you to those who have failed many times, yet never gave up in following your bliss.

Thank you to everybody whom I have had a pleasure to work with & who has graced my life.
I have learned much from your perspectives & hope to continue to be blessed by your physical presence & your presence in my heart.

Thank you to all beautiful souls who grace us with this immersive & thoroughly interesting world.

## The Censible Team

Thank you to the [Censible](http://censible.co) team for the inspiration, willingness, & for being the initial sponsor for ctx-root.

A special thank to to:
[@pmart123](https://github.com/pmart123),
[@snuggs](https://github.com/snuggs),
[@cristhiandick](https://github.com/cristhiandick),
[@albertopontonio](https://github.com/albertopontonio),
[@strictlymomo](https://github.com/strictlymomo),
[@mrbernnz](https://github.com/mrbernnz),
[@katezaps](https://github.com/katezaps),
[@tmornini](https://github.com/tmornini),
[@ebransom](https://github.com/ebransom)
for your collaboration, brilliance, attitude, & friendship.
