import { useState, useMemo, useRef, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { RiFolderInfoLine } from 'react-icons/ri';
import { FaSearch, FaImage, FaTag, FaInfoCircle, FaFlask, FaLeaf, FaTint, FaBolt } from 'react-icons/fa';

interface Nutrients { protein:string; fiber:string; moisture:string; energy:string; }
export interface FeedItem { id:number; name:string; description:string; image:string; nutrients:Nutrients; additionalInfo:string; }

// Custom Dropdown Component
interface CustomDropdownProps {
  label: string
  selected: string
  options: string[]
  onSelect: (value: string) => void
  icon?: React.ReactNode
  placeholder?: string
}

function CustomDropdown({ label, selected, options, onSelect, icon, placeholder = "Select" }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    onSelect(value)
    setIsOpen(false)
  }

  return (
    <div className="flex flex-col w-full text-sm relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {icon && <span className="inline mr-2">{icon}</span>}
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-4 pr-2 py-2.5 border rounded-lg bg-white text-gray-800 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
      >
        <span>{selected || placeholder}</span>
        <svg
          className={`w-5 h-5 inline float-right transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#6B7280"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 py-2 z-50 absolute top-full">
          {options.map((option) => (
            <li
              key={option}
              className="px-4 py-2 hover:bg-green-500 hover:text-white cursor-pointer transition"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const feedData: FeedItem[] = [
  { id:1, name:'Alfalfa Hay', description:'High-protein feed suitable for dairy cattle.', image:'https://eu-images.contentstack.com/v3/assets/blte5a51c2d28bbcc9c/blt8117f606858a5744/64871945cfda7d0b32aea78c/Hay_20Bale_0.jpg?width=700&auto=webp&quality=80&disable=upscale', nutrients:{ protein:'16%', fiber:'25%', moisture:'12%', energy:'1.5 Mcal/kg'}, additionalInfo:'Alfalfa hay is known for its high nutritional value and is an excellent source of protein for dairy cattle. It helps in increasing milk yield and improving overall health.' },
  { id:2, name:'Corn Silage', description:'Fermented high-energy feed for ruminants.', image:'https://www.hubbardfeeds.com/sites/default/files/2020-09/shutterstock_385260625_1200x628.jpg', nutrients:{ protein:'8%', fiber:'30%', moisture:'70%', energy:'0.8 Mcal/kg'}, additionalInfo:'Corn silage is ideal for boosting energy intake, especially during the winter months. It aids in maintaining body condition and promoting better digestion.' },
  { id:3, name:'Grain Mix', description:'Mixed grains for supplemental energy and nutrients.', image:'https://5.imimg.com/data5/SELLER/Default/2022/7/RU/AX/AH/321009/multi-grain-cattle-feed-1--500x500.jpg', nutrients:{ protein:'12%', fiber:'8%', moisture:'10%', energy:'2.0 Mcal/kg'}, additionalInfo:'Grain mix provides a balanced blend of energy and protein. It is useful for enhancing milk production and supporting growth in young animals.' },
  { id:4, name:'Soybean Meal', description:'High-protein feed made from soybeans, suitable for dairy cows.', image:'https://upload.wikimedia.org/wikipedia/commons/5/53/Animal_feed_from_bush_biomass.jpg', nutrients:{ protein:'48%', fiber:'4%', moisture:'10%', energy:'2.4 Mcal/kg'}, additionalInfo:'Soybean meal is an excellent source of protein for dairy cows, improving milk yield and overall health. It also helps in balancing the diet with essential amino acids.' },
  { id:5, name:'Wheat Bran', description:'By-product of wheat milling, provides fiber and some protein.', image:'https://jandsharpfeed.com/wp-content/uploads/2023/07/0b7bd644-28e7-41ee-83e2-a05dcbcf9bdc_shutterstock_225184108_jpg.jpg', nutrients:{ protein:'14%', fiber:'15%', moisture:'12%', energy:'1.2 Mcal/kg'}, additionalInfo:'Wheat bran is beneficial for its fiber content, which aids in digestion and prevents digestive disorders. It also provides a moderate amount of protein.' },
  { id:6, name:'Mineral Block', description:'Supplemental feed containing essential minerals for cattle health.', image:'https://i.ebayimg.com/images/g/2s0AAOSw0IlmTXhK/s-l1600.webp', nutrients:{ protein:'0%', fiber:'0%', moisture:'10%', energy:'0 Mcal/kg'}, additionalInfo:'Mineral blocks are crucial for maintaining mineral balance and supporting overall health. They help in preventing deficiencies and boosting immune function.' },
  { id:7, name:'Super neipher Grass', description:'Fresh grass forage, rich in fiber and essential nutrients.', image:'https://www.agrifarming.in/wp-content/uploads/2015/11/Green-Fodder1.jpg', nutrients:{ protein:'5%', fiber:'20%', moisture:'80%', energy:'0.5 Mcal/kg'}, additionalInfo:'Fresh grass is an important source of fiber and essential nutrients. It supports good digestion and is a natural, low-cost feed option.' },
  { id:8, name:'Calcium Supplement', description:'Supplement rich in calcium for bone health and milk production.', image:'https://static.wixstatic.com/media/d5dd5c_76222c9e84ab4349831eb3709e309494~mv2.jpg/v1/fill/w_902,h_820,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/d5dd5c_76222c9e84ab4349831eb3709e309494~mv2.jpg', nutrients:{ protein:'0%', fiber:'0%', moisture:'5%', energy:'0.1 Mcal/kg'}, additionalInfo:'Calcium supplements are vital for bone health and milk production. They help prevent calcium deficiency and related issues like milk fever.' },
  { id:9, name:'Beet Pulp', description:'High-fiber feed made from sugar beet by-products.', image:'https://www.labudde.com/wp-content/uploads/LaBudde-Premium-Screened-Shredded-Beet-Pulp-980x693.jpg', nutrients:{ protein:'9%', fiber:'20%', moisture:'15%', energy:'1.3 Mcal/kg'}, additionalInfo:'Beet pulp is rich in fiber and is useful for improving digestibility and maintaining gut health. It also provides a moderate amount of energy.' },
  { id:10, name:'Oats', description:'Energy-rich grain for supplementing animal diets.', image:'https://eagleseed.com/sitebuilder/images/IMG_1369-420x307.jpg', nutrients:{ protein:'14%', fiber:'11%', moisture:'12%', energy:'2.4 Mcal/kg'}, additionalInfo:'Oats are a great source of energy and can be used to enhance the diet of both dairy and beef cattle. They support weight gain and overall health.' },
  { id:11, name:'Grass', description:'Fresh grass forage, rich in fiber and essential nutrients.', image:'https://d27p2a3djqwgnt.cloudfront.net/wp-content/uploads/2018/01/24115646/meadow-1728902_1280-e1556129977731.jpg', nutrients:{ protein:'5%', fiber:'20%', moisture:'80%', energy:'0.5 Mcal/kg'}, additionalInfo:'Fresh grass is an important source of fiber and essential nutrients. It supports good digestion and is a natural, low-cost feed option.' },
];

export default function FeedTableModal(){
  const [selected, setSelected] = useState<FeedItem|null>(null);
  const [search, setSearch] = useState('');
  const [proteinFilter, setProteinFilter] = useState('All');
  
  const proteinOptions = ['All', 'High (15%+)', 'Medium (10-15%)', 'Low (<10%)'];
  
  const filteredFeeds = useMemo(() => {
    return feedData.filter(feed => {
      const matchesSearch = feed.name.toLowerCase().includes(search.toLowerCase()) ||
                           feed.description.toLowerCase().includes(search.toLowerCase());
      
      let matchesProtein = true;
      if (proteinFilter !== 'All') {
        const proteinValue = parseFloat(feed.nutrients.protein.replace('%', ''));
        if (proteinFilter === 'High (15%+)') {
          matchesProtein = proteinValue >= 15;
        } else if (proteinFilter === 'Medium (10-15%)') {
          matchesProtein = proteinValue >= 10 && proteinValue < 15;
        } else if (proteinFilter === 'Low (<10%)') {
          matchesProtein = proteinValue < 10;
        }
      }
      
      return matchesSearch && matchesProtein;
    });
  }, [search, proteinFilter]);

  const handleProteinSelect = (value: string) => {
    setProteinFilter(value);
  };

  return (
    <section className="mb-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <label htmlFor="feed-search" className="block text-sm font-medium text-gray-700 mb-2">
              <FaSearch className="inline mr-2" />
              Search Feeds
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="feed-search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Protein Filter */}
          <CustomDropdown
            label="Protein Content"
            selected={proteinFilter}
            options={proteinOptions}
            onSelect={handleProteinSelect}
            icon={<FaFlask />}
            placeholder="All"
          />
        </div>
      </div>

      {/* Feed Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-green-500 to-green-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  <FaImage className="inline mr-2" />
                  Image
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  <FaTag className="inline mr-2" />
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  <FaInfoCircle className="inline mr-2" />
                  Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  <FaFlask className="inline mr-2" />
                  Protein
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  <FaLeaf className="inline mr-2" />
                  Fiber
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  <FaTint className="inline mr-2" />
                  Moisture
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                  <FaBolt className="inline mr-2" />
                  Energy
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFeeds.map(feed => (
                <tr 
                  key={feed.id} 
                  onClick={()=> setSelected(feed)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <img 
                      src={feed.image} 
                      alt={feed.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{feed.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate" title={feed.description}>
                      {feed.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {feed.nutrients.protein}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{feed.nutrients.fiber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{feed.nutrients.moisture}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{feed.nutrients.energy}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFeeds.length === 0 && (
          <div className="text-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <FaSearch className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  No feeds found
                </h3>
                <p className="text-gray-600">
                  No feeds match your search criteria. Try adjusting your filters.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <div 
            className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-900">{selected.name}</h3>
                <button
                  onClick={() => setSelected(null)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <MdClose className="w-6 h-6" />
                </button>
              </div>
              
              <img 
                src={selected.image} 
                alt={selected.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <p className="text-gray-700 mb-6 leading-relaxed">{selected.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Protein</div>
                  <div className="text-lg font-semibold text-gray-900">{selected.nutrients.protein}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Fiber</div>
                  <div className="text-lg font-semibold text-gray-900">{selected.nutrients.fiber}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Moisture</div>
                  <div className="text-lg font-semibold text-gray-900">{selected.nutrients.moisture}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Energy</div>
                  <div className="text-lg font-semibold text-gray-900">{selected.nutrients.energy}</div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-gray-700 leading-relaxed">{selected.additionalInfo}</p>
              </div>
              
              <div className="flex gap-3">
                <button className="relative flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg transition overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    <RiFolderInfoLine />
                    More Info
                  </span>
                  <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
                </button>
                <button 
                  onClick={() => setSelected(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  <MdClose />
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
