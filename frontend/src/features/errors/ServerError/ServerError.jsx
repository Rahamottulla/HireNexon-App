import ErrorLayout from "../ErrorLayout";

const ServerError500 = () => (
  <ErrorLayout
    code="500"
    title="Server Error"
    message="Something went wrong on our side. We’re fixing it."
    image="/images/Errors/500.png"
    primaryAction={{ label: "Refresh", to: "/" }}
  />
);

export default ServerError500;
