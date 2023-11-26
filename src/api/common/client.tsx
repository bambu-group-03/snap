import { Env } from '@env';
import axios from 'axios';
export const client = axios.create({
  baseURL: Env.API_URL,
});
// Configurar encabezados por defecto para todas las solicitudes

client.defaults.headers.common.clientToken = 'CLIENT_TOKEN';
client.defaults.headers.common['Content-Type'] = 'application/json';
client.defaults.headers.common.Accept = 'application/json';
