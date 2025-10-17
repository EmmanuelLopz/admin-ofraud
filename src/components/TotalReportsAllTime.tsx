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

import { useEffect } from "react";
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

const data = {
  labels: dates.map(r => r.date),
  datasets: [{
    label: 'Usuarios',
    data: dates.map(r => r.total_users),
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

export default function TotalReportsAllTime() {
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
        const fetchGraphData = async () => {
            if(loadingTokens) return;

            const date_req = "2024-10-05";

            const data = await authRunner.runWithAuth(async (token) => {
                const res = await axios.get(`http://localhost:3001/stats/user-registrations?since=${date_req}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                return res.data;
            });

            console.log(data);
        }

        fetchGraphData();

        console.log("hola desde usuario grafica");

    }, [])
    
    return(
        <div className="flex justify-center items-center">
            <Line data={data} options={options} width={1000} height={400}/>
        </div>
        
    )

}