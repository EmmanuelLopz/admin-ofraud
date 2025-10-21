"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

import { useEffect, useState } from "react";
import { useAuth } from '@/src/context/AuthContext';
import { AuthRunner } from '@/src/wrappers/authRunner';
import axios from 'axios';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface TotalUsers{
    date: string;
    total_users: number;
}

const dates = [
    { "date": "2024-10-05", "total_users": 1 },
    { "date": "2024-10-06", "total_users": 10 },
    { "date": "2024-10-07", "total_users": 40 },
    { "date": "2024-10-08", "total_users": 100 },
    { "date": "2024-10-09", "total_users": 250 },
    { "date": "2024-10-10", "total_users": 300 },
    { "date": "2024-10-11", "total_users": 500 },
    { "date": "2024-10-12", "total_users": 1000 },
    { "date": "2024-10-13", "total_users": 2250 },
    { "date": "2024-10-14", "total_users": 5000 }
];



export default function TotalReportsAllTime() {
    const [chart, setChart] = useState<TotalUsers[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { accessToken, tryRefreshToken, logout, loadingTokens } = useAuth();

    const authRunner = new AuthRunner(
        () => accessToken,
        async() => {
            const refreshed = await tryRefreshToken();
            return refreshed ? accessToken : null;
        },
        logout
    );

    useEffect(() => {
        if (loadingTokens) return;
        
        const date_req = "2025-10-05";

        const fetchGraphData = async () => {
          try {
            const data = await authRunner.runWithAuth(async (token) => {
              const response = await axios.get(
                `http://localhost:3001/stats/user-registrations?since=${date_req}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return response.data;
            });

            console.log("Top users:", data);
            setChart(data);
          } catch (e: any) {
            console.error(e);
            setError(
              e?.response?.data?.message ||
                e?.message ||
                "Failed to load top reports"
            );
          }
        };

        fetchGraphData();
      }, []);

    const datos = {
        labels: chart.map(r => r.date),
        datasets: [{
            label: 'Usuarios',
            data: chart.map(r => r.total_users),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const options = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                onClick: () => {},
                position: "top",
                labels: {
                    color: "#060025",
                    boxWidth: 12,
                    usePointStyle: true,
                },
            },
            title: {
                display: true,
                text: "Total de usuarios registrados a lo largo del tiempo",
                color: "#060025",
                font: { size: 20, weight: "bold" },
            },
        },
        layout: { padding: 8 },
    } satisfies ChartOptions<"line">;

    
    return(
        <div className="flex justify-center items-center">
            <Line data={datos} options={options} width={1000} height={400}/>
        </div>
        
    )

}