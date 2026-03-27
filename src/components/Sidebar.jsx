import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import {
  Heading,
  AlignLeft,
  Image,
  MousePointerClick,
  Minus,
  ArrowUpDown,
  Share2,
  Columns2,
  Columns3,
  LayoutPanelLeft,
  LayoutGrid,
  Grid3x3,
  Star,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { BLOCK_CATEGORIES } from '../utils/blockDefaults';

const BLOCK_ICONS = {
  heading: Heading,
  text: AlignLeft,
  image: Image,
  button: MousePointerClick,
  divider: Minus,
  spacer: ArrowUpDown,
  social: Share2,
  columns2: Columns2,
  columns3: Columns3,
  'tpl-hero': Star,
  'tpl-cards': LayoutGrid,
  'tpl-gallery': Grid3x3,
  'tpl-imgtext': LayoutPanelLeft,
};

export default function Sidebar() {
  const [openCategories, setOpenCategories] = useState(
    Object.fromEntries(BLOCK_CATEGORIES.map((c) => [c.label, true]))
  );

  function toggleCategory(label) {
    setOpenCategories((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  return (
    <aside className="sidebar">
      {BLOCK_CATEGORIES.map((category) => (
        <div key={category.label} className="sidebar-category">
          <button
            className="sidebar-category-header"
            onClick={() => toggleCategory(category.label)}
          >
            <span>{category.label}</span>
            <span className="sidebar-category-arrow">
              {openCategories[category.label]
                ? <ChevronDown size={14} />
                : <ChevronRight size={14} />}
            </span>
          </button>

          {openCategories[category.label] && (
            <div className="sidebar-blocks">
              {category.blocks.map((bt) => (
                <DraggableBlock key={bt.id} blockType={bt} />
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}

function DraggableBlock({ blockType }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-${blockType.id}`,
    data: {
      origin: 'sidebar',
      blockType: blockType.type,
      label: blockType.label,
      config: blockType.config || {},
      makeConfig: blockType.makeConfig || null,
    },
  });

  const IconComponent = BLOCK_ICONS[blockType.icon];

  return (
    <div
      ref={setNodeRef}
      className={`sidebar-block ${isDragging ? 'is-dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <span className="sidebar-block-icon">
        {IconComponent ? <IconComponent size={16} /> : null}
      </span>
      <span>{blockType.label}</span>
    </div>
  );
}
