Install Dependencies
npm init -y
npm install express aws-sdk cors
Run Backend
node server.js

AWS S3 has two different CORS editors depending on the console version.

If the editor says "JSON" (new S3 console)

Paste this exactly:

[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "HEAD"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]

