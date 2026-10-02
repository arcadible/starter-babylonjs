// Relative paths, and the build goes where arcadible.toml's deploy_dir
// expects it. Game engines are larger than Vite's 500 kB warning, which is
// meant for websites.
export default {
  base: "./",
  build: { chunkSizeWarningLimit: 2048, outDir: ".arcadible-public" },
};
