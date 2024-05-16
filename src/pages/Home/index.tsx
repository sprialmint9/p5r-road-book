import Navbar from '@/components/Navbar';
import DateSwipe from './components/DateSwipe';
import EventCard from './components/EventCard';
import Summary from './components/Summary';
import DescModal from './components/DescModal';
import AddModal from '../Notes/components/AddModal';
function Home() {
  return (
    <div className="pb-safe">
      <Navbar />
      <div className="pl-4 pr-4 pt-18 pb-8 sm:grid sm:grid-cols-2 sm:gap-4 lg:w-1000px ml-a mr-a">
        <div>
          <DateSwipe />
        </div>
        <div>
          <EventCard />
        </div>
      </div>
      <Summary />
      <DescModal />
      <AddModal />
    </div>
  );
}

export default Home;
