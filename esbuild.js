import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['./src/app.ts'],
  outfile: './dist/app.js',
  format: 'esm',
  bundle: true,
  packages: 'external',
  platform: 'node',
  sourcemap: true,
});