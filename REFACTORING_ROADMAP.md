# Refactoring & Quality-Improvement Roadmap

This document outlines a structured plan to refactor and improve code quality across the CodeCraft2 application by separating concerns, introducing feature-based organization, and enforcing best practices.

## 1. Current Pain Points

- UI components mix markup with business logic, side effects, and data operations.
- Large, monolithic files (e.g., `TemplateSelector.tsx` ~650 LOC, `App.tsx` ~185 LOC, `editor.tsx` ~140 LOC).
- No clear separation between presentational and container logic.
- Feature code scattered under `src/components`, making boundaries unclear.
- Limited test coverage for hooks and business logic.

## 2. High-Level Refactoring Goals

- Adopt a feature-driven folder layout.
- Extract side effects (fetch, ZIP, Gist, localStorage) into custom hooks or service modules.
- Split each feature into "container" (logic + state) and "UI" (pure JSX) components.
- Migrate all `.jsx` to `.tsx` with explicit TypeScript types.
- Reduce individual files to < 200 LOC whenever possible.
- Enable isolated unit testing for hooks and logic.

## 3. Proposed Folder Structure

```plaintext
src/
  features/
    workspace/
      useWorkspaces.ts
      WorkspaceSidebar.container.tsx
      WorkspaceSidebar.ui.tsx
      RenameDialog.container.tsx
      RenameDialog.ui.tsx
      DeleteDialog.container.tsx
      DeleteDialog.ui.tsx
    templates/
      useTemplates.ts
      TemplateLibrary.container.tsx
      TemplateLibrary.ui.tsx
      TemplateCard.tsx
    projects/
      useImportExport.ts
      ImportExport.container.tsx
      ImportExport.ui.tsx
    editor/
      useAiCompletion.ts
      Editor.container.tsx
      Editor.ui.tsx
      EditorLogo.tsx
    preview/
      Preview.tsx
  components/            ← shared/presentational
    ui/
      button.tsx
      dialog.tsx
      sidebar/
      dropdown-menu.tsx
      …
  hooks/                 ← generic hooks
    useIsMobile.ts
    useThemePreference.ts
  lib/
    api/
      gist.ts
      zip.ts
    utils.ts
  App.tsx
  main.tsx
  …
```

## 4. Step-by-Step Roadmap

### Phase A: Carve Out Hooks & Containers (2–3 days)

- For each large component (`TemplateSelector`, `NavProjects`, `Editor`, etc.):
  - Move data loading, API calls, `useState`/`useEffect`, and side effects into a new `useXxx` hook.
  - Leave only JSX and props handling in a sibling `.ui.tsx` file.
- Centralize ZIP & Gist logic into `lib/api/zip.ts` and `lib/api/gist.ts`.

### Phase B: Adopt Feature Folders & Rename (1–2 days)

- Relocate each feature's containers, UIs, and hooks into `src/features/<feature>/…`.
- Rename existing `.jsx` files to `.tsx` and define prop interfaces.
- Update import paths to reflect the new structure.

### Phase C: Tighten Typing & Add Tests (2–3 days)

- Define TypeScript types for workspaces, templates, suggestions, and API responses.
- Write unit tests (Vitest) for each hook (`useTemplates`, `useImportExport`, `useWorkspaces`).
- Add snapshot or behavior tests for presentational components (`TemplateCard`, `Preview`).

### Phase D: Enforce Consistency & CI (1 day)

- Integrate ESLint, Prettier, Tailwind-sorted and import-order plugins.
- Configure Husky + lint-staged to run formatters and tests on pre-commit.
- Set up GitHub Actions to lint, build, and test on each pull request.

### Phase E: Long-Haul Polish (Ongoing)

- Introduce Storybook for isolated component previews (all `components/ui` and feature UIs).
- Add end-to-end integration tests (e.g., workspace CRUD flows).
- Continuously refactor remaining mixed UI/logic code into hooks and services.
- Establish a living component library with **Storybook**:
  - Document all shared and feature UI components with interactive controls and example usage.
  - Auto-generate design tokens and style guides from component props.
- Integrate **End-to-End** testing (Cypress or Playwright):
  - Cover critical user flows (workspace CRUD, template selection, import/export).
  - Run in CI to catch regressions across browsers.
- Enforce **Performance Budgets** & Automated Audits:
  - Use Lighthouse CI or Vite plugins to set size and TTI budgets.
  - Fail builds if bundle or metric thresholds regress.
- Add **Accessibility** checks:
  - Integrate axe-core or Pa11y in CI pipeline.
  - Enforce ARIA attributes, color contrast, and keyboard navigation.
- Generate **API Documentation** with TypeDoc:
  - Publish docs for hooks, services, and shared types.
- Introduce **Monitoring & Observability**:
  - Collect real-user Web Vitals (e.g., via `web-vitals`).
  - Integrate error & performance tracking (Sentry, LogRocket).
- Ongoing **Maintenance & Refactoring**:
  - Continually extract any remaining mixed UI/logic into hooks/services.
  - Remove dead code and outdated dependencies.
  - Keep individual files under 200 LOC and feature modules self-contained.

## 5. Expected Outcomes

- Clear "container" vs. "presentation" separation, improving readability and maintainability.
- Feature-scoped directories for faster onboarding and easier scaling.
- Smaller, more focused files (< 200 LOC) that are easier to review.
- Strongly-typed, testable hooks and services with robust unit coverage.
- CI pipeline enforcing code quality and preventing regressions.
