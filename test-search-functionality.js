// Test script to verify search page functionality
console.log('Testing search page functionality...');

// Test 1: Check if the search route is properly defined
console.log('Test 1: Checking route configuration');
const routePattern = /^\/search\/(.+)$/;
const testUrls = [
  '/search/cool-bio-for-instagram',
  '/search/instagram-bio-for-girls',
  '/search/vip-instagram-bio'
];

testUrls.forEach(url => {
  const match = url.match(routePattern);
  console.log(`URL: ${url} -> Match: ${!!match} -> Keyword: ${match ? match[1] : 'N/A'}`);
});

// Test 2: Check if the keyword extraction logic works
console.log('\nTest 2: Checking keyword extraction logic');
const extractKeyword = (pathname) => {
  const pathParts = pathname.split('/');
  const searchIndex = pathParts.indexOf('search');
  if (searchIndex !== -1 && pathParts.length > searchIndex + 1) {
    return pathParts[searchIndex + 1];
  }
  return null;
};

const testPaths = [
  '/search/cool-bio-for-instagram',
  '/search/instagram-bio-for-girls',
  '/search/vip-instagram-bio',
  '/search/test-keyword-with-dashes'
];

testPaths.forEach(path => {
  const keyword = extractKeyword(path);
  console.log(`Path: ${path} -> Keyword: ${keyword}`);
});

console.log('\nAll tests completed.');