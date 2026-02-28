import useProfile from "@/features/company/hooks/useProfile";

const Profile = () => {
  const { profile } = useProfile();

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">
        Company Profile
      </h2>
      <p>Name: {profile?.name}</p>
      <p>Email: {profile?.email}</p>
    </div>
  );
};

export default Profile;