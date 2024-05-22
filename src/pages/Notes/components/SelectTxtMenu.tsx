import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { copyText } from '@/utils';
import { useToast } from '@/hooks';
import { useAllStore } from '@/store';

const SelectTxtMenu: React.FC<{ children: ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuStyle, setMenuStyle] = useState('translate-y-50vh');
  const selectTxt = useRef('');
  const { showToast } = useToast();
  const dayId = useAllStore(state => state.selectInfo?.dayId);
  const { AddModalControl } = useAllStore();
  const menu = [
    {
      title: '收藏',
      icon: 'i-material-symbols-bookmark-add-outline-sharp',
      action: () => {
        useAllStore.getState().setSelectText(selectTxt.current);
        dayId && useAllStore.getState().setCurrentDayId(dayId);
        AddModalControl(true);
        window.getSelection()?.empty();
      },
    },
    {
      title: '复制',
      icon: 'i-material-symbols-content-copy-outline-sharp',
      action: async () => {
        try {
          await copyText(selectTxt.current);
          showToast('复制成功', 'success');
          window.getSelection()?.empty();
        } catch (e) {
          console.error(e);
          showToast('复制失败', 'error');
        }
      },
    },
  ];
  useEffect(() => {
    setMenuStyle(showMenu ? 'translate-y-0' : 'translate-y-50vh');
    return () => {
      setMenuStyle('translate-y-50vh');
    };
  }, [showMenu, children]);
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection || !selection?.toString()) {
        setShowMenu(false);
        selectTxt.current = '';
        return;
      }
      selectTxt.current = selection.toString();
    };
    const handleContainerDown = () => {
      if (showMenu) {
        setShowMenu(false);
        selectTxt.current = '';
      }
    };
    const handleContainerUp = () => {
      setShowMenu(!!selectTxt.current);
    };
    const handleContainerMove = (e: PointerEvent) => {
      if (container) {
        container.setPointerCapture(e.pointerId);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointerdown', handleContainerDown);
      container.addEventListener('pointermove', handleContainerMove);
      container.addEventListener('pointerup', handleContainerUp);
      document.addEventListener('selectionchange', handleSelection);
      return () => {
        container.removeEventListener('pointerdown', handleContainerDown);
        container.removeEventListener('pointermove', handleContainerMove);
        container.removeEventListener('pointerup', handleContainerUp);
        document.removeEventListener('selectionchange', handleSelection);
      };
    }
  });

  return (
    <>
      <div className="relative z-1" ref={containerRef}>
        {children}
      </div>
      <div
        className={`fixed bottom-8 left-0 right-0 z-2 ml-a mr-a w-max select-none flex items-center transition-ease-in-out transition-property-transform transition-duration-500 ${menuStyle}`}
      >
        <ul className="menu menu-md menu-horizontal bg-base-200 b-rounded-2 shadow-lg b-1 b-coolGray b-solid">
          {menu.map(item => (
            <li key={item.title}>
              <a onClick={item.action}>
                <i className={item.icon}></i>
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SelectTxtMenu;
