# Landing page design QA

## Scope

- Source of visual truth: the user-provided Stitch landing-page export and its
  accompanying screenshot.
- Implemented scope: the landing-page header, hero, introduction, adoption
  hero cards, and footer.
- Intentional visual variation: GAP NSW's deep blue, lime, and yellow palette
  replaces Stitch's original colour theme.

## Comparison evidence

- Desktop, fresh page at `1512 × 861`: the Stitch source and implementation
  were captured together in one side-by-side comparison image.
- Mobile, fresh page at `390 × 844`: the image appears above the hero copy,
  information content centres correctly, and adoption cards stack to one
  column without horizontal overflow.
- Footer comparison: the source footer and rendered implementation were placed
  in one side-by-side comparison image. The reference uses the same brand,
  supporting links, and copyright hierarchy; the implementation applies the
  GAP NSW deep-blue and lime theme intentionally.

## Checks passed

- Header, two-column hero, and rounded image treatment match the Stitch
  hierarchy on desktop.
- The original Stitch hero and three greyhound photographs are used locally.
- The introduction panel and adoption-card section retain the reference order,
  spacing hierarchy, labels, and placeholder card.
- CTA, login link, navigation anchor, image alt text, visible focus states,
  production build, lint, and TypeScript validation all pass.
- The footer retains the Stitch information architecture: brand statement,
  two link groups, divider, and copyright bar. It has been checked at desktop
  width and at `390 × 844`, where its content stacks cleanly.

## Footer evidence

- Source visual: Stitch export screenshot at
  `work/design-reference/stitch_greyhound_adoption_portal_gap/greyhound_racing_nsw_landing_page/screen.png`.
- Implementation capture: browser-rendered footer at
  `work/landing-page-footer-region.png`.
- Comparison: `work/footer-design-qa-comparison.png`.
- No P0, P1, or P2 footer mismatch remains. The primary background colour is
  intentionally different to match GAP NSW branding.

final result: passed
