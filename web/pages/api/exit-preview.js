export default async function exit(req, res) {
  res.clearPreviewData();

  const { document } = req.query;

  const location = document || '/';

  res.writeHead(307, { Location: location });
  res.end();
}
