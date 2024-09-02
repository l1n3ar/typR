push:
	@git add .
	@read -p "Enter commit message: " msg; \
	git commit -m "$$msg"; \
	git push origin $$(git rev-parse --abbrev-ref HEAD)

migrate:
	@read -p "Enter migration message: " msg; \
	npx prisma migrate dev --name "$$msg"; \
	npx prisma db push

