<h1>LORECAL</h1>

<h2>GCP deploy</h2>

Most of the configs required for deployment are in either `app.yaml.enc` or `cloudbuild.yaml`.  

`cloudbuild.yaml` includes the build steps that execute when a push is sent to master.

`app.yaml.enc` is an encoded file that includes a variety of confidential information required for the deployment.  It is encoded from an `app.yaml` file which is not saved to git.

The `app.yaml` source file is of the following format (sensitive values excluded):

```$xslt
runtime: nodejs10 # For Node.js 8, use runtime: nodejs8

instance_class: F2

env_variables:
  BUCKET_NAME: [redacted]
  SQL_USER:  [redacted]
  SQL_PW: [redacted]
  SQL_DB: [redacted]
  INSTANCE_CONNECTION_NAME: [redacted] 
  COOKIE_SECRET: [redacted]

handlers:
- url: /stylesheets
  static_dir: stylesheets

- url: /.*
  secure: always
  redirect_http_response_code: 301
  script: auto
```

To encode this file into a new `app.yaml.enc` file, simply run the following command:

```
gcloud kms encrypt --plaintext-file=app.yaml --ciphertext-file=app.yaml.enc --location=global --keyring=mysql --key=mysql_connections
```

If you have permissions, you can decode the encrypted file back to it's source with the following command:

```
gcloud kms decrypt --ciphertext-file=app.yaml.enc --plaintext-file=app.yaml --location=global --keyring=mysql --key=mysql_connections
```