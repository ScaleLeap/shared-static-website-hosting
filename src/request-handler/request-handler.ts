import type { CloudFrontRequestHandler } from 'aws-lambda';

export const handler: CloudFrontRequestHandler = async (event) => {
  const request = event.Records[0].cf.request;

  if (request.uri.endsWith('/')) {
    request.uri += 'index.html';
  }

  for (const [headerName, [header]] of Object.entries(request.headers)) {
    if (headerName === 'host') {
      const [subDomain] = header.value.split('.');
      request.uri = ['/', subDomain, request.uri].join('');
    }
  }

  return request;
};