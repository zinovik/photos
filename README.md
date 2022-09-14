This application requires 3 files:

**SECTIONS_URL** - an array of sections:

```typescript
interface SectionInterface {
  path: string;
  title: string;
  text?: string | string[];
  order?: number;
}
```

**FILES_URL** - an array of files (images and videos):

```typescript
interface FileInterface {
  path: string;
  filename: string;
  url: string;
  thumbnail?: string;
  description?: string;
  text?: string | string[];
  order?: number;
}
```

**FILE_URLS_URL** - an array of file urls:

```typescript
String[]
```
