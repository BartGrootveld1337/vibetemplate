.PHONY: help dev build start test test-watch test-e2e lint lint-fix typecheck clean setup db-new db-push db-status db-reset db-types db-local-start db-local-stop

# =============================================================================
# Help
# =============================================================================

help: ## Show this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*##/ { printf "  %-20s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# =============================================================================
# Development
# =============================================================================

dev: ## Start development server
	pnpm dev

build: ## Build for production
	pnpm build

start: ## Start production server
	pnpm start

# =============================================================================
# Testing
# =============================================================================

test: ## Run unit tests
	pnpm test

test-watch: ## Run tests in watch mode
	pnpm test:watch

test-e2e: ## Run end-to-end tests
	pnpm test:e2e

# =============================================================================
# Code Quality
# =============================================================================

lint: ## Run linter
	pnpm lint

lint-fix: ## Fix linting issues
	pnpm lint:fix

typecheck: ## Run TypeScript type checking
	pnpm typecheck

# =============================================================================
# Database (Supabase)
# =============================================================================

db-new: ## Create a new migration (usage: make db-new name=create_table)
	@if [ -z "$(name)" ]; then \
		read -p "Migration name: " name; \
		pnpm supabase migration new $$name; \
	else \
		pnpm supabase migration new $(name); \
	fi

db-push: ## Push migrations to remote database
	pnpm supabase db push

db-status: ## Check migration status
	pnpm supabase migration list

db-reset: ## Reset local database (applies migrations + seed)
	pnpm supabase db reset

db-types: ## Generate TypeScript types from database
	pnpm supabase:types

db-local-start: ## Start local Supabase instance
	pnpm supabase start

db-local-stop: ## Stop local Supabase instance
	pnpm supabase stop

# =============================================================================
# Setup
# =============================================================================

setup: ## Run first-time setup
	./setup.sh

install: ## Install dependencies
	pnpm install

# =============================================================================
# Cleanup
# =============================================================================

clean: ## Remove build artifacts and dependencies
	rm -rf .next node_modules coverage playwright-report test-results
