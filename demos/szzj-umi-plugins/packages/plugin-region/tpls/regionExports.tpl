import lodashGet from 'lodash/get';

{{#RegionList}}
import region_{{name}} from '{{{path}}}';
{{/RegionList}}


export const regionInfo: {[key: string]: any} = {
  {{#RegionList}}
  '{{name}}': {
    messages: {
      ...region_{{name}}
    },
  },
  {{/RegionList}}
};