import { useState } from 'react';
import { Mail, Code2 } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import { createBlock } from './utils/blockDefaults';
import { renderEmailHTML } from './utils/renderEmail';
import './App.css';

export default function App() {
  const [blocks, setBlocks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const selectedBlock = blocks.find((b) => b.id === selectedId) ?? null;

  function handleDragStart(event) {
    setActiveItem(event.active);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveItem(null);

    if (!over) return;

    // Drop from sidebar → create new block
    if (active.data.current?.origin === 'sidebar') {
      const { blockType, config, makeConfig } = active.data.current;
      const resolvedConfig = makeConfig ? makeConfig() : (config || {});
      const newBlock = createBlock(blockType, resolvedConfig);
      setBlocks((prev) => {
        const overIndex = prev.findIndex((b) => b.id === over.id);
        if (overIndex === -1) return [...prev, newBlock];
        const next = [...prev];
        next.splice(overIndex, 0, newBlock);
        return next;
      });
      setSelectedId(newBlock.id);
      return;
    }

    // Reorder within canvas
    if (active.id !== over.id) {
      setBlocks((prev) => {
        const oldIndex = prev.findIndex((b) => b.id === active.id);
        const newIndex = prev.findIndex((b) => b.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return prev;
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  function handleDragCancel() {
    setActiveItem(null);
  }

  function updateBlockProps(id, newProps) {
    setBlocks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, props: { ...b.props, ...newProps } } : b
      )
    );
  }

  function deleteBlock(id) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function handleExportHTML() {
    const html = renderEmailHTML(blocks);
    navigator.clipboard.writeText(html).then(() => {
      alert('HTML copiado al portapapeles.');
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="app">
        <header className="app-header">
          <span className="app-logo"><Mail size={18} /> Email Builder</span>
          <button className="btn-export" onClick={handleExportHTML}>
            <Code2 size={15} /> Exportar HTML
          </button>
        </header>

        <div className="app-body">
          <Sidebar />
          <Canvas
            blocks={blocks}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onDelete={deleteBlock}
          />
          <PropertiesPanel
            block={selectedBlock}
            onChange={(props) =>
              selectedBlock && updateBlockProps(selectedBlock.id, props)
            }
          />
        </div>
      </div>

      <DragOverlay dropAnimation={null}>
        {activeItem?.data.current?.origin === 'sidebar' && (
          <div className="drag-overlay-pill">
            {activeItem.data.current.label}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
