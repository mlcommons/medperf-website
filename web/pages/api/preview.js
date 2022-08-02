import indexQuery from '../../sanity/queries';
import { previewClient } from '../../sanity/server';

export default async function preview(req, res) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET
    || !req.query.document
  ) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  console.log('Request query info', req.query.document);

  const { document } = req.query;

  const isDraft = document.startsWith('drafts.');
  const id = isDraft ? document.slice(7) : document;

  if (id === 'settings') {
    const indexData = await previewClient.fetch(indexQuery);

    if (!indexData) {
      return res.status(401).json({ message: 'Could not find settings to show on index page' });
    }

    res.setPreviewData({});

    res.writeHead(307, { Location: '/' });
  } else {
    // console.log('No match');
    res.status(401).json({ message: 'Could not find any of those previews' });
  }

  return res.end();
}
