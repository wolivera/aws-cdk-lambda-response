cd nodejs-example-extension
chmod +x index.js
npm install
cd ..

chmod +x extensions/nodejs-example-extension
zip -r extension.zip .

aws lambda publish-layer-version \
 --layer-name "nodejs-example-extension" \
 --region "us-east-1" \
 --zip-file  "fileb://path/to/file/extension.zip"
