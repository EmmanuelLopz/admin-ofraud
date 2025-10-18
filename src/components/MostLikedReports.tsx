"use client";
import {useEffect, useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import { CgOptions } from 'react-icons/cg';
import { useAuth } from '@/src/context/AuthContext';
import { AuthRunner } from '@/src/wrappers/authRunner';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Title,
} from "chart.js";
import axios from 'axios';


ChartJS.register(ArcElement, Tooltip, Legend, Title);

const reports = [
    { "id": 1, "title": "Estafa por mensajes SMS bancarios", "likes": 127 },
    { "id": 2, "title": "Venta falsa de consolas por Instagram", "likes": 115 },
    { "id": 3, "title": "Correo fraudulento de PayPal", "likes": 108 },
    { "id": 4, "title": "Ofertas falsas de empleo en LinkedIn", "likes": 101 },
    { "id": 5, "title": "Sorteo falso de Amazon Prime", "likes": 96 },
    { "id": 6, "title": "Cuenta falsa de soporte técnico", "likes": 89 },
    { "id": 7, "title": "Phishing por WhatsApp corporativo", "likes": 81 },
    { "id": 8, "title": "Venta de boletos falsos en Facebook", "likes": 77 },
    { "id": 9, "title": "Falsa rifa de automóviles", "likes": 73 },
    { "id": 10, "title": "Correo de actualización de cuenta Netflix", "likes": 68 }
  ];
    
interface Report {
    id: number;
    title: string;
    likes: number;
}

export default function MostLikedReports() {
    const [chart, setChart] = useState<Report[]>([]);
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
            "http://localhost:3001/stats/top-reports",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return response.data;
        });

        console.log("Top reports:", data);
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
  }, [loadingTokens, authRunner]);

    const datos = {
        labels: chart.map((r) => r.title),
        datasets: [
        {
            label: "Likes",
            data: chart.map((r) => r.likes),
            backgroundColor: [
            "#FF4400", "#FF6600", "#FF7F0A", "#FFA13A", "#FFB86B",
            "#FF4400AA", "#FF6600AA", "#FF7F0AAA", "#FFA13AAA", "#FFB86BAA"
            ],
            borderColor: "#060025",
            borderWidth: 2,
            hoverOffset: 8
        }
        ]};

      const options = {
        responsive: true,
        maintainAspectRatio: false,        // <- deja que el contenedor mande
        plugins: {
          legend: {
              onClick: () => {},
              position: "right",             // <- leyenda a la derecha
              labels: {
              color: "#060025",
              boxWidth: 10,
              usePointStyle: true,
              // formatter: (v) => v.text.length > 18 ? v.text.slice(0,17) + "…" : v.text, // opcional: truncar
            },
          },
          title: {
            display: true,
            text: "Top 10 reportes con más likes",
            color: "#060025",
            font: { size: 20, weight: "bold" },
          },
        },
        layout: { padding: 8 },
        cutout: "60%",
      } satisfies ChartOptions<"doughnut">;

    return(
        <Doughnut data={datos} options={options} width={600} height={400}/>
    )

}