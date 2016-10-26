# Makefile for maintaining the debt-graph project
# Rick Dionne, July 2016

TARGET=./static

all: build

build:
	@mkdir -p $(TARGET)
	@deploy.sh
	@echo 'target: ' $(TARGET)
	cp -f dev/*.html $(TARGET)
	cp -f dev/*.css  $(TARGET)
	cp -f dev/*.js   $(TARGET)
	cp -f dev/*.png  $(TARGET)
clean:
	rm -f *~
	rm -f dev/*~

deploy:
	@./deploy.sh

.phony: build clean deploy
