import ErrorLayout from "../ErrorLayout";

const ManyRequests429 = () => (
  <ErrorLayout
    code="429"
    title="Too Many Requests"
    message="You’re making requests too quickly. Please slow down."
    image="/images/Errors/429.png"
    primaryAction={{ label: "Retry Later", to: "/" }}
  />
);

export default ManyRequests429;
