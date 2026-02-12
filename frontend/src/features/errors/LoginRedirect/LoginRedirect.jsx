import ErrorLayout from "../ErrorLayout";

const Unauthorized401 = () => (
  <ErrorLayout
    code="401"
    title="Login Required"
    message="You must be logged in to access this page."
    image="/images/Errors/401.png"
    primaryAction={{ label: "Login", to: "/login" }}
    secondaryAction={{ label: "Home", to: "/" }}
  />
);

export default Unauthorized401;
