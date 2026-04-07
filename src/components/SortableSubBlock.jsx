import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import BlockRenderer from './blocks/BlockRenderer';

export default function SortableSubBlock({ subBlock, parentBlockId, colIdx }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: subBlock.id,
    data: { origin: 'column', parentBlockId, colIdx },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="sub-block-wrapper">
      <div className="sub-block-drag-handle" title="Arrastrar para reordenar" {...attributes} {...listeners}>
        <GripVertical size={13} />
      </div>
      <div className="sub-block-content">
        <BlockRenderer block={subBlock} />
      </div>
    </div>
  );
}
