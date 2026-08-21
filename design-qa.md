# Landing page design QA

## Scope

- Source of visual truth: the user-provided Stitch landing-page export and its
  accompanying screenshot.
- Implemented scope: the landing-page header, hero, introduction, and adoption
  hero cards.
- Intentional visual variation: GAP NSW's deep blue, lime, and yellow palette
  replaces Stitch's original colour theme.

## Comparison evidence

- Desktop, fresh page at `1512 × 861`: the Stitch source and implementation
  were captured together in one side-by-side comparison image.
- Mobile, fresh page at `390 × 844`: the image appears above the hero copy,
  information content centres correctly, and adoption cards stack to one
  column without horizontal overflow.

## Checks passed

- Header, two-column hero, and rounded image treatment match the Stitch
  hierarchy on desktop.
- The original Stitch hero and three greyhound photographs are used locally.
- The introduction panel and adoption-card section retain the reference order,
  spacing hierarchy, labels, and placeholder card.
- CTA, login link, navigation anchor, image alt text, visible focus states,
  production build, lint, and TypeScript validation all pass.

final result: passed
