const Team = () => {
    const teamMembers = [
      {
        id: 1,
        name: "Narayan Ojha  ",
        role: "Founder",
       
        education: "Qualified CMA",
        avatar: "AS",
        color: "green",
 
      },
      {
        id: 2,
        name: "  Abhishek Gandewar  ",
        role: " Academics Head ",
      
        education: "Qualified CMA",
        avatar: "MP",
        color: "purple",
 
      }, 
    ];

    const getInitials = (name = "") => {
      const trimmed = name.trim().replace(/\s+/g, " ");
      if (!trimmed) return "";
      const parts = trimmed.split(" ");
      if (parts.length === 1) {
        return parts[0].slice(0, 2).toUpperCase();
      }
      return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    return (
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-[#137952]/10 rounded-full mb-4">
              <span className="text-[#137952] text-sm font-medium">
                Meet Our Team
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The Minds Behind Your Success
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A team of passionate educators, technologists, and industry experts 
              dedicated to your CMA success.
            </p>
          </div>
  
          {/* Core Team */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Core Leadership Team
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className={`w-24 h-24 ${member.color === 'blue' ? 'bg-gradient-to-br from-[#137952]/80 to-[#137952]' : member.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' : member.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : member.color === 'pink' ? 'bg-gradient-to-br from-pink-500 to-pink-600' : member.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-indigo-500 to-indigo-600'} rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                      {getInitials(member.name)}
                    </div>
  
                    {/* Name & Role */}
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {member.name}
                    </h4>
                    <div className="text-[#137952] font-semibold mb-2">
                      {member.role}
                    </div>
  
                    {/* Experience & Education */}
                    <div className="space-y-2 mb-4">
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Education:</span> {member.education}
                      </div>
                    </div> 
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
   
   
        </div>
      </section>
    );
  };
  export default Team;