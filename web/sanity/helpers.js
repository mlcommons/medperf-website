import {
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from 'next-sanity';

import sanityConfig from './config';

const imageBuilder = createImageUrlBuilder(sanityConfig);

export const urlForImage = (source) => imageBuilder.image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig);
