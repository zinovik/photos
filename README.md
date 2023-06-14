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
  thumbnail?: string;
  description?: string;
  text?: string | string[];
  order?: number;
  isVertical?: boolean;
}
```

**FILE_URLS_URL** - an array of file urls:

```typescript
string[]
```
