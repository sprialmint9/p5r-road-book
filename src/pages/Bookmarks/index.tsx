import SearchBar from './components/SearchBar';
import MarkList from './components/MarkList';
import AddModal from './components/AddModal';

function Home() {
  return (
    <>
      <SearchBar />
      <div className="pl-4 pr-4 pt-18 lg:w-1000px ml-a mr-a">
        <MarkList />
      </div>
      <AddModal />
    </>
  );
}

export default Home;
