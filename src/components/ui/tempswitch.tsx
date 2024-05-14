import React from 'react';
import styles from '@/css/tempswitch.module.css';

interface TemperatureToggleProps {
  temperatureFormat: string;
  onToggle: (format: string) => void;
}

const TemperatureToggle: React.FC<TemperatureToggleProps> = ({ temperatureFormat, onToggle }) => {
  return (
    <div className={styles.container}>
      <label className={styles.label +  " text-white"}>
        Metric
        <input
            className={styles.radioInput}
          type="radio"
          value="metric"
          checked={temperatureFormat === 'metric'}
          onChange={() => onToggle('metric')}
        />
      </label>
      <label className={styles.label +  " text-white"}>
        Imperial
        <input
            className={styles.radioInput}
          type="radio"
          value="imperial"
          checked={temperatureFormat === 'imperial'}
          onChange={() => onToggle('imperial')}
        />
      </label>
    </div>
  );
};

export default TemperatureToggle;