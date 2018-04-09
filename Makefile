all: test

run:
	node ./src/bin.js

deps:
	npm install

test: deps
	npm run test
	
clean:
	rm -rf node_modules/
	rm -rf orbitdb/
	rm package-lock.json

.PHONY: test build
