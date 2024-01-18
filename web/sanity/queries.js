const metadataQuery = `
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage,
  "siteSettings": *[_type == "settings"][0]{
    name,
    email,
    documentation,
    teams,
    github,
    privacyPolicy,
    EULA,
    "seoDescription": seo.description,
    "seoImage": seo.openGraphImage,
  }
`;

export const indexQuery = `*[_type == "homepage"][0]{
  ...,
  ${metadataQuery},
}`;

export const benchmarkSampleQuery = `*[_type == "benchmarkSample"][0]{
  ...,
  ${metadataQuery},
}`;

export const siteSettingsQuery = `*[_type == "settings"][0]{
  ...,
  ${metadataQuery},
}`;