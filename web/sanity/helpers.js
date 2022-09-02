import { createPreviewSubscriptionHook } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

import sanityConfig from './config';

const imageBuilder = imageUrlBuilder(sanityConfig);

export const urlForImage = (source) => imageBuilder.image(source);

export const usePreviewSubscription = createPreviewSubscriptionHook(sanityConfig);
