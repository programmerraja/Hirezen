// Background script for Interview Helper Chrome Extension
// Handles secure storage of API keys and LLM configuration

// Default configuration
const DEFAULT_CONFIG = {
  provider: 'openai',
  apiKey: '',
  model: 'gpt-4o',
  baseURL: ''
};

// Available LLM providers
const LLM_PROVIDERS = {
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

// Initialize extension
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Interview Helper extension installed');

  // Set default configuration if not exists
  const config = await getConfig();
  if (!config.provider) {
    await setConfig(DEFAULT_CONFIG);
  }
});

// Message handling for communication with content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  handleMessage(request, sender, sendResponse);
  return true; // Keep message channel open for async response
});

async function handleMessage(request, sender, sendResponse) {
  try {
    switch (request.action) {
      case 'getConfig':
        const config = await getConfig();
        sendResponse({ success: true, data: config });
        break;

      case 'setConfig':
        await setConfig(request.data);
        sendResponse({ success: true });
        break;

      case 'getProviders':
        sendResponse({ success: true, data: LLM_PROVIDERS });
        break;

      case 'validateApiKey':
        const isValid = await validateApiKey(request.provider, request.apiKey, request.baseURL);
        sendResponse({ success: true, valid: isValid });
        break;

      default:
        sendResponse({ success: false, error: 'Unknown action' });
    }
  } catch (error) {
    console.error('Background script error:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// Get configuration from storage
async function getConfig() {
  try {
    const result = await chrome.storage.local.get(['llmConfig']);
    return result.llmConfig || DEFAULT_CONFIG;
  } catch (error) {
    console.error('Error getting config:', error);
    return DEFAULT_CONFIG;
  }
}

// Set configuration in storage
async function setConfig(config) {
  try {
    await chrome.storage.local.set({ llmConfig: config });
    console.log('Configuration saved:', { ...config, apiKey: '***' });
  } catch (error) {
    console.error('Error setting config:', error);
    throw error;
  }
}

// Validate API key by making a test request
async function validateApiKey(provider, apiKey, baseURL) {
  if (!apiKey) return false;

  try {
    const providerConfig = LLM_PROVIDERS[provider];
    if (!providerConfig) return false;

    const url = baseURL || providerConfig.baseURL;

    // For OpenAI and Azure OpenAI, test the models endpoint
    let testEndpoint;
    let headers = {
      'Content-Type': 'application/json'
    };

    switch (provider) {
      case 'openai':
      case 'azure':
        testEndpoint = `${url}/models`;
        headers['Authorization'] = `Bearer ${apiKey}`;
        break;

      default:
        return false;
    }

    const response = await fetch(testEndpoint, {
      method: 'GET',
      headers: headers
    });

    return response.ok || response.status === 401; // 401 might mean valid key but insufficient permissions
  } catch (error) {
    console.error('API key validation error:', error);
    return false;
  }
}

// Export for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getConfig,
    setConfig,
    validateApiKey,
    LLM_PROVIDERS,
    DEFAULT_CONFIG
  };
}
