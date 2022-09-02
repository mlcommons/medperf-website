# MedPerf Website

This site is built using [Sanity](https://sanity.io/) as the headless CMS, and [Next.js](https://nextjs.org/) as the front-end. It's currently hosted on [Vercel](https://vercel.com/).

### Developing

This monorepo is run using the [Lerna CLI](https://github.com/lerna/lerna). You'll need to install that package globally to run both apps at once:

```
npm install --global lerna
# Or
npx lerna init
```

This will allow both apps in the monorepo to be started from the root folder:

```
yarn run dev
```

To run each app independently, you can run:

```
# Sanity
cd studio/
sanity start

# Next
cd web/
yarn run dev
```

### Environment variables

You need some environment variables in `studio/.env.development` and in Vercel for Sanity's build:

```
SANITY_STUDIO_PRODUCTION_URL
SANITY_STUDIO_DEVELOPMENT_URL
SANITY_STUDIO_PREVIEW_SECRET // This can be whatever string you like, it's simply shared with the front-end server
```

And, a few environment variables are needed in `web/.env.local` (and also Vercel, or wherever it's hosted) for Next's build:

```
NEXT_PUBLIC_PROJECT_NAME
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_GA_TRACKING_ID
SANITY_API_TOKEN // You'll need to create this at sanity.io/manage to enable web previews
SANITY_PREVIEW_SECRET // Same secret as above in Sanity's configuration
```

### Enabling previews

You'll need to do two things at sanity.io/manage in order to show previews on the Next.js front-end:
- Generate the `SANITY_API_TOKEN` and add this to `.env.local`
- Add a CORS Origin host for whatever `localhost` is running the Next.js server, usually `http://localhost:3000`
  - You'll need to allow credentials for this host


### Vercel settings

- When creating new Vercel projects for each sub-directory, you'll need to set the root directory for each app to `studio/` and `web/`, respectively.
- As noted above, each of the 2 apps should have their respective environment variables added.
- This could easily be Netlify or any other hosting service. The Sanity admin has a plugin installed, `sanity-plugin-vercel-deploy`, and a config file `studio/vercel.json`, that can be swapped for another host's tools.

### Sanity Tips

- Currently, since each Sanity document wants one-and-only-one of its kind (e.g. homepage, benchmark sample, and site settings), there are settings in two files that disable:
  - Deleting the document (in `studio/config/resolveDocumentActions.js`)
  - Allowing new documents of these schemas to be created (in `studio/config/newDocumentStructure.js`)
- If you need to change either of these rules, you can safely edit and/or delete these files to customize

### More

This site is built from https://github.com/singleportrait/sanity-next-js-starter. See that repo for more extensive instructions.