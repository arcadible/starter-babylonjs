# AGENTS.md

This project is a game for Arcadible. It's built on the web platform: if it builds to a folder with an `index.html`, it ships, whatever the engine. It's played in the Arcadible desktop app and in browsers, on computers and phones. The `arc` CLI checks and deploys it, and there's no SDK to add.

## Read the docs

Read the page that covers a file before you change it. Every page is also in https://developer.arcadible.com/llms-full.txt.

| Before you change      | Read                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| The game               | https://developer.arcadible.com/build/best-practices.md and https://developer.arcadible.com/build/runtime-limitations.md |
| `arcadible.toml`       | https://developer.arcadible.com/references/arcadible-manifest.md                                                         |
| `.arcadible/`          | https://developer.arcadible.com/references/arcadible-manifest.md, "Media files"                                          |
| `README.md`            | https://developer.arcadible.com/references/arcadible-markdown.md                                                         |
| How you deploy or play | https://developer.arcadible.com/references/arcadible-cli.md and https://developer.arcadible.com/publish/releases.md      |

## Project structure

| Path                    | Contains                                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------------------------- |
| `arcadible.toml`        | The game's id and settings. Never change `id`. If it's missing, `arc init` adds one without scaffolding. |
| `package.json`          | The game's `version`, and its dependencies.                                                              |
| `README.md`             | The store page: the title, tagline, bio, and the description between the first and last `---`.           |
| `.arcadible/`           | The store art, with fixed file names.                                                                    |
| `index.html`, `main.js` | The game's source, built with Babylon.js and Vite.                                                       |
| `.arcadible-public/`    | The build players load (`workflow.deploy_dir`). Never edit it: `npm run build` replaces it.              |

## Commands

```sh
npm run dev                   # a local server that reloads as you edit
arc validate                  # the checks arc deploy runs, with a link to each broken rule
arc inspect game.bio          # one value of the resolved manifest
arc build                     # npm run build, into .arcadible-public, as arc deploy runs it
arc pack                      # the zip arc deploy uploads, to check what it contains (after arc build)
arc deploy                    # validate, build, publish, and wait until it's published
```

Add `--json` to an `arc` command (every one but `login`, `logout`, `open`, and `play`) to read its result: stdout holds one JSON document. Every `arc` command exits with 1 when it fails, and its JSON has `error.code`, such as `not_logged_in`: act on the code, and look it up at https://developer.arcadible.com/references/errors.md.

## The runtime

- **Static files.** The build is served as it is, with no server-side code, rewrites, or custom headers. Route with the hash (`#/level/3`) or in-memory state, not the path.
- **Relative paths, exact case.** Paths are case-sensitive on Arcadible, even where they aren't on your machine.
- **One page.** The game runs in the Arcadible sandbox, which blocks popups, `alert()`, form submission, downloads, and top-level navigation.
- **A gesture first.** Start audio, fullscreen, and pointer lock in a click, tap, or key press handler.
- **Empty storage in every version.** Each build has its own origin, so what one version saves in browser storage, the next can't read. Arcadible doesn't currently provide a save API, so tell the user when a feature depends on keeping saves.
- **Your own servers** need HTTPS or WSS, and CORS that accepts any origin ending in `.arcadible.io`.

## Rules

- Run `arc validate` after every change to `arcadible.toml`, `README.md`, or `.arcadible/`. It exits with 1 when there are issues.
- Bump `version` in `package.json` before every deploy. Each version publishes once. A prerelease such as `1.2.0-beta.1` goes to `staging`, and any other version to `production`.
- Keep `inputs` and `orientation` true to the game when its controls or layout change.
- Set `ai = "generative"` when the game ships or generates art, audio, text, or levels made with generative AI. Code written with AI doesn't count.
- Change `visibility` to `public` only when the user asks. It lists the game in the store and in search.
- Write the title, tagline, and bio as plain text.
- Use only the description's allowed elements: no code, tables, raw HTML, or `#` and `##` headings.
- Match art ratios exactly. A banner is 2:1, so 1030×512 is rejected.
- Keep what matters in art inside its safe zones: 10% of the shorter side in from every edge, and on a wide cover, banner, or splash, the centered 3:4 area. The placeholders mark both; see https://developer.arcadible.com/publish/store-page.md, "Safe zones".

## Deploying

- Deploy prereleases to test: `arc deploy` with a version such as `1.2.0-beta.1`. It prints the staging link, which runs the game in the same sandbox as production.
- `arc deploy` exits with 1 when the release fails, and prints the reason and what to do.
- Some codes need the user, so ask them, then run the command again:
  - `not_logged_in`, `session_expired`, `login_expired`, `login_failed`: they run `arc login`, which needs a browser.
  - `repo_not_connected`, `app_not_installed`: they connect the repository or the GitHub App in Arcadible Studio.
  - `game_exists`, `game_unavailable`: they choose another `handle`, or a new game `id`.

## Releasing from GitHub

`arc deploy git` releases from GitHub Actions instead. Before its first run:

- The game must have been deployed once with `arc deploy`.
- The user installs the Arcadible GitHub App and connects this repository, on the game's Repository tab in Arcadible Studio. Ask them to, and wait until they say it's done.
- Everything is committed, with `.github/workflows/arcadible-release.yml`, and a lockfile when there's a `package.json`. `.arc/` is in `.gitignore`.

Read https://developer.arcadible.com/publish/deploying-from-github.md first.
