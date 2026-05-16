import { build } from 'esbuild';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';

const handlers = ['track', 'stats'];
const outdir = 'dist';

await rm(outdir, { recursive: true, force: true });
await mkdir(outdir, { recursive: true });

for (const name of handlers) {
  const handlerDir = `${outdir}/${name}`;
  await mkdir(handlerDir, { recursive: true });

  await build({
    entryPoints: [`src/handlers/${name}.ts`],
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'esm',
    outfile: `${handlerDir}/index.mjs`,
    external: ['@aws-sdk/*'],
    minify: true,
    sourcemap: true,
    banner: {
      js: "import{createRequire}from'node:module';const require=createRequire(import.meta.url);",
    },
  });

  await writeFile(
    `${handlerDir}/package.json`,
    JSON.stringify({ type: 'module' }, null, 2),
  );

  execSync(`cd ${handlerDir} && zip -qr ../${name}.zip .`);
}

console.log('Built handlers:', handlers.join(', '));
