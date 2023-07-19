// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';

// We import object and document schemas
import homepage from './documents/homepage';
import benchmarkSample from './documents/benchmarkSample';
import settings from './documents/settings';

import role from './objects/role';
import section from './objects/section';
import newsArticle from './objects/newsArticle';
import calloutBox from './objects/calloutBox';
import callToAction from './objects/callToAction';
import resultsMap from './objects/resultsMap';

import blockContent from './objects/blockContent';
import asset from './objects/asset';
import seo from './objects/seo';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    homepage,
    benchmarkSample,
    settings,

    role,
    newsArticle,
    section,
    calloutBox,
    callToAction,
    resultsMap,
    blockContent,
    asset,
    seo,
  ]),
});
