import Navbar from '@/components/Navbar';
import DateSwipe from './components/DateSwipe';
import EventCard from './components/EventCard';
function Home() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <DateSwipe />
        <EventCard />
      </div>
    </>
  );
}

export default Home;

// <div className="mockup-phone w-414px h-896px block mt-4 ml-a mr-a">
//   <div className="camera"></div>
//   <div className="display h-full bg-base-200 pt-25px">
//     <Navbar />
//     <div className="p-4">
//       <DateSwipe />
//       <EventCard />
//     </div>
//   </div>
// </div>;
