# Gobbo Height Generator

This script will generate a HTML page with all the gobbos (and their respective heights) from a Google Sheets document.

## Configuration

Create a file called `.env` with the following properties:

```env
# Where the HTML file goes
OUTPUT_FILE_NAME="./public/index.html"

### Google API Authentication

# The document ID, can be copied from the URL
GOOGLE_SHEETS_ID="15Osrc8..."

# Set up a new client on Google Cloud Console using the Sheets API -
# It will give you an email address
GOOGLE_CLIENT_EMAIL="something something ... @ iam.gserviceaccount.com"

# It will also generate a private key
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY----- ...etc"

# The tab name at the bottom of the Sheets document you want to copy from
GOOGLE_SHEETS_SHEET_NAME="Gobbos"

# Header text for the username column
GOOGLE_SHEETS_COL_NAME="Name"

# Header text for the gobbo-count column
GOOGLE_SHEETS_COL_COUNT="Count"
```
