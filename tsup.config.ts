import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'node14',
  platform: 'browser',
  external: ['react', 'rxjs']
})
