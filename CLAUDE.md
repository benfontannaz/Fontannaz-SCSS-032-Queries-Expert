# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A static, single-page portfolio/consulting site (Fontannaz Consulting). Everything is in one `index.html` (~4k lines), styled by SCSS compiled to CSS. There is no package.json, bundler, linter, or test suite. This repo is a lesson iteration ("032 Queries Expert") that focuses on the responsive media-query system.

## Build / run

- **There is no CLI build.** The `sass` CLI is not installed. SCSS gets compiled by the VS Code **Live Sass Compiler** extension. The source maps confirm this: they list `main.css` as the first source.
- If you need to compile by hand, use `npx sass sass/main.scss css/main.css` (expanded) or `npx sass --style=compressed sass/main.scss dist/css/main.min.css`.
- Serve with VS Code **Live Server** on port 5504 (`.vscode/settings.json`). Use a server rather than `file://`, because `index.html` uses some root-absolute paths (`/css/plugins.css`).
- Compiled outputs:
  - `css/main.css` (+ map): **the file `index.html` actually loads.**
  - `sass/main.css` (+ map): a duplicate output written next to the source.
  - `dist/css/main.min.css` (+ map): minified output.

  Never hand-edit the compiled CSS. Edit the SCSS and recompile.

## SCSS architecture (7-1 style)

`sass/main.scss` is the only entry point. It uses `@import` (not `@use`) in this order: `abstracts/` → `base/` → `components/` → `layout/` → `pages/`. Because everything is imported, all variables and mixins are global. A partial only compiles if `main.scss` imports it.

- `abstracts/_theme.scss` outputs real CSS (global resets, body/link styles), so it isn't purely abstract.
- `layout/` partials are numbered to match the order of the page sections (`00-navigation` … `10-footer`). Some are commented out in `main.scss` (`02-services-details`, `03-team`).
- Files with `_OLD`, `-DRAFT`, `copy`, or `-original` in the name, plus the root-level `_base_OLD.scss` and `_buttons copy.scss`, are archived variants and aren't imported.
- `abstracts/_variables.scss` holds many `$clip-path-polygon-*` values that use `dvh` units. These create the angled section dividers, and their lengths are tuned to each section's height.

## Media queries: the `respond($breakpoint)` mixin

The mixin lives in `sass/abstracts/_mixins.scss`. The comment block above it has the breakpoint table (px/em, min-height, orientation, hover). Key conventions:

- All breakpoints are **mobile-first `min-width`, written in `em`** (px / 16). The comment says this is because Safari handles px media queries poorly.
- Touch devices are told apart from desktops by `hover`:
  - Mobile and tablet breakpoints match `(hover: none)` and also check `orientation` and `min-height`. Each one repeats its query for every high-DPI vendor prefix.
  - Desktop breakpoints match `(hover: hover)`.
- Valid names in the active mixin: `mobile`, `mobile-land`, `tab-s`, `tab-s-land`, `tab-m`, `tab-m-land`, `tab-l`, `tab-l-land`, `pc-xs`, `pc-s`, `pc-m`, `pc-l`, `pc-xl`.
- **Watch out:** the mixin is a chain of `@if` checks with no `@else`/`@error`. **An unknown name compiles to nothing, with no warning.** Several partials still call older names from `_mixins-original.scss` (`phone`, `tab-port`, and `desk-big`, which is defined nowhere). Those blocks currently produce no CSS. Before you add or debug responsive styles, check that the breakpoint name exists in `_mixins.scss`.

## Other parts

- `js/`: plain jQuery scripts. jQuery, Bootstrap 5, Owl Carousel, Magnific Popup, and jquery.appear load from CDNs near the end of `index.html`. `scripts.js` is the main site script.
- `css/plugins/`: vendor CSS (Bootstrap, animate, Font Awesome, Owl, and others), loaded separately from `main.css`.
- `bat/`: the PHP contact-form backend (`rd-mailform.php` + PHPMailer). It needs a PHP server, so it won't work under Live Server.
