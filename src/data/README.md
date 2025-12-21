# Content Localization

This directory contains all the content for the website in different languages.

## Current Languages

- **English (en)**: [content-en.ts](./content-en.ts) - Default language

## Structure

All content is organized in a TypeScript object with the following sections:

- `personal`: Contact information and social links
- `hero`: Hero section content
- `about`: About section with highlights and journey
- `experience`: Work experience and positions
- `education`: Educational background
- `skills`: Technical skills organized by categories
- `awards`: Awards and recognition
- `profile`: Professional profile summary

## Adding a New Language

To add a new language (e.g., Arabic):

### 1. Create a new content file

Create a new file named `content-[language-code].ts` (e.g., `content-ar.ts` for Arabic):

```typescript
import { ContentType } from "./content-en";

export const contentAR: ContentType = {
  personal: {
    name: "حامد عبد الرحمن",
    title: "مهندس رئيسي عالمي",
    // ... translate all fields
  },
  hero: {
    // ... translate all fields
  },
  // ... translate all sections
};
```

### 2. Update the index file

Edit [index.ts](./index.ts) and:

1. Import your new content:
```typescript
import { contentAR } from "./content-ar";
```

2. Add the language code to the `Language` type:
```typescript
export type Language = "en" | "ar";
```

3. Add the content to the `content` object:
```typescript
export const content: Record<Language, ContentType> = {
  en: contentEN,
  ar: contentAR,
};
```

4. Add the language to `availableLanguages`:
```typescript
export const availableLanguages: { code: Language; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
];
```

### 3. Use the content in components

Components automatically use the content via the `getContent()` function:

```typescript
import { getContent } from "../data";

export function MyComponent() {
  const content = getContent(); // Uses default "en"
  // Or specify a language:
  // const content = getContent("ar");

  return <div>{content.hero.heading}</div>;
}
```

## Type Safety

All content files must match the `ContentType` interface defined in `content-en.ts`. This ensures:

- All translations have the same structure
- No missing or extra fields
- Type checking in components

## Best Practices

1. **Keep structure consistent**: All language files should have the exact same structure
2. **Don't hardcode strings**: Always use the content object in components
3. **Test translations**: Verify all text renders correctly in the UI
4. **RTL support**: For RTL languages like Arabic, you may need to add CSS classes for proper layout
5. **Character encoding**: Ensure your editor saves files in UTF-8 encoding

## Example: Adding Arabic

See the commented sections in [index.ts](./index.ts) for examples of how to add Arabic or other languages.
