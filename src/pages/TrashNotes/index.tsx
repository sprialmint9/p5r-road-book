import NavBar from './components/NavBar';
import NoteList from './components/NoteList';
import { useAllStore } from '@/store';

function Notes() {
  useAllStore.getState().getTrashList();
  return (
    <div className="pb-safe">
      <NavBar />
      <div className="pl-4 pr-4 pt-18 pb-4 lg:w-1000px ml-a mr-a">
        <NoteList />
      </div>
    </div>
  );
}

export default Notes;
