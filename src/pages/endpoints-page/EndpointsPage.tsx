import './EndpointsPage.css';

import endpointList from '@/util/endpointList';

import Row from './components/row/Row';

export default function EndpointsPage() {

  return (
    <main className='endpoint-page'>
      <section>
        <p className='section-header'>Auth Endpoints</p>
        {endpointList.authRoutes.map(({ isProtected, label, method, route }) => (
          <Row 
            key={`${method}-${route}`}
            isProtected={isProtected}
            label={label}
            method={method}
            route={route}
          />
        ))}
      </section>
      <section>
        <p className='section-header'>Categories Endpoints</p>
        {endpointList.categoryRoutes.map(({ isProtected, label, method, route }) => (
          <Row 
            key={`${method}-${route}`}
            isProtected={isProtected}
            label={label}
            method={method}
            route={route}
          />
        ))}
      </section>
      <section>
        <p className='section-header'>Items Endpoints</p>
        {endpointList.itemRoutes.map(({ isProtected, label, method, route }) => (
          <Row 
            key={`${method}-${route}`}
            isProtected={isProtected}
            label={label}
            method={method}
            route={route}
          />
        ))}
      </section>
    </main>
  );
}