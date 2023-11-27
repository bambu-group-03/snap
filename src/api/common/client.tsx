import { Env } from '@env';
import axios from 'axios';
// Configurar encabezados por defecto para todas las solicitudes
// Instancia para el microservicio de contenido
const contentService = axios.create({
  baseURL: `${Env.API_URL}/content`,
  headers: {
    clientToken: 'CLIENT_TOKEN',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Instancia para el microservicio de identidad
const identityService = axios.create({
  baseURL: `${Env.API_URL}/identity`,
  headers: {
    clientToken: 'CLIENT_TOKEN',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

contentService.defaults.headers.common.clientToken = 'CLIENT_TOKEN';
contentService.defaults.headers.common['Content-Type'] = 'application/json';
contentService.defaults.headers.common.Accept = 'application/json';

identityService.defaults.headers.common.clientToken = 'CLIENT_TOKEN';
identityService.defaults.headers.common['Content-Type'] = 'application/json';
identityService.defaults.headers.common.Accept = 'application/json';

export const client = {
  content: contentService,
  identity: identityService,
};
