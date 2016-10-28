# Makefile for maintaining the debt-graph project
# Rick Dionne, July 2016

TARGET=./static

all: build

build:
	@mkdir -p $(TARGET)
	@mkdir -p $(TARGET)/img
	@mkdir -p $(TARGET)/src
	@deploy.sh
	@echo 'target: ' $(TARGET)
	cp -f dev/*.html $(TARGET)
	cp -f dev/*.css  $(TARGET)
	cp -f dev/src/*.js   $(TARGET)/src
	cp -f dev/img/*.png  $(TARGET)/img
clean:
	rm -f *~
	rm -f dev/*~

deploy:
	@./deploy.sh

.phony: build clean deploy
