import React, { useState, useEffect } from 'react';
import { fetchWidgetData } from '../utils/api';
import { Cpu, Server, Activity, MemoryStick, Clock, TrendingUp, User, HardDrive } from 'lucide-react';

interface WidgetProps {
  name: string;
  scriptPath: string;
  selectedHost: string | null;
}

const Widget: React.FC<WidgetProps> = ({ name, scriptPath, selectedHost }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedHost) {
      setLoading(true);
      setError(null);
      fetchWidgetData(scriptPath, selectedHost)
        .then(setData)
        .catch((err: Error) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setData(null);
      setError(null);
    }
  }, [scriptPath, selectedHost]);

  // ... (rest of the component remains the same)
};

export default Widget;