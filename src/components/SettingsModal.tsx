import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  getLLMConfig, 
  setLLMConfig, 
  getLLMProviders, 
  validateApiKey,
  LLMConfig,
  LLMProviders 
} from "@/utils/llmConfig";
import { Eye, EyeOff, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [config, setConfig] = useState<LLMConfig>({
    provider: 'openai',
    apiKey: '',
    model: 'gpt-4o',
    baseURL: ''
  });
  const [providers, setProviders] = useState<LLMProviders>({});
  const [showApiKey, setShowApiKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadConfiguration();
    }
  }, [isOpen]);

  const loadConfiguration = async () => {
    setIsLoading(true);
    try {
      const [currentConfig, availableProviders] = await Promise.all([
        getLLMConfig(),
        getLLMProviders()
      ]);
      
      setConfig(currentConfig);
      setProviders(availableProviders);
      
      if (!currentConfig.baseURL && availableProviders[currentConfig.provider]) {
        setConfig(prev => ({
          ...prev,
          baseURL: availableProviders[currentConfig.provider].baseURL
        }));
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
      toast.error('Failed to load settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProviderChange = (provider: string) => {
    const providerConfig = providers[provider];
    if (providerConfig) {
      setConfig(prev => ({
        ...prev,
        provider,
        baseURL: providerConfig.baseURL,
        model: providerConfig.models[0] // Set first model as default
      }));
      setHasChanges(true);
      setIsValid(null);
    }
  };

  const handleConfigChange = (field: keyof LLMConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
    if (field === 'apiKey') {
      setIsValid(null);
    }
  };

  const handleValidateApiKey = async () => {
    if (!config.apiKey.trim()) {
      toast.error('Please enter an API key');
      return;
    }

    setIsValidating(true);
    try {
      const valid = await validateApiKey(config.provider, config.apiKey, config.baseURL);
      setIsValid(valid);
      
      if (valid) {
        toast.success('API key is valid!');
      } else {
        toast.error('API key validation failed');
      }
    } catch (error) {
      console.error('Validation error:', error);
      toast.error('Failed to validate API key');
      setIsValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = async () => {
    if (!config.apiKey.trim()) {
      toast.error('API key is required');
      return;
    }

    setIsLoading(true);
    try {
      await setLLMConfig(config);
      toast.success('Settings saved successfully!');
      setHasChanges(false);
      onClose();
    } catch (error) {
      console.error('Error saving configuration:', error);
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        onClose();
        setHasChanges(false);
      }
    } else {
      onClose();
    }
  };

  const currentProvider = providers[config.provider];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} >
      <DialogContent className="sm:max-w-[500px] text-white">
        <DialogHeader>
          <DialogTitle>LLM Settings</DialogTitle>
          <DialogDescription>
            Configure your preferred LLM provider and API credentials.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Provider Selection */}
          <div className="space-y-2">
            <Label htmlFor="provider">LLM Provider</Label>
            <Select
              value={config.provider}
              onValueChange={handleProviderChange}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(providers).map(([key, provider]) => (
                  <SelectItem key={key} value={key}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model Selection */}
          {currentProvider && (
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select
                value={config.model}
                onValueChange={(value) => handleConfigChange('model', value)}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {currentProvider.models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                value={config.apiKey}
                onChange={(e) => handleConfigChange('apiKey', e.target.value)}
                placeholder="Enter your API key"
                disabled={isLoading}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {isValid !== null && (
                  <div className="flex items-center">
                    {isValid ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="h-3 w-3" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleValidateApiKey}
                disabled={isValidating || !config.apiKey.trim()}
                className="text-xs"
              >
                {isValidating ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    Validating...
                  </>
                ) : (
                  'Validate Key'
                )}
              </Button>
            </div>
          </div>

          {/* Base URL (Advanced) */}
          <div className="space-y-2">
            <Label htmlFor="baseURL">Base URL (Advanced)</Label>
            <Input
              id="baseURL"
              value={config.baseURL}
              onChange={(e) => handleConfigChange('baseURL', e.target.value)}
              placeholder="Custom API endpoint URL"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to use the default endpoint for the selected provider.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSave} disabled={isLoading || !hasChanges}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
