export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Param {
  name: string;
  type: string;
  required: boolean;
  description: string;
  enum?: string[];
  default?: string;
  example?: string;
}

export interface Endpoint {
  id: string;
  method: HttpMethod;
  path: string;
  title: string;
  description: string;
  pathParams?: Param[];
  queryParams?: Param[];
  bodyParams?: Param[];
  response?: Record<string, unknown>;
  responseDescription?: string;
  notes?: string[];
}

export interface Resource {
  id: string;
  name: string;
  description: string;
  endpoints: Endpoint[];
}

export interface ConstantValue {
  value: string;
  description: string;
}

export interface ConstantGroup {
  id: string;
  name: string;
  description: string;
  constants: ConstantValue[];
}

export interface ErrorCode {
  status: number;
  code: string;
  description: string;
}
