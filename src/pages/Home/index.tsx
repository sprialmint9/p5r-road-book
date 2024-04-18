import Navbar from '@/components/Navbar';
import DateSwipe from './components/DateSwipe';
import EventCard from './components/EventCard';
import Summary from './components/Summary';
import DescModal from './components/DescModal';
function Home() {
  return (
    <>
      <Navbar />
      <div className="pl-4 pr-4 pt-18 sm:grid sm:grid-cols-2 sm:gap-4 lg:w-1000px ml-a mr-a">
        <div className="sticky">
          <DateSwipe />
        </div>
        <div>
          <EventCard />
        </div>
      </div>
      <Summary />
      <DescModal />
    </>
  );
}

export default Home;
