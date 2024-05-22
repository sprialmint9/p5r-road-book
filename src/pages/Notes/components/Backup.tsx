import { ChangeEvent, useEffect } from 'react';
import { useAllStore } from '@/store';
import { useToast } from '@/hooks';
import { clearTable, insertData } from '@/service/idb';
import { noteTableName } from '@/config';
const Backup = (props: { showModal: boolean; onClose: () => void }) => {
  const { showToast } = useToast();
  const notesList = useAllStore(state => state.notesList);
  useEffect(() => {
    const modalEl = document.getElementById('backupModal') as HTMLDialogElement;
    if (props.showModal) {
      modalEl?.showModal();
    } else {
      modalEl?.close();
    }
    return () => {
      modalEl?.close();
    };
  }, [props.showModal]);
  const handleExportJson = () => {
    if (notesList) {
      const data = JSON.stringify(notesList, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'notes.json';
      a.click();
      URL.revokeObjectURL(url);
      props.onClose();
    } else {
      showToast('暂无数据', 'warning');
    }
  };
  const handleImportJson = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async e => {
      const data = e.target?.result;
      if (typeof data === 'string') {
        try {
          const notes = JSON.parse(data || '[]') as NoteInfo[];
          await clearTable(noteTableName);
          await insertData(noteTableName, notes);
          showToast('操作成功', 'success');
          useAllStore.getState().getNotesList();
          props.onClose();
          window.scrollTo(0, 0);
        } catch (error) {
          console.log(error);
        }
      }
    };
    reader.readAsText(file);
  };
  return (
    <>
      <dialog id="backupModal" className="modal sm:modal-middle modal-bottom">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => props.onClose()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg mt-0 mb-4 select-none">导出/导入</h3>
          <div className="prose sm:lh-loose lh-normal relative">
            <p>
              由于数据都是存储在浏览器中的，但浏览器的浏览数据被清除后，笔记信息也会被清除，为此有了导入和导出
            </p>
            <h4>注意：</h4>
            <ul>
              <li>导出：将本地数据覆盖到数据库，只支持json，数据格式见导出内容</li>
              <li>导入：将已有的数据转换为json下载到本地</li>
            </ul>
            <input
              className="hidden"
              type="file"
              name="uploadJson"
              id="uploadJson"
              accept=".json"
              onChange={e => handleImportJson(e)}
            />
            <label htmlFor="uploadJson" className="btn btn-md btn-block btn-primary mb-3">
              <i className="i-material-symbols-fitbit-arrow-upward-sharp text-7"></i>导入
            </label>
            <button
              className="btn btn-md btn-block btn-success mb-2"
              onClick={() => handleExportJson()}
            >
              <i className="i-material-symbols-fitbit-arrow-downward-sharp text-7"></i>
              导出
            </button>
          </div>
        </div>
        <div className="modal-backdrop" onClick={() => props.onClose()}>
          close
        </div>
      </dialog>
    </>
  );
};

export default Backup;
