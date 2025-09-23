const axios = require('axios');

let lastUpdateTime = 0;

async function updateGist(gistId, files, token) {
  const now = Date.now();
  if (now - lastUpdateTime < 6000) {
    console.log('Please wait at least 1 minute between updates.');
    return;
  }
  lastUpdateTime = now;
  try {
    const response = await axios.patch(
      `https://api.github.com/gists/${gistId}`,
      { files },
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
    console.log('Gist updated successfully:', response.data.html_url);
  } catch (error) {
    if (error.response) {
      console.error('Gist update failed:', error.response.status, error.response.data.message);
    } else {
      console.error('Gist update failed:', error.message);
    }
  }
}

// --- BEGIN: content from https://gist.githubusercontent.com/peterbecskei/e6551cad5738e4f01d6c2893ed8d86cf/raw/670f06d911e04605ca8bf5e24057f508cc1138d4/content.txt ---
Az élet túl rövid ahhoz, hogy rossz kávét igyunk.
// --- END: content from gist ---

// Example usage:
// updateGist('your-gist-id', { 'file.txt': { content: 'New content' } }, 'your-github-token');