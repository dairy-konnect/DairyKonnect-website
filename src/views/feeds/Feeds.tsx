import FeedTableModal from '../../components/feeds/FeedTableModal'
import DealerList from '../../components/feeds/DealerList'
import { FaArrowRight, FaPlay } from 'react-icons/fa'

export default function Feeds() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] via-green-50 to-[#f7f9ff]">
      {/* Hero Section */}
      <section className="px-4 md:px-16 lg:px-24 xl:px-32 pt-20 pb-20">
        <main className="flex flex-col max-md:gap-12 md:flex-row pb-20 items-center justify-between">
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-center md:text-left text-4xl leading-[46px] md:text-5xl md:leading-[68px] font-semibold max-w-xl text-slate-900">
              Premium Animal Feed
              <br />
              <span className="text-green-500">Solutions Made Simple.</span>
            </h1>
            <p className="text-center md:text-left text-sm text-slate-700 max-w-lg mt-4">
              Unlock healthier livestock with premium feed options designed to boost nutrition, enhance productivity, and help you achieve optimal dairy production with less effort.
            </p>
            <div className="flex items-center gap-4 mt-8 text-sm">
              <button 
                onClick={() => {
                  const feedSection = document.getElementById('feed-section');
                  feedSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative bg-green-500 text-white active:scale-95 transition rounded-full px-7 h-11 overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Explore Feeds</span>
                  <FaArrowRight className="w-4 h-4" />
                </span>
                <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
              </button>
              <button className="flex items-center gap-2 border border-slate-600 active:scale-95 hover:bg-white/10 transition text-slate-600 rounded-full px-6 h-11">
                <FaPlay className="w-4 h-4" />
                <span>Learn More</span>
              </button>
            </div>
          </div>
          <img 
            src="https://media.istockphoto.com/id/519861694/photo/cows-on-green-meadow.jpg?s=612x612&w=0&k=20&c=NMZFb27NKSQ2rB1uz3WxwXdzAJaAxBP-brGf2DpYWNU=" 
            alt="Animal Feed" 
            className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl transition-all duration-300 rounded-tl-[6rem] rounded-br-[6rem]"
          />
        </main>
      </section>

      {/* Feed Content Section */}
      <div id="feed-section" className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <FeedTableModal />
          <DealerList />
        </div>
      </div>
    </div>
  )
}
