// const metadataQuery = `
//   "seoDescription": seo.description,
//   "seoImage": seo.openGraphImage,
//   "siteSettings": *[_type == "settings"][0]{
//     "seoDescription": seo.description,
//     "seoImage": seo.openGraphImage,
//   }
// `;

// export const otherPageQuery = `*[_type == "page"][0]{
//   ...,
//   ${metadataQuery},
// }`;

const indexQuery = `*[_type == "settings"][0]{
  name,
  "seoDescription": seo.description,
  "seoImage": seo.openGraphImage,
}`;

export default indexQuery;
