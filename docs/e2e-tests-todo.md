# E2E Testing TODO

This file outlines all the Cypress end-to-end test flows we plan to implement for CodeCraft2.

## Workspace CRUD (cypress/e2e/workspace.cy.ts)

- [ ] Create a new workspace
- [ ] Rename a workspace
- [ ] Delete a workspace
- [ ] Switch between workspaces

## Import/Export (cypress/e2e/import-export.cy.ts)

- [ ] Export project as ZIP (intercept and verify request payload)
- [ ] Export project as Gist (intercept and verify request payload)
- [ ] Import project from ZIP (use `cy.selectFile` to upload)
- [ ] Handle import errors (invalid ZIP file)

## Editor & Preview (cypress/e2e/editor.cy.ts)

- [ ] Load the editor on-screen
- [ ] Type HTML/CSS/JS and verify live preview updates
- [ ] Maximize and minimize editor/preview panes
- [ ] Test undo/redo functionality (if supported)

## Template Selection (cypress/e2e/template.cy.ts)

- [ ] Open templates dialog
- [ ] Select a built-in template and verify workspace resets
- [ ] Save current code as custom template and verify listing

## Sidebar & Navigation (cypress/e2e/navigation.cy.ts)

- [ ] Verify sidebar groups and menu buttons render correctly
- [ ] Toggle settings modal and verify behavior
- [ ] Use workspace switcher dropdown to change workspaces

## Settings & Modals (cypress/e2e/settings.cy.ts)

- [ ] Open settings modal and toggle dark/light theme
- [ ] Rename workspace via modal and verify update
- [ ] Delete workspace via modal and confirm removal

## Responsiveness (cypress/e2e/responsive.cy.ts)

- [ ] Simulate mobile viewport (< MOBILE_BREAKPOINT) and verify sidebar collapse
- [ ] Verify dialogs and dropdowns behave correctly on mobile

## Error & Edge Cases

- [ ] Simulate network failure on Gist API and verify error message
- [ ] Simulate AI completion API failure and verify fallback error handling
- [ ] Attempt to navigate to an invalid workspace ID and verify fallback UI

## Cross-Browser & CI

- [ ] Configure CI to run `bun run cypress:run` across Chrome, Firefox, and Edge
- [ ] Integrate test artifacts (screenshots, videos) into CI reports

---

_Once these tasks are complete, our E2E suite will cover all critical user flows in the production app._
