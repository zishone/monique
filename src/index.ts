import './types/express';
import { fields, filter, limit, page, skip, sort } from './openapi/components/parameters';
import { OpenAPIV3 } from 'openapi-types';

export { mquery } from './mquery';

export const openapi: { components: { parameters: { [parameterName: string]: OpenAPIV3.ParameterObject } } } = {
  components: {
    parameters: {
      filter,
      fields,
      sort,
      page,
      skip,
      limit,
    },
  },
};
