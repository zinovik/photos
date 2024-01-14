This application requires 3 files:

**ALBUMS_URL** - an array of albums:

```typescript
interface AlbumInterface {
  path: string;
  title: string;
  text?: string | string[];
}
```

**FILES_URL** - an array of files (images and videos):

```typescript
interface FileInterface {
  path: string;
  filename: string;
  type: 'image' | 'video';
  url: string;
  datetime: string;
  isTitle?: boolean;
  isNoThumbnail?: boolean;
  description?: string;
  text?: string | string[];
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

### create bucket, setup cors, check the bucket's cors:

```bash
gcloud storage buckets create gs://zinovik-gallery --location=us-central1
gcloud storage buckets update gs://zinovik-gallery --cors-file=cors_file.json
gcloud storage buckets describe gs://zinovik-gallery --format="default(cors_config)"
gcloud storage buckets update gs://zinovik-gallery --versioning
```
