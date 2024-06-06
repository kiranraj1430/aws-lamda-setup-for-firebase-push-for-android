# aws-lamda-setup-for-firebase-push-for-android

Step 1:
Go to the Firebase project and download 2 files
1: Admin SDK (which represents private key) Confidential
2: Config file (which represents db URL and project name and other info)

**Step 2:**

create a project and develop index.js and serviceAccountKey.json file

in serviceAccountKey.json file, paste the ADMIN SDK private key, and import that in index.js

Don't remember to add CROS support

**then if you need to test on locally use express or else exclude that and use NPM Install to install Firebase admin**

**then zip the project and use this command to upload the file to AWS Lambda**

**aws lambda update-function-code --function-name FUNCTION-NAME --zip-file fileb://function.zip --region REGION-NAME**

   Make sure FUNCTION-NAME AND REGION NAME IS CORRECTLY CONFIGURED AS PER AWS

**Step3: after using this command, AWS CLI will upload the command to lambda, and on lambda, you need to create a trigger to create an API endpoint**

   USE REST type and enable CROS 
   
   once you get the API endpoint test it on Postman. 

   Finally, it will work and you can send Firebase push notifications by a backend

