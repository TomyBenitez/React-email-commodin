import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import BlockRenderer from './blocks/BlockRenderer';

export default function SortableBlock({ block, isSelected, onSelect, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const bg = block.props.backgroundColor;
  const bgStyle = bg && bg !== 'transparent' ? { backgroundColor: bg } : {};

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`block-wrapper ${isSelected ? 'block-selected' : ''}`}
      onClick={onSelect}
    >
      <div
        className="block-drag-handle"
        title="Arrastrar para reordenar"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </div>

      <div className="block-content" style={bgStyle}>
        <BlockRenderer block={block} />
      </div>

      <button
        className="block-delete"
        title="Eliminar bloque"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
