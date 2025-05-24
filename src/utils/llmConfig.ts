/* eslint-disable @typescript-eslint/no-explicit-any */
// LLM Configuration utilities for Chrome Extension
// Handles communication with background script for secure API key storage

export interface LLMConfig {
  provider: string;
  apiKey: string;
  model: string;
  baseURL: string;
}

export interface LLMProvider {
  name: string;
  models: string[];
  baseURL: string;
  requiresApiKey: boolean;
}

export interface LLMProviders {
  [key: string]: LLMProvider;
}

// Send message to background script
function sendMessage(message: any): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof chrome !== 'undefined' && chrome.runtime) {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (response && response.success) {
          resolve(response);
        } else {
          reject(new Error(response?.error || 'Unknown error'));
        }
      });
    } else {
      // Fallback for development environment
      reject(new Error('Chrome extension API not available'));
    }
  });
}

// Get current LLM configuration
export async function getLLMConfig(): Promise<LLMConfig> {
  try {
    const response = await sendMessage({ action: 'getConfig' });
    return response.data;
  } catch (error) {
    console.error('Error getting LLM config:', error);
    // Return default config for development
    return {
      provider: 'openai',
      apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
      model: 'gpt-4o',
      baseURL: 'https://api.openai.com/v1'
    };
  }
}

// Set LLM configuration
export async function setLLMConfig(config: LLMConfig): Promise<void> {
  try {
    await sendMessage({ action: 'setConfig', data: config });
  } catch (error) {
    console.error('Error setting LLM config:', error);
    throw error;
  }
}

// Get available LLM providers
export async function getLLMProviders(): Promise<LLMProviders> {
  try {
    const response = await sendMessage({ action: 'getProviders' });
    return response.data;
  } catch (error) {
    console.error('Error getting LLM providers:', error);
    // Return default providers for development
    return {
      openai: {
        name: 'OpenAI',
        models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
        baseURL: 'https://api.openai.com/v1',
        requiresApiKey: true
      },
      azure: {
        name: 'Azure OpenAI',
        models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-35-turbo'],
        baseURL: 'https://models.inference.ai.azure.com',
        requiresApiKey: true
      }
    };
  }
}

// Validate API key
export async function validateApiKey(provider: string, apiKey: string, baseURL?: string): Promise<boolean> {
  try {
    const response = await sendMessage({
      action: 'validateApiKey',
      provider,
      apiKey,
      baseURL
    });
    return response.valid;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
}

// Check if extension environment is available
export function isExtensionEnvironment(): boolean {
  return typeof chrome !== 'undefined' && chrome.runtime && !!chrome.runtime.id;
}

// Get API key for current provider (for backward compatibility)
export async function getApiKey(): Promise<string> {
  const config = await getLLMConfig();
  return config.apiKey;
}

// Create LLM client configuration based on current settings
export async function createLLMClientConfig() {
  const config = await getLLMConfig();

  switch (config.provider) {
    case 'openai':
    case 'azure':
      return {
        baseURL: config.baseURL,
        apiKey: config.apiKey,
        model: config.model
      };

    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
}
