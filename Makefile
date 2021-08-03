#
# Fudy: local environment Makefile
#
# Copyright: 2020 Paxful Inc.
# All rights reserved - Do Not Redistribute
#

app_install:
	@npm i
	@npm run docker:up
	@npm run start:dev

db_shell:
	@docker exec -it fudy-roman-network_db_postgres_1 bash
redis_shell:
	@docker exec -it fudy-roman-network_db_redis_1 bash
