import ErrorLayout from "../ErrorLayout";

const Maintenance503 = () => (
  <ErrorLayout
    code="503"
    title="Under Maintenance"
    message="HireNexon is undergoing scheduled maintenance. Please come back soon."
    image="/images/Errors/503.png"
  />
);

export default Maintenance503;
