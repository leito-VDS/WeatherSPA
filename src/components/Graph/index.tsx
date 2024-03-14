import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { WeatherData } from '../../constants';

interface GraphProps {
  [key: string]: WeatherData[];
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};

const Graph: React.FC<GraphProps> = ({ weekData }) => {
  // Check if weekData is defined and has the expected structure
  if (!weekData) {
    return null; // or handle the case where data is missing or incorrect
  }

  // Take the first 8 elements from the list
  const weatherDataSubset: WeatherData[] = Object.values(weekData).flat().slice(0, 8);
  const labels = weatherDataSubset.map((item) => item.dt_txt.split(" ")[1].slice(0, -3));
  const pressureData = weatherDataSubset.map((item) => item.main.temp);
  const humidityData = weatherDataSubset.map((item) => item.main.humidity);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Temperature curve',
        data: pressureData,
        borderColor: '#141414',
        backgroundColor: '#141414',
      },
      {
        label: 'Humidity (%)',
        data: humidityData,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export default Graph;
