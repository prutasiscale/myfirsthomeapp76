import axios from 'axios';
import { Config, Inventory } from '../types';

const API_BASE_URL = 'http://192.168.1.197:9998'; // Updated with your home server IP

const handleApiError = (error: any): never => {
  let errorMessage = 'An unknown error occurred';
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = `API error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`;
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response received from server. Please check your network connection.';
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = 'Error setting up the request. Please try again.';
  }
  throw new Error(errorMessage);
};

export const fetchConfig = async (): Promise<Config> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/config`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchInventory = async (): Promise<Inventory> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchWidgetData = async (scriptPath: string, host: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/widget/${encodeURIComponent(scriptPath)}`, {
      params: { host },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};