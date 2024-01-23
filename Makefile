.PHONY: build format swc babel esbuild

# transform compare
build:
	node ./babel/build.mjs
	node ./esbuild/build.mjs
	node ./swc/build.mjs

swc:
	node ./swc/build.mjs

babel:
	node ./babel/build.mjs

esbuild:
	node ./esbuild/build.mjs

# format code
format:
	prettier --write ./**/build.mjs
