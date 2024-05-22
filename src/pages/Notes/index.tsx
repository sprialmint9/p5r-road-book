import SearchBar from './components/SearchBar';
import NoteList from './components/NoteList';
import AddModal from './components/AddModal';
import { useAllStore } from '@/store';

function Notes() {
  useAllStore.getState().getNotesList();
  return (
    <div className="pb-safe">
      <SearchBar />
      <div className="pl-4 pr-4 pt-18 pb-4 lg:w-1000px ml-a mr-a">
        <NoteList />
      </div>
      <AddModal />
    </div>
  );
}

export default Notes;
