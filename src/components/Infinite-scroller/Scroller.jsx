import "./Scroller.css";

const Scroller = () => {
  const companies = [
    { name: "Microsoft", logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg" },
    { name: "Salesforce", logo: "https://www.vectorlogo.zone/logos/salesforce/salesforce-icon.svg" },
    { name: "Oracle", logo: "https://www.vectorlogo.zone/logos/oracle/oracle-icon.svg" },
    { name: "SAP", logo: "https://www.vectorlogo.zone/logos/sap/sap-icon.svg" },
    { name: "IBM", logo: "https://www.vectorlogo.zone/logos/ibm/ibm-icon.svg" },
    { name: "Adobe", logo: "https://www.vectorlogo.zone/logos/adobe/adobe-icon.svg" },
    { name: "Cisco", logo: "https://www.vectorlogo.zone/logos/cisco/cisco-icon.svg" },
    { name: "ServiceNow", logo: "https://www.vectorlogo.zone/logos/servicenow/servicenow-icon.svg" },
    { name: "VMware", logo: "https://www.vectorlogo.zone/logos/vmware/vmware-icon.svg" },
    { name: "Workday", logo: "https://www.vectorlogo.zone/logos/workday/workday-icon.svg" },
  ];

  const duplicatedCompanies = [...companies, ...companies];

  const handleImageError = (e) => {
    const company = e.target.alt.split(' ')[0];
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f3f4f6';
    ctx.fillRect(0, 0, 64, 64);

    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(company[0], 32, 32);

    e.target.src = canvas.toDataURL();
  };

  return (
    <div className="w-full bg-white rounded-md shadow-lg mt-10 p-4 overflow-hidden">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-10">
        Our Clients
      </h1>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="inline-flex flex-col items-center mx-8 first:ml-0"
              >
                <div className="w-16 h-16 rounded-md bg-gray-50 shadow-md flex items-center justify-center p-2 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
                <span className="mt-2 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-300">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroller;