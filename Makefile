test:
	npx swc --version
	@echo "============================="
	node ./build.js
	@echo "============================="
	node ./build2.js
	@echo "============================="
	node ./build3.js
	@echo "============================="
	node ./build4.js
	@echo "============================="
	node ./esbuild.js

test-2:
	npx swc --version
	node ./build2.js
