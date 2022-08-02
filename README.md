# Starter Website: Sanity Studio + Next.js

Both apps are set up to be hosted on Vercel and be managed there. It's intended to be two Vercel apps that then communicate with each other.

### Installation

- Clone the repo and move into the root repo folder
- Set up a new Sanity project via the command line, using the Sanity CLI (which needs to be installed beforehand)
  ```sh
    sanity login
    cd studio/ # Move into the Sanity studio folder
    sanity init
    # It will ask if you want to reconfigure it. Say 'Yes'
    ? The current folder contains a configured Sanity studio. Would you like to reconfigure it? (Y/n)
    # Select 'Create new project'
    # Give it a project name
    # Use the default dataset configuration `production`
    # It will do some things...
    # And then it should be done! It should have updated `studio/sanity.json` with your new project ID
  ```
- Rename `studio/.env.development.test` to `studio/.env.development` and update Sanity production URL and preview secret
- Rename `web/.env.local.test` to `web/.env.local` and update the project name, the newly-generated Sanity project ID, and preview secret
- Install Lerna globally, and then bootstrap the project, which will install all packages. From the root repo folder:
  ```sh
    npm install --global lerna
    lerna boostrap
  ```
  - This app is a monorepo that uses Lerna to install all packages in the main and sub-folders at once.
- *Housekeeping:* Update the project names in `studio/package.json` and `web/package.json`
- Now, you should be ready to go, and start the app using the command below!
- To enable content previews, you'll need to set up a CORS origin host and an API key in the Sanity management admin. See instructions below.

### Working

Using Lerna, both apps in the monorepo can be started from the root folder:

```
yarn run dev
```

To run each independently, you can run:

```
# Sanity
cd studio/
sanity start

# Next
cd web/
yarn run dev
```

### Environment variables

You need some environment variables in `studio/.env.local` and in Vercel for Sanity's build:

```
SANITY_STUDIO_PRODUCTION_URL
SANITY_STUDIO_DEVELOPMENT_URL
SANITY_PREVIEW_SECRET // This can be whatever string you like, it's simply shared with the front-end server
```

And, a few environment variables are needed in `web/.env.development` (and also Vercel, or wherever it's hosted) for Next's build:

```
NEXT_PUBLIC_PROJECT_NAME
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_GA_TRACKING_ID
SANITY_API_TOKEN // You'll need to create this at sanity.io/manage to enable web previews
SANITY_STUDIO_PREVIEW_SECRET // Same secret as above in Sanity's configuration
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