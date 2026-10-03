# Untitled Game

![Untitled Game banner](.arcadible/banner.png)

## A memorable tagline.

A brief, plain-text pitch for your game, in a sentence or two. It's shown when your game is featured, and in About when there's no description below.

---

Tell players about your game here. This section becomes your game's description. It appears in the **About** section on the store page. Expand on your game, highlight its features, embed **PNG images** and **MP4 videos** from the .arcadible/gallery directory, and format your description with [Arcadible Markdown](https://developer.arcadible.com/references/arcadible-markdown).

---

Everything after the last horizontal rule is ignored by Arcadible. Use this section for development notes, build instructions, or other repository documentation.

For larger projects, you can instead create an `arcadible.md` file to keep your store page content separate from your repository's `README.md`.

## Develop

The game is built with [Babylon.js](https://doc.babylonjs.com) and [Vite](https://vite.dev), into `.arcadible-public/`.

```sh
npm install
npm run dev     # a local server that reloads as you edit
arc deploy      # builds, then publishes
```

### References

- [Arcadible Manifest](https://developer.arcadible.com/references/arcadible-manifest)
  - [game.title](https://developer.arcadible.com/references/arcadible-manifest#game.title)
  - [game.tagline](https://developer.arcadible.com/references/arcadible-manifest#game.tagline)
  - [game.bio](https://developer.arcadible.com/references/arcadible-manifest#game.bio)
  - [game.description](https://developer.arcadible.com/references/arcadible-manifest#game.description)
  - [game.gallery](https://developer.arcadible.com/references/arcadible-manifest#game.gallery)
