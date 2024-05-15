import React, { useRef, useEffect, ReactNode } from 'react';

/**
 * 选择文本后弹出的气泡框
 * 目前没有使用，因为在移动端部分浏览器会与原生的选择文本的气泡冲突，改为底部弹出菜单的方式
 * @param children
 * @constructor
 * @return
 * */
const SelectionBubble: React.FC<{ children: ReactNode }> = ({ children }) => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bubbleRef.current) {
      bubbleRef.current.style.visibility = 'hidden';
      bubbleRef.current.style.zIndex = '-1';
    }
    let selectTxt = '';
    let top = '';
    let left = '';
    const handleSelection = () => {
      const selection = window.getSelection();
      if (!selection) {
        if (bubbleRef.current) {
          const bubble = bubbleRef.current;
          bubble.style.display = 'none';
        }
        selectTxt = '';
        return;
      }
      selectTxt = selection.toString();
      const range = selection.getRangeAt(0);
      const container = containerRef.current;

      if (!container || range.collapsed) {
        return;
      }

      const containerRect = container.getBoundingClientRect();
      const rangeRect = range.getBoundingClientRect();

      if (!bubbleRef.current) return;
      const bubble = bubbleRef.current;
      const bubbleRect = bubble.getBoundingClientRect();
      left = `${rangeRect.left - containerRect.left + rangeRect.width / 2 - bubble.offsetWidth}px`;
      top = `${rangeRect.top - containerRect.top - bubbleRect.height}px`;
    };
    const handleContainerDown = () => {
      if (bubbleRef.current) {
        const bubble = bubbleRef.current;
        bubble.style.visibility = 'hidden';
        bubble.style.zIndex = '-1';
        selectTxt = '';
      }
    };
    const handleContainerUp = () => {
      if (!bubbleRef.current) return;
      const bubble = bubbleRef.current;
      if ((!bubble.style.visibility || bubble.style.visibility === 'hidden') && selectTxt) {
        bubble.style.visibility = 'visible';
        bubble.style.zIndex = '2';
        bubble.style.left = left;
        bubble.style.top = top;
      }
    };
    const handleContainerMove = (e: PointerEvent) => {
      if (container) {
        container.setPointerCapture(e.pointerId);
      }
    };
    const handleNativeContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('pointerdown', handleContainerDown);
      container.addEventListener('pointermove', handleContainerMove);
      container.addEventListener('pointerup', handleContainerUp);
      document.addEventListener('selectionchange', handleSelection);
      container.addEventListener('contextmenu', handleNativeContextMenu);
      return () => {
        container.removeEventListener('pointerdown', handleContainerDown);
        container.removeEventListener('pointermove', handleContainerMove);
        container.removeEventListener('pointerup', handleContainerUp);
        container.removeEventListener('contextmenu', handleNativeContextMenu);
        document.removeEventListener('selectionchange', handleSelection);
      };
    }
  }, []);

  return (
    <div className="relative z-1" ref={containerRef}>
      {children}
      <div className="join absolute" ref={bubbleRef}>
        <button className="btn btn-xs btn-neutral join-item">采集</button>
        <button className="btn btn-xs btn-neutral join-item">复制</button>
      </div>
    </div>
  );
};

export default SelectionBubble;
