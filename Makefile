# debt calculator development makefile
# Rick Dionne, July 2016

MAKE = make

all: build

.phony: build clean deploy

build:
	@cd ..; $(MAKE) $@

clean:
	@cd ..; $(MAKE) $@

deploy:
	@./deploy.sh
