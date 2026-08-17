# Rackora Repository Instructions

## Update Completion Gate

Every user-facing update intended for delivery must complete this checklist. Do not report an
update as finished after editing files only. A newer user instruction may explicitly limit the
work to local changes or skip publishing; otherwise follow the complete release flow.

1. Run `git status --short --branch`, fetch `origin`, and confirm local/remote divergence before
   editing. Preserve unrelated user changes.
2. Inspect the current implementation, relevant settings, generated output, tests, recent history,
   and the latest GitHub Release before choosing an approach.
3. Choose the next semantic version from the delivered behavior: fixes increment PATCH,
   backward-compatible features increment MINOR, and breaking changes increment MAJOR.
4. Modify source files under `src/`; never hand-edit generated files under `templates/`.
5. Update focused validation for changed behavior. Frontend changes must also update the local
   preview fixture when needed to exercise the affected UI.
6. Run `pnpm check`, `pnpm build-only`, `pnpm test`, and `pnpm test:budget`. Resolve failures rather
   than bypassing hooks or checks.
7. Visually verify frontend changes in the browser at representative desktop and mobile sizes.
   Check light and dark color schemes when colors, borders, or contrast change.
8. Update `package.json`, `theme.yaml`, `README.md`, and `CHANGELOG.md` to the same release version.
   Release notes must describe the actual user-visible changes.
9. Run `pnpm build` to create `dist/theme-rackora-X.Y.Z.zip`. Inspect the ZIP for the expected
   version, configuration, generated templates, and changed behavior; record its size and SHA-256.
10. Review `git diff --check`, the complete diff, and `git status`. Commit only the intended files.
11. Create an annotated `vX.Y.Z` tag, push `main`, then push the tag to `origin`.
12. Wait for the GitHub `Release theme` workflow to finish successfully. Confirm that the matching
    GitHub Release and `theme-rackora-X.Y.Z.zip` asset exist.
13. Compare the local and remote ZIP SHA-256 digests. They must match before declaring success.
14. Confirm the worktree is clean and `main`, `origin/main`, and the release tag resolve to the
    expected commit.

The final handoff must include the version, commit, local ZIP path, GitHub Release URL, test status,
and matching SHA-256. Never claim that a remote artifact exists until it has been verified.
