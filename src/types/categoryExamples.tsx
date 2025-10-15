import { Category } from "./types";

const exampleCategories: Category[] = [
  {
    id: 1,
    name: "Compras",
    icon: "cart.badge.questionmark",
    description:
      "Reportes de fraudes relacionados con compras en línea o físicas. Incluye casos donde se realizaron cargos no autorizados, productos que nunca llegaron, o tiendas que resultaron ser falsas o engañosas.",
  },
  {
    id: 2,
    name: "Phishing",
    icon: "envelope.badge.shield.half.filled",
    description:
      "Intentos de engaño mediante correos electrónicos, mensajes de texto o llamadas telefónicas que suplantan la identidad de entidades confiables para obtener información personal, contraseñas o datos bancarios.",
  },
  {
    id: 3,
    name: "Apps",
    icon: "app.badge.checkmark",
    description:
      "Aplicaciones móviles o de escritorio que simulan ser legítimas pero que contienen malware, solicitan permisos innecesarios o realizan cobros no autorizados. También incluye apps falsas que imitan servicios conocidos.",
  },
  {
    id: 4,
    name: "Bancos",
    icon: "banknote.fill",
    description:
      "Estafas vinculadas a instituciones bancarias o financieras. Puede tratarse de llamadas fraudulentas, páginas web falsas de bancos o mensajes que buscan robar credenciales o acceder a cuentas bancarias.",
  },
  {
    id: 5,
    name: "Redes",
    icon: "person.2.slash.fill",
    description:
      "Casos de fraude cometidos a través de redes sociales o plataformas de mensajería. Incluye suplantación de perfiles, mensajes engañosos de conocidos, y fraudes en grupos o comunidades digitales.",
  },
  {
    id: 6,
    name: "Inversión",
    icon: "chart.line.downtrend.xyaxis",
    description:
      "Esquemas fraudulentos que prometen grandes ganancias con inversiones mínimas. Incluye estafas con criptomonedas, pirámides financieras, o plataformas de inversión que desaparecen tras recibir dinero.",
  },
  {
    id: 7,
    name: "Viajes",
    icon: "airplane.path.dotted",
    description:
      "Estafas relacionadas con paquetes turísticos falsos, reservas inexistentes o agencias de viaje fraudulentas. También abarca casos de promociones engañosas para vuelos, hoteles o alquiler de autos.",
  },
  {
    id: 8,
    name: "Identidad",
    icon: "person.crop.circle.badge.exclamationmark",
    description:
      "Situaciones donde una persona ha sido víctima de robo de identidad. Puede incluir el uso indebido de datos personales para abrir cuentas, realizar compras, solicitar créditos u otros actos fraudulentos.",
  },
  {
    id: 999,
    name: "Otra",
    icon: "questionmark.circle",
    description:
      "Reportes de fraudes o estafas que no encajan en ninguna de las categorías anteriores. Puede tratarse de nuevos métodos de engaño o situaciones poco comunes que requieren análisis adicional.",
  },
];

export default exampleCategories;