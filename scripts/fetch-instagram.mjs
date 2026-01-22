import fs from 'fs';
import path from 'path';
import https from 'https';

const USERNAME = 'meet_saspara';
const OUTPUT_FILE = './public/assets/instagram-profile.png';
const INSTAGRAM_URL = `https://www.instagram.com/${USERNAME}/?__a=1&__d=dis`;

// Ensure public/assets exists
const dir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

console.log(`Fetching Instagram profile picture for ${USERNAME}...`);

async function fetchProfilePic() {
  try {
    // Note: This often fails without valid session cookies due to Instagram's anti-scraping
    const response = await fetch(INSTAGRAM_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile JSON: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    const picUrl = data.graphql?.user?.profile_pic_url_hd || data.graphql?.user?.profile_pic_url;

    if (!picUrl) {
      throw new Error('Profile picture URL not found in JSON response');
    }

    console.log(`Found profile picture URL: ${picUrl}`);
    
    // Download image
    const imgResponse = await fetch(picUrl);
    const buffer = Buffer.from(await imgResponse.arrayBuffer());
    
    fs.writeFileSync(OUTPUT_FILE, buffer);
    console.log(`Successfully saved profile picture to ${OUTPUT_FILE}`);

  } catch (error) {
    console.warn(`Warning: Could not fetch Instagram profile picture. Using default/fallback. Error: ${error.message}`);
    // We exit with 0 to allow the build to continue using the fallback image
    process.exit(0);
  }
}

fetchProfilePic();
