const ContactInfoSection = ({ data }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Contact Information
      </h2>

      <div className="space-y-3 text-sm text-gray-600">
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
        <p><strong>Website:</strong> {data.website}</p>
        <p><strong>Address:</strong> {data.address}</p>
      </div>
    </div>
  );
};

export default ContactInfoSection;