import urllib.request
import re
import requests

def fetch(url):
    response = requests.head(url)
    content_length = response.headers.get('Content-Length')
    print(f"Content-status {response.status_code}")
    print(f"Content-Length: {response.headers}")
    print(f"Content too large: {content_length} bytes. Disconnecting.")
    response = requests.get(url)
    re = response.content.decode('utf-8')
    print(re)
    print(f"Downloaded {len(response.content)} bytes.")
    return re

# Example usage
#fetch_if_small('https://www.hasznaltauto.hu/22299525')

url = "www.facebook.com/peter.becskei1/"

url = "https://www.facebook.com/"

url = "https://realestatehungary.hu/lista/elado+lakas"

url = "https://befektetes.immobilienungarn.net/lista/elado+lakas"

url = "https://ingatlan.com/34991016"


url = 'https://www.hasznaltauto.hu/22299525'

#with urllib.request.urlopen(url) as response:
#    CONTENT = response.read().decode('utf-8')

CONTENT = fetch(url)
HREF = re.findall(r'href=[\'"]?(https?://[^\'" >]+|www\.[^\'" >]+)', CONTENT)

with open('HREF.csv', 'w', encoding='utf-8') as f:
    f.write("URL\n")
    for link in HREF:
        f.write(f'"{link}"\n')