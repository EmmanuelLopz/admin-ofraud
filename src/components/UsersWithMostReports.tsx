"use client";
import {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
} from "chart.js";
import { AuthRunner } from '../wrappers/authRunner';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale);

interface UserLikes {
    id: number;
    name: string;
    num_reports: number;
}

const user_likes = [
    { "id": 1, "name": "Ana García", "num_reports": 10 },
    { "id": 2, "name": "Bruno Díaz", "num_reports": 15 },
    { "id": 3, "name": "Carla L M", "num_reports": 45 },
    { "id": 4, "name": "David Soto", "num_reports": 40 },
    { "id": 5, "name": "Elena Mora", "num_reports": 8 },
    { "id": 6, "name": "Fernando Paz", "num_reports": 75 },
    { "id": 7, "name": "Gisela Roca", "num_reports": 50 },
    { "id": 8, "name": "Hugo Luna", "num_reports": 2 },
    { "id": 9, "name": "Irene Sol", "num_reports": 44 },
    { "id": 10, "name": "Javier Ríos", "num_reports": 68 }
  ];

  

  

export default function UsersWithMostReports() {
    const [chart, setChart] = useState<UserLikes[]>([]);
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
        const fetchGraphData = async () => {
          try {
            const data = await authRunner.runWithAuth(async (token) => {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/stats/top-users`,
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

    const data = {
        labels: chart.map(r => r.name),
        datasets: [{
          label: 'Reportes',
          data: chart.map(r => r.num_reports),
          backgroundColor: [
            '#060025',
            '#302e49',
            '#5c596f',
            '#8b8999',
            '#bdbbc4',
            '#d0dae6',
            '#afc3dc',
            '#8dadd2',
            '#6998c7',
            '#3b83bd'
          ],
          borderColor: "#000000",
          borderWidth: 1
        }]
      };

      const options = {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  display: false,
              },
              title: {
                  display: true,
                  text: "Top 10 usuarios con más reportes",
                  color: "#060025",
                  font: { size: 20, weight: "bold" },
              },
          },
          layout: { padding: 8 },
      } satisfies ChartOptions<"bar">;
  
    return(
        <div className="flex justify-center items-center">
            <Bar data={data} options={options} width={500} height={400}/>
        </div>
    )

}