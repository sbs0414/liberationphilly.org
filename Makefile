start:
	pwd | export PWD
	docker build -t liberationphilly .
	docker run -p 5000:5000 -v $(PWD)/www:/app/www -it liberationphilly
