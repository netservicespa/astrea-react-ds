FROM harbor.netserv.it/cicd/node-ci-image:1.0 AS builder

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install
RUN pnpm run build-storybook
# This was used to upload the storybook to nexus, but it's not needed anymore
#RUN cd storybook-static && zip --symlinks -r nsds-react-storybook-static.zip . \
#    && curl -v --user $CI_NEXUS_USERNAME:$CI_NEXUS_PASSWORD --upload-file nsds-react-storybook-static.zip https://nexuspa.netserv.it/repository/binaries/libraries/nsds-react/$(node -e "console.log(require('../package.json').version)")/nsds-react-storybook-static.zip \
#    && rm -f nsds-react-storybook-static.zip

FROM httpd:2.4

COPY --from=builder storybook-static/. /usr/local/apache2/htdocs/
