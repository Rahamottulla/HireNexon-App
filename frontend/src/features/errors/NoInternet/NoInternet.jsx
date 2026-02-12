import ErrorLayout from "../ErrorLayout";

const NoInternet = () => (
  <ErrorLayout
    code="Offline"
    title="No Internet Connection"
    message="Please check your network connection and try again."
    image="/images/Errors/NoInternet.png"
    primaryAction={{ label: "Retry", to: "/" }}
  />
);

export default NoInternet;
