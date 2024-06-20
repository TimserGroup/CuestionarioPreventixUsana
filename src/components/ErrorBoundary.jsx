import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    componentDidCatch(error, info) {
        // Captura el error y establece el estado de hasError a true
        this.setState({hasError: true});
        // Puedes también hacer logging del error e info
        console.error('Error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            // Renderiza un mensaje de error personalizado
            return <h1>Algo salió mal.</h1>;
        }

        // Si no hay errores, renderiza los niños normalmente
        return this.props.children;
    }
}

// Envuélvelo alrededor de tu componente <App>
export default function AppWrapper() {
    return (<ErrorBoundary>
        <App/>
    </ErrorBoundary>);
}
