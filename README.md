# Pramag Foods Journal

A responsive journal website for Pramag Foods, a sausage production factory in Mantukwa, Sunyani. A full-screen animated welcome page appears before the homepage, and site motion respects the visitor's reduced-motion preference.

## Run locally

```sh
npm install
npm run dev
```

Open `/admin` on the local site to edit page copy, metadata, contact details, and every site image. Images can be updated by pasting a URL or uploading a file; uploads are resized and stored in that browser. Journal stories can also be created, edited, or deleted. Changes are saved to that browser's local storage. Use **Export content** to download a JSON backup.

> The admin editor is a local prototype only. It has no authentication or shared server-side storage, so edits are visible only in the browser where they were made. Do not treat it as a production publishing system.

## Checks

```sh
npm run lint
npm run build
```
