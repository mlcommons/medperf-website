import { RedocStandalone } from 'redoc';

const Documentation = () => (
  <RedocStandalone
    specUrl="https://medperf.org/?format=openapi"
    options={{
      lazyRendering: false,
      hideHostname: false,
      expandResponses: 'all',
      pathInMiddlePanel: false,
      nativeScrollbars: false,
      requiredPropsFirst: false,
      fetchSchemaWithQuery: true,
    }}
  />
);

export default Documentation;
