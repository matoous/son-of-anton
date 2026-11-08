.PHONY: update-skills

update-skills:
	@set -e; for lock in third_party/*/skills-lock.json; do \
		(cd "$$(dirname "$$lock")" && npx --yes skills@1.7.4 update --project --yes); \
	done
	npm run check
