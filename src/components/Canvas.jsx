import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableBlock from './SortableBlock';

export default function Canvas({ blocks, selectedId, onSelect, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-droppable' });

  const isEmpty = blocks.length === 0;

  return (
    <main className="canvas-area">
      <div className="canvas-scroll">
        <div
          ref={setNodeRef}
          className={[
            'canvas',
            isOver ? 'canvas-over' : '',
            isEmpty ? 'canvas-empty' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {isEmpty ? (
            <div className="canvas-placeholder">
              <p>Arrastrá un bloque desde el panel izquierdo</p>
            </div>
          ) : (
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.map((block) => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  isSelected={selectedId === block.id}
                  onSelect={() => onSelect(block.id)}
                  onDelete={() => onDelete(block.id)}
                />
              ))}
            </SortableContext>
          )}
        </div>
      </div>
    </main>
  );
}
