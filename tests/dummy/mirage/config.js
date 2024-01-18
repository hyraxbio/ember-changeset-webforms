import { discoverEmberDataModels } from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    models: { ...discoverEmberDataModels(config.store), ...config.models },
    routes() {
      this.urlPrefix = '';
      this.namespace = '';

      this.get('/versions.json', () => {});
      this.passthrough();
      this.urlPrefix = '';
      this.namespace = '';
      this.passthrough();
    },
  };
  return createServer(finalConfig);
}
