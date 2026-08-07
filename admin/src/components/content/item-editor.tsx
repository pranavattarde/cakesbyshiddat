import { useState } from 'react';
import { Trash2, ImagePlus } from 'lucide-react';

import { Button, Input, Textarea } from '../ui';
import { MediaPicker } from '../media-picker';

import type { ContentItem } from '../../services/content-pages.service';
import type { MediaItem } from '../../services/media.service';

interface ItemEditorProps {
  title: string;
  value: ContentItem;
  onChange: (value: ContentItem) => void;
  onDelete?: () => void;
}

export function ItemEditor({
  title,
  value,
  onChange,
  onDelete,
}: ItemEditorProps): React.JSX.Element {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [preview, setPreview] = useState<MediaItem | null>(null);

  return (
    <>
      <div className="rounded-2xl border border-rose-100 bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h4 className="font-semibold">{title}</h4>

          {onDelete && (
            <Button
              type="button"
              className="bg-red-50 text-red-600 hover:bg-red-100"
              onClick={onDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          )}
        </div>

        <div className="grid gap-4">

          <Input
            placeholder="Title"
            value={value.title ?? ''}
            onChange={(e) =>
              onChange({
                ...value,
                title: e.target.value,
              })
            }
          />

          <Input
            placeholder="Subtitle"
            value={value.subtitle ?? ''}
            onChange={(e) =>
              onChange({
                ...value,
                subtitle: e.target.value,
              })
            }
          />

          <Textarea
            placeholder="Description"
            rows={4}
            value={value.description ?? ''}
            onChange={(e) =>
              onChange({
                ...value,
                description: e.target.value,
              })
            }
          />

          <Input
            placeholder="Link (optional)"
            value={value.link ?? ''}
            onChange={(e) =>
              onChange({
                ...value,
                link: e.target.value,
              })
            }
          />

          <div>

            <div className="mb-2 text-sm font-medium">
              Image
            </div>

            {preview ? (
              <img
                src={preview.secureUrl}
                alt=""
                className="mb-3 h-40 w-full rounded-xl object-cover"
              />
            ) : (
              <div className="mb-3 flex h-40 items-center justify-center rounded-xl border border-dashed border-rose-200 text-sm text-[#806c75]">
                No image selected
              </div>
            )}

            <Button
              type="button"
              onClick={() => setPickerOpen(true)}
            >
              <ImagePlus className="mr-2 h-4 w-4" />
              Choose Image
            </Button>

          </div>

        </div>
      </div>

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(media) => {
          setPreview(media);

          onChange({
            ...value,
            mediaId: media.id,
          });
        }}
      />
    </>
  );
}