# UI Layout and Spacing Bug

## Summary

Paragraphs, headings, lists, cards, and page sections can appear too close
together or visually out of order across the storefront. The problem is caused
primarily by a global CSS reset, with a separate fixed-navbar layout concern.

## Symptoms

- Paragraphs have no visible space between them.
- Headings can touch the content above or below them.
- Lists and block quotes lose their expected spacing.
- Cards and sections look compressed when a page does not add explicit utility
  classes for every gap.
- Storefront content can overlap the fixed navigation bar if it is rendered
  outside the store layout or uses a different layout.

## Root Cause

### 1. Global spacing reset

In `app/globals.css`, the following selector removes the browser's default
margin from all common text and content elements:

```css
p,
ul,
ol,
figure,
blockquote,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
```

This is not inherently invalid, but it means every page and component must
recreate typography spacing manually. Pages that do not provide explicit
`margin`, `gap`, or Tailwind spacing utilities render as compressed layouts.

### 2. Fixed navbar positioning

`components/layout/Navbar.tsx` uses a fixed header:

```tsx
<header className="fixed top-0 left-0 right-0 ...">
```

Fixed elements are removed from normal document flow. Storefront pages
therefore need a top offset equal to `var(--nav-height)`. The current
`app/(store)/layout.tsx` provides this with:

```tsx
<div className="min-h-screen flex flex-col justify-between pt-[var(--nav-height)]">
```

Pages rendered outside this layout, or layouts that do not preserve this
offset, can begin underneath the navbar.

## Recommended Fix

Keep the global reset intentional, but define a consistent typography rhythm
instead of depending on browser defaults:

```css
p {
  margin-block: 0 1rem;
}

ul,
ol {
  margin-block: 0 1rem;
  padding-inline-start: 1.5rem;
}

figure,
blockquote {
  margin-block: 1.5rem;
}
```

For headings, use a deliberate scale and spacing:

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-block: 0 0.75rem;
}
```

Components with intentionally compact layouts should override these defaults
with a local utility such as `m-0` or `space-y-0`, rather than relying on a
global zero-margin rule for all content.

Keep all storefront routes under `app/(store)/layout.tsx`, or apply the same
navbar offset to any separate public layout. Do not add arbitrary per-page
top padding when the shared layout already provides the offset, because that
will create inconsistent vertical spacing.

## Verification Checklist

1. Check paragraphs, headings, lists, and block quotes on home, shop, product,
   cart, and informational pages.
2. Confirm that the first content section starts below the fixed navbar.
3. Confirm that cards use consistent internal padding and section gaps.
4. Test narrow and wide viewports because the `.container-site` padding changes
   at 768px and 1280px.
5. Run the existing validation commands:

```powershell
npm run lint
npm run build
```

## Affected Files

- `app/globals.css`
- `app/(store)/layout.tsx`
- `components/layout/Navbar.tsx`
