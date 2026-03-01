import AboutHero from '../../components/about/AboutHero'
import StatsSection from '../../components/about/StatsSection'
import Team from '../../components/about/Team'
import ContactForm from '../../components/about/ContactForm'
import { 
  FaUserShield, 
  FaIndustry, 
  FaTruck, 
  FaUserTie,
  FaClipboardList,
  FaShieldAlt,
  FaEye,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaExpandArrowsAlt
} from 'react-icons/fa'

export default function About() {
  const modules = [
    { 
      icon: FaUserShield,
      title: 'Admin Module', 
      description: 'Complete system control with role management, vendor-dairy assignments, farmer-vendor mapping, and comprehensive analytics dashboard.',
      color: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    { 
      icon: FaIndustry,
      title: 'Dairy Module', 
      description: 'Central hub for managing vendors, monitoring milk collection, maintaining quality records, and handling payment cycles.',
      color: 'bg-green-50 border-green-200 text-green-600'
    },
    { 
      icon: FaTruck,
      title: 'Milk Vendor Module', 
      description: 'Operational link between farmers and dairies. Collect milk, verify quality, record transactions, and manage farmer payments.',
      color: 'bg-purple-50 border-purple-200 text-purple-600'
    },
    { 
      icon: FaUserTie,
      title: 'Farmer Module', 
      description: 'Clear visibility into transactions, daily supply details, rate calculations, and payment tracking for transparent operations.',
      color: 'bg-orange-50 border-orange-200 text-orange-600'
    },
  ]

  const workflow = [
    { step: 1, title: 'Farmer Supplies Milk', description: 'Farmers supply milk to their mapped vendor with quantity and quality details.' },
    { step: 2, title: 'Vendor Collects & Verifies', description: 'Vendors collect milk, verify quality readings (fat, SNF, CLR), and record transactions.' },
    { step: 3, title: 'Vendor Supplies to Dairy', description: 'Collected milk is supplied to the dairy with complete documentation.' },
    { step: 4, title: 'Dairy Processes Records', description: 'Dairy processes milk, updates records, and manages payment cycles.' },
    { step: 5, title: 'Admin Monitors Everything', description: 'Admin has complete visibility and control over the entire supply chain.' },
  ]

  return (
    <div className="min-h-full">
      <AboutHero />
      
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-12">
        <StatsSection />

        <section aria-labelledby="modules-heading" className="mb-16">
          <h2 id="modules-heading" className="text-3xl font-semibold text-center text-gray-900 mb-4">
            Platform Modules
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Four integrated modules working together to create a transparent, efficient, and traceable milk supply chain.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, index) => {
              const IconComponent = module.icon
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-200">
                  <div className={`w-12 h-12 rounded-lg ${module.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="text-xl" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {module.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        <section aria-labelledby="workflow-heading" className="mb-16">
          <h2 id="workflow-heading" className="text-3xl font-semibold text-center text-gray-900 mb-4">
            System Workflow
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            A seamless flow from farmer to dairy, ensuring transparency and efficiency at every step.
          </p>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {workflow.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200 w-full">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-semibold">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  {index < workflow.length - 1 && (
                    <div className="flex items-center justify-center my-2">
                      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="benefits-heading" className="mb-16">
          <h2 id="benefits-heading" className="text-3xl font-semibold text-center text-gray-900 mb-4">
            Key Benefits
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover how our platform transforms dairy operations with digital solutions that benefit everyone in the supply chain.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <FaClipboardList className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Eliminates Manual Records</h3>
              <p className="text-gray-600 leading-relaxed">Digital tracking replaces error-prone paper records with accurate, real-time data accessible anytime, anywhere.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center mb-4 group-hover:bg-red-100 transition-colors">
                <FaShieldAlt className="text-2xl text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reduces Fraud & Errors</h3>
              <p className="text-gray-600 leading-relaxed">Automated calculations and transparent workflows prevent miscalculations, disputes, and fraudulent activities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                <FaEye className="text-2xl text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Transparency</h3>
              <p className="text-gray-600 leading-relaxed">All stakeholders have clear visibility into transactions, payments, and supply flow for trust and accountability.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center mb-4 group-hover:bg-yellow-100 transition-colors">
                <FaMoneyBillWave className="text-2xl text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fair Payments for Farmers</h3>
              <p className="text-gray-600 leading-relaxed">Accurate rate calculations based on quality parameters ensure farmers receive fair and timely compensation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
                <FaTachometerAlt className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Operational Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">Streamlined processes help dairies improve productivity, reduce operational costs, and optimize resource utilization.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 group">
              <div className="w-14 h-14 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                <FaExpandArrowsAlt className="text-2xl text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Scalable Solution</h3>
              <p className="text-gray-600 leading-relaxed">Designed to scale seamlessly from small local operations to large dairy networks without compromising performance.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="team-heading" className="mb-16">
          <Team />
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="mb-16">
          <ContactForm />
        </section>
      </main>
    </div>
  )
}
