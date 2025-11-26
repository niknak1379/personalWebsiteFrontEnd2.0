// this util module is now derprecated

// havent set up the backend ci/cd so didnt want to add this in backend
// i was too lazy
// also ive already done it

const S3_BUCKET_URL = "moved server side";
const CLOUDFRONT_URL = "https://d3ljw1a117f4y8.cloudfront.net";

/**
 * Converts an S3 URL to CloudFront CDN URL
 * @param {string} s3Url - The full S3 URL
 * @returns {string} The CloudFront CDN URL
 */
export function toCDN(s3Url) {
  return s3Url.replace(S3_BUCKET_URL, CLOUDFRONT_URL);
}
