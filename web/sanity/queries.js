const metadataQuery = `
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage,
  "siteSettings": *[_type == "settings"][0]{
    name,
    email,
    github,
    privacyPolicy,
    "seoDescription": seo.description,
    "seoImage": seo.openGraphImage,
  }
`;

const indexQuery = `*[_type == "homepage"][0]{
  ...,
  ${metadataQuery},
}`;

export default indexQuery;
