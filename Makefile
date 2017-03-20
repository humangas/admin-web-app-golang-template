all:
	@echo "Usage:"
	@echo "- install: Install software and Setup gentelella"
	@echo "- setup:   Setup gentelella"
	@echo "- build:   Build gentelella resources to assets dir"
	@echo "- serve:   Serve goemon"

install:
	@go get -u github.com/labstack/echo
	@go get github.com/mattn/goemon/cmd/goemon
	@npm install gulp -g
	@npm install minifyjs -g
	@make setup

setup:
	@git clone https://github.com/puikinsh/gentelella.git
	@patch -u gentelella/package.json < patch/package.json.patch
	@patch -u gentelella/gulpfile.js < patch/gulpfile.js.patch 
	@cd gentelella; npm install

build:
	@cd gentelella; gulp build
	@cp -r gentelella/assets .

serve:
	@open "/Applications/Google Chrome.app" 'http://localhost:1323/'
	@goemon go run main.go

.PHONY: all install setup build serve
