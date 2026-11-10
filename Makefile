# Shortcuts for build.py. `make finals` serves the final presentation on
# localhost: live reload on save, and O → drag thumbnails to reorder slides.

PY ?= python3

.PHONY: finals midterm serve build

finals:
	$(PY) build.py final-presentation --serve

midterm:
	$(PY) build.py mid-term-presentation --serve

# any deck: make serve DECK=sample
serve:
	@test -n "$(DECK)" || (echo "usage: make serve DECK=<deck>" && exit 1)
	$(PY) build.py $(DECK) --serve

build:
	$(PY) build.py
