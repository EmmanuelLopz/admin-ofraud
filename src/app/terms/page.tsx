import React from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/src/wrappers/ProtectedRoute';

export default function TermsAndConditionsPage() {
  return (
    <ProtectedRoute>
        <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Aviso de Privacidad</h1>
            <Link href="/dashboard" className="text-blue-500 hover:underline">
                Volver al Dashboard
            </Link>
            </div>
        </header>
        <main className="container mx-auto px-6 py-8">
            <div className="bg-white p-8 rounded-lg shadow-md prose max-w-none">
            <section>
                <h2>¿Para qué fines utilizaremos sus datos personales?</h2>
                <p>
                Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:
                </p>
                <ul>
                <li>Envío de información acerca de los programas de la organización</li>
                <li>Prospección comercial</li>
                </ul>
                <p>
                De manera adicional, utilizaremos su información personal para las siguientes finalidades secundarias que no son necesarias para el servicio solicitado, pero que nos permiten y facilitan brindarle una mejor atención:
                </p>
                <ul>
                <li>Mercadotecnia o publicitaria</li>
                <li>Registros estadísticos de uso de materiales de la organización</li>
                </ul>
                <p>
                En caso de que no desee que sus datos personales se utilicen para estos fines secundarios, indíquelo a continuación: No consiento que mis datos personales se utilicen para los siguientes fines:
                </p>
                <p className="ml-4">[ ] Mercadotecnia o publicitaria</p>
                <p className="ml-4">[ ] Registros estadísticos de uso de materiales de la organización</p>
                <p>
                La negativa para el uso de sus datos personales para estas finalidades no podrá ser un motivo para que le neguemos los servicios y productos que solicita o contrata con nosotros.
                </p>
            </section>

            <section>
                <h2>¿Qué datos personales utilizaremos para estos fines?</h2>
                <p>
                Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, utilizaremos los siguientes datos personales:
                </p>
                <ul>
                <li>Datos de identificación</li>
                <li>Datos de contacto</li>
                <li>Datos laborales</li>
                <li>Datos académicos</li>
                <li>Datos patrimoniales y/o financieros</li>
                </ul>
                <p>
                Además de los datos personales mencionados anteriormente, para las finalidades informadas en el presente aviso de privacidad utilizaremos los siguientes datos personales considerados como sensibles, que requieren de especial protección:
                </p>
                <ul>
                <li>Datos sobre vida sexual</li>
                <li>Datos de origen étnico o racial</li>
                </ul>
            </section>

            <section>
                <h2>¿Con quién compartimos su información personal y para qué fines?</h2>
                <p>
                Le informamos que sus datos personales son compartidos dentro y fuera del país con las siguientes personas, empresas, organizaciones o autoridades distintas a nosotros, para los siguientes fines:
                </p>
                <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Destinatario de los datos personales</th>
                        <th className="py-2 px-4 border-b">Finalidad</th>
                        <th className="py-2 px-4 border-b">Requiere del consentimiento</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="py-2 px-4 border-b">Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales</td>
                        <td className="py-2 px-4 border-b">Estadísticas</td>
                        <td className="py-2 px-4 border-b">No</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Microsoft</td>
                        <td className="py-2 px-4 border-b">Estadísticas</td>
                        <td className="py-2 px-4 border-b">No</td>
                    </tr>
                    <tr>
                        <td className="py-2 px-4 border-b">Amazon Web Services</td>
                        <td className="py-2 px-4 border-b">Estadísticas</td>
                        <td className="py-2 px-4 border-b">No</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </section>

            <section>
                <h2>¿Cómo puede acceder, rectificar o cancelar sus datos personales, u oponerse a su uso?</h2>
                <p>
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
                </p>
                <p>
                Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través del siguiente medio: <a href="mailto:ayuda@t6i.872.myftpupload.com">ayuda@t6i.872.myftpupload.com</a>
                </p>
                <p>
                Para conocer el procedimiento y requisitos para el ejercicio de los derechos ARCO, ponemos a su disposición el siguiente medio: <a href="mailto:ayuda@t6i.872.myftpupload.com">ayuda@t6i.872.myftpupload.com</a>
                </p>
                <p>
                Los datos de contacto de la persona o departamento de datos personales, que está a cargo de dar trámite a las solicitudes de derechos ARCO, son los siguientes:
                </p>
                <ul>
                <li>Nombre de la persona o departamento de datos personales: Oscar Ortega</li>
                <li>Domicilio: calle Retorno Ruiseñor 12, colonia Mayorazgos del Bosque, ciudad Atizapán de Zaragoza, municipio o delegación Atizapán de Zaragoza, c.p. 52957, en la entidad de México, país México</li>
                <li>Correo electrónico: <a href="mailto:ayuda@t6i.872.myftpupload.com">ayuda@t6i.872.myftpupload.com</a></li>
                </ul>
            </section>

            <section>
                <h2>Usted puede revocar su consentimiento para el uso de sus datos personales</h2>
                <p>
                Usted puede revocar el consentimiento que, en su caso, nos haya otorgado para el tratamiento de sus datos personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos podremos atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal requiramos seguir tratando sus datos personales. Asimismo, usted deberá considerar que para ciertos fines, la revocación de su consentimiento implicará que no le podamos seguir prestando el servicio que nos solicitó, o la conclusión de su relación con nosotros.
                </p>
                <p>
                Para revocar su consentimiento deberá presentar su solicitud a través del siguiente medio: <a href="mailto:ayuda@t6i.872.myftpupload.com">ayuda@t6i.872.myftpupload.com</a>
                </p>
                <p>
                Para conocer el procedimiento y requisitos para la revocación del consentimiento, ponemos a su disposición el siguiente medio: <a href="mailto:ayuda@t6i.872.myftpupload.com">ayuda@t6i.872.myftpupload.com</a>
                </p>
            </section>

            <section>
                <h2>¿Cómo puede limitar el uso o divulgación de su información personal?</h2>
                <p>
                Con objeto de que usted pueda limitar el uso y divulgación de su información personal, le ofrecemos los siguientes medios: <a href="mailto:ayuda@t6i.872.myftpupload.com">ayuda@t6i.872.myftpupload.com</a>
                </p>
                <p>
                Asimismo, usted se podrá inscribir a los siguientes registros, en caso de que no desee obtener publicidad de nuestra parte: Registro Público para Evitar Publicidad, para mayor información consulte el portal de internet de la PROFECO.
                </p>
            </section>

            <section>
                <h2>El uso de tecnologías de rastreo en nuestro portal de internet</h2>
                <p>
                Le informamos que en nuestra página de internet utilizamos cookies, web beacons u otras tecnologías, a través de las cuales es posible monitorear su comportamiento como usuario de internet, así como brindarle un mejor servicio y experiencia al navegar en nuestra página. Los datos personales que recabamos a través de estas tecnologías, los utilizaremos para los siguientes fines:
                </p>
                <ul>
                <li>Estadísticos</li>
                <li>Publicitarios</li>
                </ul>
                <p>
                Los datos personales que obtenemos de estas tecnologías de rastreo son los siguientes:
                </p>
                <ul>
                <li>Identificadores, nombre de usuario y contraseñas de una sesión</li>
                <li>Idioma preferido por el usuario</li>
                <li>Región en la que se encuentra el usuario</li>
                <li>Tipo de navegador del usuario</li>
                <li>Tipo de sistema operativo del usuario</li>
                <li>Fecha y hora del inicio y final de una sesión de un usuario</li>
                <li>Páginas web visitadas por un usuario</li>
                <li>Búsquedas realizadas por un usuario</li>
                <li>Publicidad revisada por un usuario</li>
                <li>Listas y hábitos de consumo en páginas de compras</li>
                </ul>
            </section>

            <section>
                <h2>¿Cómo puede conocer los cambios en este aviso de privacidad?</h2>
                <p>
                El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales; de nuestras propias necesidades por los productos o servicios que ofrecemos; de nuestras prácticas de privacidad; de cambios en nuestro modelo de negocio, o por otras causas.
                </p>
                <p>
                Nos comprometemos a mantenerlo informado sobre los cambios que pueda sufrir el presente aviso de privacidad, a través de: Página web.
                </p>
                <p>
                El procedimiento a través del cual se llevarán a cabo las notificaciones sobre cambios o actualizaciones al presente aviso de privacidad es el siguiente: Actualización de sitio web.
                </p>
            </section>

            <footer>
                <p>Última actualización: 30/11/2023</p>
            </footer>
            </div>
        </main>
        </div>
    </ProtectedRoute>
  );
}
