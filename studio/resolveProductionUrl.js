const prodUrl = process.env.SANITY_STUDIO_PRODUCTION_URL;
const devUrl = process.env.SANITY_STUDIO_DEVELOPMENT_URL;

const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

export default function resolveProductionUrl(document) {
  const baseUrl = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
  return `${baseUrl}/api/preview?secret=${previewSecret}&document=${document._id}`;
};
