---
name: responsive-design
description: Ensures every frontend component is fully responsive across mobile, tablet, laptop, and desktop using modern Tailwind CSS best practices.
---

# Responsive Design Skill

## Goal

Whenever creating or modifying frontend components, always ensure they are responsive by default.

Never create desktop-only layouts.

---

## Breakpoints

Always design with these Tailwind breakpoints:

| Device        | Breakpoint       |
| ------------- | ---------------- |
| Mobile        | default (<640px) |
| Small Tablet  | sm               |
| Tablet        | md               |
| Laptop        | lg               |
| Desktop       | xl               |
| Large Desktop | 2xl              |

Design mobile first.

---

## General Rules

- Mobile is the default layout.
- Scale upward using responsive utilities.
- Avoid fixed widths whenever possible.
- Prefer flexible layouts.
- Use percentage widths, flexbox, and grid.
- Content should never overflow horizontally.
- Avoid unnecessary scrolling.
- Maintain readable spacing on all devices.

---

## Containers

Prefer:

```tsx
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
```

Avoid:

```tsx
w-[1400px]
```

---

## Width Rules

Prefer:

```tsx
w-full
max-w-md
max-w-xl
max-w-2xl
```

instead of

```tsx
w-[800px]
```

---

## Typography

Scale typography.

Example:

```tsx
text-2xl
sm:text-3xl
lg:text-5xl
```

Never use one font size for every screen unless intentionally required.

---

## Spacing

Scale spacing.

Example:

```tsx
p - 4;
md: p - 8;
lg: p - 12;
```

Example:

```tsx
gap - 4;
md: gap - 6;
lg: gap - 10;
```

---

## Flex Layouts

Desktop:

```tsx
flex - row;
```

Mobile:

```tsx
flex - col;
```

Example:

```tsx
flex flex-col lg:flex-row
```

---

## Grid Layouts

Prefer responsive grids.

Example:

```tsx
grid;
grid - cols - 1;
sm: grid - cols - 2;
lg: grid - cols - 3;
xl: grid - cols - 4;
```

Never hardcode desktop-only columns.

---

## Images

Images should:

- use `object-cover`
- never stretch
- keep aspect ratio
- use responsive widths

Example:

```tsx
<Image className="w-full h-auto object-cover rounded-xl" />
```

---

## Buttons

Buttons should:

- remain tappable on mobile
- have minimum height around 44px
- wrap correctly if needed

Example:

```tsx
className = "w-full sm:w-auto";
```

---

## Navigation

Desktop:

- horizontal navigation

Mobile:

- hamburger menu or drawer

Never allow navbar items to overflow.

---

## Cards

Cards should stack vertically on small screens.

Example:

```tsx
grid - cols - 1;
md: grid - cols - 2;
xl: grid - cols - 3;
```

---

## Forms

Inputs should always use:

```tsx
w - full;
```

Stack fields vertically on mobile.

Example:

```tsx
flex flex-col md:flex-row
```

---

## Tables

Tables should never break layouts.

Prefer:

- horizontal scrolling
- responsive card layouts
- hidden less important columns on mobile

---

## Overflow

Avoid:

```tsx
overflow - hidden;
```

unless absolutely necessary.

Never allow unintended horizontal scrolling.

---

## Testing Checklist

Before considering a component complete, verify:

- ✓ Looks good at 375px width
- ✓ Looks good at 768px width
- ✓ Looks good at 1024px width
- ✓ Looks good at 1440px width
- ✓ No horizontal scrolling
- ✓ Buttons remain clickable
- ✓ Text remains readable
- ✓ Images scale correctly
- ✓ Cards stack correctly
- ✓ Navigation adapts
- ✓ Forms remain usable

---

## Tailwind Best Practices

Prefer:

- flex
- grid
- gap
- max-w
- min-h
- aspect-video
- aspect-square
- w-full
- h-auto
- container
- mx-auto

Avoid:

- excessive fixed widths
- fixed heights unless necessary
- pixel-perfect desktop-only layouts
- absolute positioning for layout
- arbitrary values when Tailwind utilities exist

---

## Expected Output

Every generated React, Next.js, or Tailwind component should:

- be mobile-first
- be fully responsive
- use modern Tailwind utilities
- avoid layout shifts
- follow accessibility best practices
- require minimal manual responsiveness fixes
