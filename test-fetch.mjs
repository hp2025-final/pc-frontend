import https from 'https';

const baseUrl = 'https://woocommerce-1488048-5826980.cloudwaysapps.com';
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

console.log('Base URL:', baseUrl);
console.log('Consumer Key exists:', !!consumerKey);
console.log('Consumer Secret exists:', !!consumerSecret);

const url = new URL(`${baseUrl}/wp-json/wc/v3/products/categories`);
url.searchParams.set('consumer_key', consumerKey);
url.searchParams.set('consumer_secret', consumerSecret);
url.searchParams.set('per_page', '1');

console.log('\nTrying fetch...');
try {
    const response = await fetch(url.toString());
    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Success! Got data:', data.length, 'categories');
} catch (error) {
    console.error('Fetch failed:', error.message);
    console.error('Error cause:', error.cause);

    // Try with https module
    console.log('\nTrying with https module...');
    https.get(url.toString(), (res) => {
        console.log('HTTPS module status:', res.statusCode);
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => console.log('HTTPS module success!'));
    }).on('error', (err) => {
        console.error('HTTPS module error:', err.message);
    });
}
