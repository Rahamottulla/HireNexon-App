// frontend/src/shared/utils/roleRedirect.js
/**
 * Redirects the user to the correct page based on their role and workspace status.
 * Call this after login + email verification is confirmed.
 *
 * @param {object} user - The authenticated user object from the API
 * @param {function} navigate - React Router navigate function
 */
export const handleRoleRedirect = (user, navigate) => {
  if (!user || !user.role) {
    navigate("/login");
    return;
  }

  switch (user.role) {
    case "candidate":
      // Candidates go straight to their dashboard — no workspace needed
      navigate("/candidate/dashboard");
      break;

    case "employer":
      // Employer needs to create/join a company workspace first
      if (user.hasWorkspace) {
        navigate("/company/dashboard");
      } else {
        navigate("/company/create-workspace");
      }
      break;

    case "university":
      // University needs to set up their placement workspace first
      if (user.hasWorkspace) {
        navigate("/university/dashboard");
      } else {
        navigate("/university/create-workspace");
      }
      break;

    default:
      navigate("/");
  }
};
