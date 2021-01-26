# Getting Started for Production

Building the production environment involves the similar steps to local.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)

## Building and Running the Stack

Follow the same steps as local; however, use `docker-compose.prod.yml` instead. [Getting Started for Local Development](../getting_started_local/#2-set-up-back-end)

The environment also needs to be configured as listed below.

## Configuring the Stack

### 1. Traefik

You will need to configure each router's `rule`, which is used to route a request to a service (e.g. django, react, cors-proxy).

1. Enter directory `./backend/docker/production/traefik/`
2. Open `traefik.yml` in your editor
3. Edit rules for routers
   - Change `example.com` to the domain name (e.g. `esgf-dev1.llnl.gov`)
   - **OPTIONAL:** Change `/prefix` to the domain subdirectory for the service
     - For example, the `PathPrefix` for the rules of backend can be `/metagrid-backend` and frontend can be `/metagrid`.
     - **If you don't use a subdirectory, delete `` PathPrefix(`prefix`) `` for the service**

Once configured, Traefik will get you a valid certificate from Lets Encrypt and update it automatically.

### 2. Back-end

1. Enter directory: `./backend/.envs/.production/`
2. Copy env files `.django.template` and `.postgres.template`
3. Rename files as `.django` and `.postgres`

| Service  | Environment Variable                                                                               | Description                                                                                                                                                                                                                        | Documentation                                                                   | Type             | Example                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Django   | `DJANGO_SECRET_KEY`                                                                                | A secret key for a particular Django installation. This is used to provide cryptographic signing, and should be set to a unique, unpredictable value.                                                                              | [Link](https://docs.djangoproject.com/en/3.0/ref/settings/#secret-key)          | string           | `DJANGO_SECRET_KEY=YAFKApvifkIFTw0DDNQQdHI34kyQdyWH89acWTogCfm4SGRz2x`                                                                 |
| Django   | `DJANGO_ADMIN_URL`                                                                                 | The url to access the Django Admin page. It should be set to a unique, unpredictable value (not `admin/`).                                                                                                                         |                                                                                 | string           | `DJANGO_ADMIN_URL=11hxhSu03aSBTOZWCysDvSvcDfa16kFh/`                                                                                   |
| Django   | `DJANGO_ALLOWED_HOSTS`                                                                             | A list of strings representing the host/domain names that this Django site can serve. This is a security measure to prevent HTTP Host header attacks, which are possible even under many seemingly-safe web server configurations. | [Link](https://docs.djangoproject.com/en/3.0/ref/settings/#allowed-hosts)       | array of strings | `DJANGO_ALLOWED_HOSTS=esgf-dev1.llnl.gov`<br><br>Local environment:<br>`DJANGO_ALLOWED_HOSTS=localhost`                                |
| Django   | `DOMAIN_NAME`                                                                                      | The domain linked to the server hosting the Django site.                                                                                                                                                                           |                                                                                 | string           | `DOMAIN_NAME=esgf-dev1.llnl.gov`<br><br>Local environment:<br>`DOMAIN_NAME=localhost`                                                  |
| Django   | `DOMAIN_SUBDIRECTORY`                                                                              | **OPTIONAL** The domain subdirectory that is proxied to the Django site (e.g. _esgf-dev1.llnl.gov/metagrid-backend_). Omit backslash and match backend rules' `PathPrefix` in `traefik.yml`.                                       |                                                                                 | string           | `DOMAIN_SUBDIRECTORY=metagrid-backend`                                                                                                 |
| Django   | `CORS_ORIGIN_WHITELIST`                                                                            | List of origins that are authorized to make HTTP requests. Make sure to add the URL of the front-end here.                                                                                                                         | [Link](https://github.com/adamchainz/django-cors-headers#cors_origin_whitelist) | array of strings | `CORS_ORIGIN_WHITELIST=https://esgf-dev1.llnl.gov/metagrid`<br><br>Local environment:<br>`CORS_ORIGIN_WHITELIST=http://localhost:3000` |
| Django   | `KEYCLOAK_URL`                                                                                     | The url of your hosted Keycloak server, it must end with `/auth`.                                                                                                                                                                  | [Link](https://django-allauth.readthedocs.io/en/latest/providers.html#keycloak) | string           | `KEYCLOAK_URL=https://keycloak.metagrid.com/auth`                                                                                      |
| Django   | `KEYCLOAK_REALM`                                                                                   | The name of the Keycloak realm you want to use.                                                                                                                                                                                    | [Link](https://django-allauth.readthedocs.io/en/latest/providers.html#keycloak) | string           | `KEYCLOAK_REALM=esgf`                                                                                                                  |
| Django   | `KEYCLOAK_CLIENT_ID`                                                                               | The id for the Keycloak client, which is the entity that can request Keycloak to authenticate a user.                                                                                                                              |                                                                                 | string           | `KEYCLOAK_CLIENT_ID=metagrid-backend`                                                                                                  |
| Postgres | `POSTGRES_HOST` <br> `POSTGRES_PORT`<br> `POSTGRES_DB`<br> `POSTGRES_USER`<br> `POSTGRES_PASSWORD` | The default Postgres environment variables are self-explanatory and can be updated if needed.                                                                                                                                      |                                                                                 | string           | N/A                                                                                                                                    |

### 3. Front-end

1. Enter directory: `./frontend/.envs/.production/`
2. Copy env files `.cors-proxy.template` and `.react.template`
3. Rename files as `.cors-proxy` and `.react`

| Service    | Environment Variable                     | Description                                                                                                                                                                                                                                                                      | Documentation                                                            | Type             | Example                                                                                                                                              |
| ---------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| React      | `PUBLIC_URL`                             | **OPTIONAL**<br> The subdirectory of the domain where the project is hosted. Must include backslash and match frontend rules' `PathPrefix` in `traefik.yml`.                                                                                                                     | [Link](https://stackoverflow.com/a/58508562/8023435)                     | string           | `CORS_PROXY_URL=/metagrid`                                                                                                                           |
| React      | `REACT_APP_API_URL`                      | The URL for the MetaGrid API used to query projects, users, etc.                                                                                                                                                                                                                 |                                                                          | string           | `REACT_APP_METAGRID_API_URL=https://esgf-dev1.llnl/metagrid-backend`<br><br>Local environment:<br>`REACT_APP_METAGRID_API_URL=http://localhost:8000` |
| React      | `REACT_APP_WGET_API_URL`                 | The URL for the ESGF wget API to generate a wget script for downloading selected datasets.                                                                                                                                                                                       | [Link](https://github.com/ESGF/esgf-wget)                                | string           | `REACT_APP_WGET_API_URL=https://pcmdi8vm.llnl.gov/wget`                                                                                              |
| React      | `REACT_APP_ESGF_NODE_URL`                | The URL for the ESGF Search API node used to query datasets, files, and facets.                                                                                                                                                                                                  | [Link](https://github.com/ESGF/esgf.github.io/wiki/ESGF_Search_REST_API) | string           | `REACT_APP_ESGF_NODE_URL=https://esgf-node.llnl.gov`                                                                                                 |
| React      | `REACT_APP_CORS_PROXY_URL`               | The URL for the proxy API that enables cross-origin requests to anywhere.                                                                                                                                                                                                        |                                                                          | string           | `REACT_APP_CORS_PROXY_URL=https://esgf-dev1.llnl.gov/`                                                                                               |
| React      | `REACT_APP_KEYCLOAK_URL`                 | The url of your hosted Keycloak server, it must end with `/auth`.                                                                                                                                                                                                                |                                                                          | string           | `REACT_APP_KEYCLOAK_URL=https://keycloak.metagrid.com/auth`                                                                                          |
| React      | `REACT_APP_KEYCLOAK_REALM`               | The name of the Keycloak realm you want to use.                                                                                                                                                                                                                                  |                                                                          | string           | `REACT_APP_KEYCLOAK_REALM=esgf`                                                                                                                      |
| React      | `REACT_APP_KEYCLOAK_CLIENT_ID`           | The id for the Keycloak client, which is an entity that can request Keycloak to authenticate a user.                                                                                                                                                                             |                                                                          | string           | `REACT_APP_KEYCLOAK_CLIENT_ID=frontend`                                                                                                              |
| React      | `REACT_APP_HOTJAR_ID`                    | **OPTIONAL**<br>Your site's ID. This is the ID which tells Hotjar which site settings it should load and where it should save the data collected.                                                                                                                                | [Link](https://github.com/abdalla/react-hotjar)                          | number           | `REACT_APP_HOTJAR_ID=1234567`                                                                                                                        |
| React      | `REACT_APP_HOTJAR_SV`                    | **OPTIONAL**<br>The snippet version of the Tracking Code you are using. This is only needed if Hotjar ever updates the Tracking Code and needs to discontinue older ones. Knowing which version your site includes allows Hotjar team to contact you and inform you accordingly. | [Link](https://github.com/abdalla/react-hotjar)                          | number           | `REACT_APP_HOTJAR_SV=6`                                                                                                                              |
| React      | `REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID` | **OPTIONAL**<br>Google Analytics tracking id.                                                                                                                                                                                                                                    | [Link](https://github.com/react-ga/react-ga#api)                         | string           | `REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID=UA-000000-01`                                                                                                |
| CORS Proxy | `PROXY_ORIGIN_WHITELIST`                 | **OPTIONAL**<br> If set, requests whose origin is not listed are blocked. If this list is empty, all origins are allowed.                                                                                                                                                        | [Link](https://github.com/Rob--W/cors-anywhere#server)                   | array of strings | `PROXY_ORIGIN_WHITELIST=https://esgf-dev1.llnl.gov, http://esgf-dev1.llnl.gov`                                                                       |