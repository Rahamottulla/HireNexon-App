import ErrorLayout from "../ErrorLayout";

const NotFound404 = () => (
  <ErrorLayout
    code="404"
    title="Page Not Found"
    message="The page you’re looking for doesn’t exist."
    image="/images/Errors/404.png"
    primaryAction={{ label: "Go Home", to: "/" }}
  />
);

export default NotFound404;
