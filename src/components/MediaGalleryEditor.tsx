import { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MediaLibrary } from "@/components/MediaPicker";
import type { MediaItem } from "@/components/ProductGallery";

const Tile = ({ id, item, onRemove }: { id: string; item: MediaItem; onRemove: () => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };
  const isVideo = item.kind === "video" || /\.(mp4|webm|mov)$/i.test(item.url);
  return (
    <div ref={setNodeRef} style={style} className="relative bg-background/40 border border-white/10 rounded-lg overflow-hidden group">
      {isVideo ? (
        <video src={item.url} muted className="aspect-square w-full object-cover" />
      ) : (
        <img src={item.url} alt="" className="aspect-square w-full object-cover" />
      )}
      <button {...attributes} {...listeners} className="absolute top-1 left-1 h-7 w-7 grid place-items-center rounded bg-black/60 text-white cursor-grab active:cursor-grabbing">
        <GripVertical className="h-3.5 w-3.5" />
      </button>
      <button onClick={onRemove} className="absolute top-1 right-1 h-7 w-7 grid place-items-center rounded bg-black/60 text-white hover:bg-primary">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export const MediaGalleryEditor = ({ value, onChange }: { value: MediaItem[]; onChange: (m: MediaItem[]) => void }) => {
  const [picking, setPicking] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));
  const ids = value.map((_, i) => `g-${i}`);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = ids.indexOf(String(active.id));
    const newIdx = ids.indexOf(String(over.id));
    onChange(arrayMove(value, oldIdx, newIdx));
  };

  const add = (url: string) => {
    const kind: "image" | "video" = /\.(mp4|webm|mov)$/i.test(url) ? "video" : "image";
    onChange([...value, { url, kind }]);
    setPicking(false);
  };

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={ids} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {value.map((it, i) => (
              <Tile key={ids[i]} id={ids[i]} item={it} onRemove={() => onChange(value.filter((_, j) => j !== i))} />
            ))}
            <button type="button" onClick={() => setPicking(true)}
              className="aspect-square rounded-lg border border-dashed border-white/20 grid place-items-center text-white/50 hover:text-primary hover:border-primary transition">
              <Plus className="h-6 w-6" />
            </button>
          </div>
        </SortableContext>
      </DndContext>
      <p className="text-xs text-white/40">Drag the handle to reorder. First item is the cover.</p>
      <MediaLibrary open={picking} onOpenChange={setPicking} onSelect={add} />
    </div>
  );
};
