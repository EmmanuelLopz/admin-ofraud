import type { Reporte } from './types'; // Ajusta la ruta si es necesario

const reportes: Reporte[] = [
  {
    title: "Bache en la avenida principal",
    url: "https://ciudadsegura.org/reportes/123",
    photo_url: "https://planjuarez.org/wp-content/uploads/2024/12/DSC_0044-2-scaled-1.webp",
    description: "Hay un gran bache frente al supermercado que ha causado varios accidentes menores.",
    category: "Infraestructura",
    comments: [
      {
        user: {
          name: "Laura Gómez",
          photo_url: "https://randomuser.me/api/portraits/women/1.jpg"
        },
        content: "¡Ese bache lleva más de 3 semanas sin arreglarse!",
        replies: [
          {
            user: {
              name: "Carlos Pérez",
              photo_url: "https://randomuser.me/api/portraits/men/2.jpg"
            },
            content: "Sí, ya reporté a la municipalidad pero no han respondido.",
            replies: []
          }
        ]
      }
    ]
  },
  {
    title: "Fuga de agua en calle secundaria",
    url: "https://ciudadsegura.org/reportes/456",
    photo_url: "https://planjuarez.org/wp-content/uploads/2024/12/DSC_0044-2-scaled-1.webp",
    description: "Se observa una fuga constante de agua desde hace 2 días en la calle 12 con avenida B.",
    category: "Servicios Públicos",
    comments: [
      {
        user: {
          name: "Ana Torres",
          photo_url: "https://randomuser.me/api/portraits/women/3.jpg"
        },
        content: "Esto está causando charcos y malos olores.",
        replies: []
      }
    ]
  },
  {
    title: "Árbol caído bloqueando la vía",
    url: "https://ciudadsegura.org/reportes/789",
    photo_url: "https://codiceinformativo.com/wp-content/uploads/2021/03/Árbol-caído.-850x560.jpg",
    description: "Un árbol cayó durante la tormenta de anoche y está bloqueando el paso vehicular.",
    category: "Emergencias",
    comments: [
      {
        user: {
          name: "Luis Martínez",
          photo_url: "https://randomuser.me/api/portraits/men/4.jpg"
        },
        content: "¡No se puede pasar! Ojalá lo retiren pronto.",
        replies: [
          {
            user: {
              name: "María López",
              photo_url: "https://randomuser.me/api/portraits/women/5.jpg"
            },
            content: "Los bomberos ya están en camino, según el noticiero local.",
            replies: []
          }
        ]
      }
    ]
  }, 
  {
    title: "Farola apagada en parque central",
    url: "https://ciudadsegura.org/reportes/910",
    photo_url: "https://codiceinformativo.com/wp-content/uploads/2021/03/Árbol-caído.-850x560.jpg",
    description: "Desde hace una semana, una farola en el parque central no funciona, generando zonas oscuras peligrosas por la noche.",
    category: "Servicios Públicos",
    comments: [
        {
        user: {
            name: "Esteban Ruiz",
            photo_url: "https://randomuser.me/api/portraits/men/6.jpg"
        },
        content: "Esto aumenta el riesgo de robos en las noches.",
        replies: []
        }
    ]
    },
    {
    title: "Contenedor de basura desbordado",
    url: "https://ciudadsegura.org/reportes/911",
    photo_url: "https://codiceinformativo.com/wp-content/uploads/2021/03/Árbol-caído.-850x560.jpg",
    description: "El contenedor de basura en la esquina de la calle 5 está completamente lleno y los residuos están en la acera.",
    category: "Salud Pública",
    comments: [
        {
        user: {
            name: "Claudia Vega",
            photo_url: "https://randomuser.me/api/portraits/women/7.jpg"
        },
        content: "Esto atrae a animales callejeros y causa malos olores.",
        replies: []
        }
    ]
    },
    {
    title: "Grafiti ofensivo en pared escolar",
    url: "https://ciudadsegura.org/reportes/912",
    photo_url: "https://codiceinformativo.com/wp-content/uploads/2021/03/Árbol-caído.-850x560.jpg",
    description: "Apareció un grafiti con lenguaje ofensivo en la fachada de la escuela pública N°34.",
    category: "Vandalismo",
    comments: [
        {
        user: {
            name: "Miguel Herrera",
            photo_url: "https://randomuser.me/api/portraits/men/8.jpg"
        },
        content: "Esto debe ser removido cuanto antes, es inapropiado para los niños.",
        replies: []
        }
    ]
    },
    {
    title: "Cruce peatonal sin señalización",
    url: "https://ciudadsegura.org/reportes/913",
    photo_url: "https://codiceinformativo.com/wp-content/uploads/2021/03/Árbol-caído.-850x560.jpg",
    description: "El cruce peatonal frente a la clínica ha perdido toda su pintura, lo que pone en riesgo a los peatones.",
    category: "Infraestructura",
    comments: [
        {
        user: {
            name: "Verónica Salas",
            photo_url: "https://randomuser.me/api/portraits/women/9.jpg"
        },
        content: "Es urgente que lo repinten. Muchos niños cruzan por ahí.",
        replies: []
        }
    ]
    },
    {
    title: "Robo en la zona residencial",
    url: "https://ciudadsegura.org/reportes/914",
    photo_url: "https://codiceinformativo.com/wp-content/uploads/2021/03/Árbol-caído.-850x560.jpg",
    description: "Se reportó un intento de robo en la zona residencial Las Palmas durante la madrugada.",
    category: "Seguridad",
    comments: [
        {
        user: {
            name: "Roberto Díaz",
            photo_url: "https://randomuser.me/api/portraits/men/10.jpg"
        },
        content: "Vi una camioneta sospechosa rondando a esa hora.",
        replies: [
            {
            user: {
                name: "Isabel Méndez",
                photo_url: "https://randomuser.me/api/portraits/women/11.jpg"
            },
            content: "Yo también escuché ruidos extraños. Deberíamos hablar con la policía del sector.",
            replies: []
            }
        ]
        }
    ]
    }
];

export default reportes;
