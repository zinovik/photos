This application requires 3 files:

**ALBUMS_URL** - an array of albums:

```typescript
interface AlbumInterface {
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
  fix?: boolean;
  description?: string;
  text?: string | string[];
  order?: number;
  isVertical?: boolean;
}
```

**SOURCES_CONFIG_URL** - an object with the file sources:

```typescript
type SourcesConfig = Record<
  string,
  { url: string; type: 'image' | 'video' } | undefined
>;
```
