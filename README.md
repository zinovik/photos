![diagram](./diagram.png)

```
flowchart TB

    subgraph github.io
        Gallery(zinovik.github.io/gallery)
        StorageJsonEditor(zinovik.github.io/storage-json-editor)
    end

    subgraph Local PC
        Backup(backup-storage-files)
        fasLocal(files.json<br/>albums.json<br/>sources-configs.json)
        PhotosLocal(PHOTOS)
    end

    subgraph Google Cloud Platform
        subgraph Google Cloud Storage
            faStorage(files.json<br/>albums.json)
            sStorage(sources-configs.json)
            PhotosStorage(PHOTOS)
        end
        subgraph Google Cloud Functions
            MediaUrlUpdater(media-url-updater)
        end
        subgraph Google Cloud Run
            StorageJsonEditorApi(storage-json-editor-api)
        end
    end

    GoogleAuth

    PhotosLocal --> Backup
    faStorage --> Backup
    sStorage --> Backup
    Backup --> PhotosStorage
    Backup --> fasLocal

    StorageJsonEditor --> StorageJsonEditorApi
    GoogleAuth --> Gallery
    GoogleAuth --> StorageJsonEditor
    GoogleAuth --> StorageJsonEditorApi

    faStorage --> Gallery
    sStorage --> Gallery
    PhotosStorage --> Gallery

    Gallery --> StorageJsonEditorApi
    StorageJsonEditorApi --> MediaUrlUpdater

    PhotosStorage --> MediaUrlUpdater
    MediaUrlUpdater --> faStorage
    MediaUrlUpdater --> sStorage

    StorageJsonEditorApi --> faStorage
```

This application requires 3 files:

**ALBUMS_URL** - an array of albums:

```typescript
interface AlbumInterface {
  path: string;
  title: string;
  text?: string | string[];
  isSorted?: true;
}
```

**FILES_URL** - an array of files (images and videos):

```typescript
interface FileInterface {
  path: string;
  filename: string;
  isTitle?: true;
  isNoThumbnail?: true;
  description: string;
  text?: string | string[];
  isVertical?: true;
}
```

**SOURCES_CONFIG_URL** - an object with the file sources:

```typescript
type SourcesConfig = Record<string, string | undefined>;
```

### create bucket, setup cors, check the bucket's cors:

```bash
gcloud storage buckets create gs://zinovik-gallery --location=europe-central2
gcloud storage buckets update gs://zinovik-gallery --cors-file=cors_file.json
gcloud storage buckets describe gs://zinovik-gallery --format="default(cors_config)"
gcloud storage buckets update gs://zinovik-gallery --versioning
```
