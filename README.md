# Airtable Job Board With Next.js

<div align="center">
<img src="https://github.com/btahir/next-air-jobs/blob/main/public/demo.png">
</div>

## Env Variables

Add the following .env variables to your .env.local file (and to Netlify/Vercel when deploying).

```
AIRTABLE_API_KEY==
AIRTABLE_BASE_ID=
```

## Run

```
yarn && yarn dev
```

## Issues

Airtable doesn't let you directly upload files (you need a public URL). A work around would be uploading to a storage solution like S3 or Cloudinary and then moving it (annoying).
