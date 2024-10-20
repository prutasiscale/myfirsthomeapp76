import React, { useState, useEffect } from 'react';
import HostTable from './components/HostTable';
import WidgetContainer from './components/WidgetContainer';
import WorldClocks from './components/WorldClocks';
import { fetchConfig, fetchInventory } from './utils/api';
import { Config, Inventory } from './types';

const App: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [selectedHost, setSelectedHost] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [configData, inventoryData] = await Promise.all([fetchConfig(), fetchInventory()]);
        
        setConfig(configData);
        setInventory(inventoryData);
      } catch (err) {
        setError((err as Error).message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ... (rest of the component remains the same)
};

export default App;