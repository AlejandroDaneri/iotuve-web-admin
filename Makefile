.PHONY: run

install:
	docker build -t sample:dev .

start:
	docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3000:3000 -e CHOKIDAR_USEPOLLING=true sample:dev