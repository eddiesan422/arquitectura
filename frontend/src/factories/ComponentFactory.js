import Login from '../components/Login';
import SolicitudesList from '../components/SolicitudesList';
import SolicitudDetalle from '../components/SolicitudDetalle';
import EvaluarSolicitud from '../components/EvaluarSolicitud';

class ComponentFactory {
    static create(componentName, props = {}) {
        switch (componentName) {
            case 'Login':
                return <Login {...props} />;
            case 'SolicitudesList':
                return <SolicitudesList {...props} />;
            case 'SolicitudDetalle':
                return <SolicitudDetalle {...props} />;
            case 'EvaluarSolicitud':
                return <EvaluarSolicitud {...props} />;
            default:
                throw new Error(`Componente no encontrado: ${componentName}`);
        }
    }
}

export default ComponentFactory;