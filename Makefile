# debt calculator dev build makefile
# Rick Dionne, July 2016

MAKE = make

all: build

.phony: build clean

build:
	@cd ..; $(MAKE) $@

clean:
	@cd ..; $(MAKE) $@
