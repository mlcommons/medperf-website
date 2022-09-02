import { indexQuery, benchmarkSampleQuery } from '../../sanity/queries';
import { previewClient } from '../../sanity/server';

export default async function preview(req, res) {
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET
    || !req.query.document
  ) {
    return res.status(401).json({ message: 'Invalid token or missing document' });
  }

  console.log('Request query info', req.query.document);

  const { document } = req.query;

  const isDraft = document.startsWith('drafts.');
  const id = isDraft ? document.slice(7) : document;

  if (id === 'homepage' || id === 'settings') {
    const indexData = await previewClient.fetch(indexQuery);

    if (!indexData) {
      return res.status(401).json({ message: 'Could not find content to show on index page' });
    }

    res.setPreviewData({});

    res.writeHead(307, { Location: '/' });
  } else if (id === 'benchmarkSample') {
    const benchmarkSampleData = await previewClient.fetch(benchmarkSampleQuery);

    if (!benchmarkSampleData) {
      return res.status(401).json({ message: 'Could not find content to show on benchmark sample page' });
    }

    res.setPreviewData({});

    /* TODO: Remove ?preview=on once benchmarks is released, it will be superfluous */
    res.writeHead(307, { Location: '/benchmarks?preview=on' });
  } else {
    // console.log('No match');
    res.status(401).json({ message: 'Could not find that page to preview' });
  }

  return res.end();
}
