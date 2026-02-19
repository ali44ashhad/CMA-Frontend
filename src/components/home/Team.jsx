const Team = () => {
    const teamMembers = [
      {
        id: 1,
        name: "Dr. Anil Sharma",
        role: "Founder & CEO",
        experience: "25+ years in CMA Education",
        education: "Ph.D. in Commerce, CMA, CS",
        avatar: "AS",
        color: "green",
        description: "Former CMA institute faculty with passion for revolutionizing exam preparation.",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
      {
        id: 2,
        name: "Prof. Meera Patel",
        role: "Head of Academics",
        experience: "18+ years Teaching Experience",
        education: "M.Com, CMA, MBA",
        avatar: "MP",
        color: "purple",
        description: "Expert in curriculum design and student mentorship programs.",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
      {
        id: 3,
        name: "Rajesh Kumar",
        role: "CTO",
        experience: "15+ years Tech Experience",
        education: "M.Tech Computer Science",
        avatar: "RK",
        color: "emerald",
        description: "Leads technology innovation and platform development.",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
      {
        id: 4,
        name: "Dr. Sunita Rao",
        role: "Lead Evaluator",
        experience: "20+ years CMA Experience",
        education: "Ph.D., CMA, LLB",
        avatar: "SR",
        color: "pink",
        description: "Oversees evaluation quality and standard setting.",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
      {
        id: 5,
        name: "Vikram Singh",
        role: "Student Success Head",
        experience: "12+ years in EdTech",
        education: "MBA, B.Ed",
        avatar: "VS",
        color: "orange",
        description: "Ensures every student receives personalized support.",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      },
      {
        id: 6,
        name: "Neha Gupta",
        role: "Content Director",
        experience: "15+ years in CMA Content",
        education: "M.Com, CMA, NET",
        avatar: "NG",
        color: "indigo",
        description: "Curates and updates all study material and test content.",
        social: {
          linkedin: "#",
          twitter: "#"
        }
      }
    ];
  
    const advisoryBoard = [
      {
        id: 1,
        name: "Dr. Ramesh Chand",
        role: "Academic Advisor",
        title: "Former Director, ICAI",
        avatar: "RC",
        color: "blue"
      },
      {
        id: 2,
        name: "Ms. Kavita Nair",
        role: "Industry Advisor",
        title: "CFO, Fortune 500 Company",
        avatar: "KN",
        color: "purple"
      },
      {
        id: 3,
        name: "Prof. S. K. Jain",
        role: "Technical Advisor",
        title: "IIT Delhi Professor",
        avatar: "SJ",
        color: "emerald"
      }
    ];
  
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                <div 
                  key={member.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className={`w-24 h-24 ${member.color === 'blue' ? 'bg-gradient-to-br from-[#137952]/80 to-[#137952]' : member.color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-purple-600' : member.color === 'emerald' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : member.color === 'pink' ? 'bg-gradient-to-br from-pink-500 to-pink-600' : member.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-indigo-500 to-indigo-600'} rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                      {member.avatar}
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
                        <span className="font-medium">Experience:</span> {member.experience}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Education:</span> {member.education}
                      </div>
                    </div>
  
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-6">
                      {member.description}
                    </p>
  
                    {/* Social Links */}
                    <div className="flex space-x-3">
                      <a href={member.social.linkedin} className="w-10 h-10 bg-[#137952]/10 hover:bg-[#137952]/20 rounded-lg flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 text-[#137952]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      <a href={member.social.twitter} className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
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