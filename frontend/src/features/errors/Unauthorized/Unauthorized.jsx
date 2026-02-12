import ErrorLayout from "../ErrorLayout";

const Forbidden403 = () => (
  <ErrorLayout
    code="403"
    title="Access Denied"
    message="You don’t have permission to view this page."
    image="/images/Errors/403.png"
    primaryAction={{ label: "Go to Dashboard", to: "/candidate/dashboard" }}
    secondaryAction={{ label: "Home", to: "/" }}
  />
);

export default Forbidden403;
