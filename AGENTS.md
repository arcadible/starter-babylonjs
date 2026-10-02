# AGENTS.md

This project is a game published on Arcadible. The game is ordinary web code: Arcadible hosts it, lists it in the store, and delivers it to players. The `arc` CLI checks and publishes it. There's no SDK.

## Read the docs

Read the page that covers a file before you change it. Every page is also in https://developer.arcadible.com/llms-full.txt.

| Before you change      | Read                                                                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| The game               | https://developer.arcadible.com/guides/games/best-practices.md and https://developer.arcadible.com/guides/games/runtime-limitations.md |
| `arcadible.toml`       | https://developer.arcadible.com/references/arcadible-manifest.md                                                                       |
| `.arcadible/`          | https://developer.arcadible.com/references/arcadible-manifest.md, "Media files"                                                        |
| `README.md`            | https://developer.arcadible.com/references/arcadible-markdown.md                                                                       |
| How you deploy or play | https://developer.arcadible.com/references/arcadible-cli.md and https://developer.arcadible.com/guides/publishing/releases.md          |

## Project structure

| Path                    | Contains                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------- |
| `arcadible.toml`        | The game's id and settings. Never change `id`.                                                 |
| `package.json`          | The game's `version`, and its dependencies.                                                    |
| `README.md`             | The store page: the title, tagline, bio, and the description between the first and last `---`. |
| `.arcadible/`           | The store art, with fixed file names.                                                          |
| `index.html`, `main.js` | The game's source, built with Babylon.js and Vite.                                             |
| `.arcadible-public/`    | The build players load (`workflow.deploy_dir`). Never edit it: `npm run build` replaces it.    |

## Commands

```sh
npm run dev            # a local server that reloads as you edit
arc validate           # the checks arc deploy runs, with a link to each broken rule
arc inspect game.bio   # one value of the resolved manifest
arc pack               # the zip arc deploy uploads, to check what it contains
arc deploy             # validate, build, publish, and wait until it's published
```

## Rules

- Run `arc validate` after every change to `arcadible.toml`, `README.md`, or `.arcadible/`. It exits with 1 when there are issues.
- Bump `version` in `package.json` before every deploy. Each version publishes once. A prerelease such as `1.2.0-beta.1` goes to the staging channel, and any other version goes to players.
- Write the title, tagline, and bio as plain text.
- Use only the description's allowed elements: no code, tables, raw HTML, or `#` and `##` headings.
- Match art ratios exactly. A banner is 2:1, so 1030×512 is rejected.
- Keep the game on one page. The sandbox blocks popups, `alert()`, form submission, downloads, and top-level navigation.
- Expect empty storage in every version. Each build has its own origin.

## Deploying

- Deploy prereleases to test: `arc deploy` with a version such as `1.2.0-beta.1`. It prints the staging link, which runs the game in the same sandbox as production.
- `arc deploy` exits with 1 when the release fails, and prints the reason and what to do.
