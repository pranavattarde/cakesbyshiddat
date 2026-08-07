import { Plus } from 'lucide-react';

import { Button, Input, Textarea } from '../ui';
import { ItemEditor } from './item-editor';

import type {
  ContentItem,
  ContentSection,
} from '../../services/content-pages.service';

interface SectionEditorProps {
  title: string;
  value: ContentSection;
  allowItems?: boolean;
  onChange: (section: ContentSection) => void;
}

export function SectionEditor({
  title,
  value,
  allowItems = false,
  onChange,
}: SectionEditorProps): React.JSX.Element {
  const update = (changes: Partial<ContentSection>) =>
    onChange({
      ...value,
      ...changes,
    });

  const items = value.items ?? [];

  return (
    <div className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-bold">{title}</h3>

      <div className="grid gap-4">

        <Input
          placeholder="Section Title"
          value={value.title ?? ''}
          onChange={(e) =>
            update({
              title: e.target.value,
            })
          }
        />

        <Input
          placeholder="Section Subtitle"
          value={value.subtitle ?? ''}
          onChange={(e) =>
            update({
              subtitle: e.target.value,
            })
          }
        />

        <Textarea
          rows={5}
          placeholder="Description"
          value={value.description ?? ''}
          onChange={(e) =>
            update({
              description: e.target.value,
            })
          }
        />

        <Input
          placeholder="Button Text"
          value={value.buttonText ?? ''}
          onChange={(e) =>
            update({
              buttonText: e.target.value,
            })
          }
        />

        <Input
          placeholder="Button URL"
          value={value.buttonUrl ?? ''}
          onChange={(e) =>
            update({
              buttonUrl: e.target.value,
            })
          }
        />
      </div>

      {allowItems && (
        <>
          <div className="my-8 flex items-center justify-between">
            <h4 className="text-lg font-semibold">
              Items
            </h4>

            <Button
              type="button"
              onClick={() =>
                update({
                  items: [
                    ...items,
                    {
                      title: '',
                      subtitle: '',
                      description: '',
                      mediaId: '',
                      link: '',
                      displayOrder: items.length,
                      active: true,
                    },
                  ],
                })
              }
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>

          <div className="space-y-5">
            {items.map((item: ContentItem, index) => (
              <ItemEditor
                key={index}
                title={`Item ${index + 1}`}
                value={item}
                onChange={(updated) => {
                  const next = [...items];
                  next[index] = updated;

                  update({
                    items: next,
                  });
                }}
                onDelete={() => {
                  update({
                    items: items.filter((_, i) => i !== index),
                  });
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}