import { useMemo, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

import { Button, Card, Input, Textarea } from '../ui';
import { MediaPicker } from '../media-picker';
import { SectionEditor } from './section-editor';

import type {
  ContentPageInput,
  ContentSection,
} from '../../services/content-pages.service';

import type { MediaItem } from '../../services/media.service';

interface PageEditorProps {
  value: ContentPageInput;
  onChange: (page: ContentPageInput) => void;
}

const SECTION_TYPES: ContentSection['type'][] = [
  'hero',
  'text',
  'cards',
  'gallery',
  'founders',
  'timeline',
  'cta',
  'faq',
];

export function PageEditor({
  value,
  onChange,
}: PageEditorProps): React.JSX.Element {
  const [pickerOpen, setPickerOpen] = useState(false);

  const update = (changes: Partial<ContentPageInput>) => {
    onChange({
      ...value,
      ...changes,
    });
  };

  const updateSection = (
    index: number,
    section: ContentSection,
  ) => {
    const sections = [...value.sections];

    sections[index] = {
      ...section,
      displayOrder: index,
    };

    update({
      sections,
    });
  };

  const removeSection = (index: number) => {
    update({
      sections: value.sections
        .filter((_, i) => i !== index)
        .map((section, order) => ({
          ...section,
          displayOrder: order,
        })),
    });
  };

  const addSection = (
    type: ContentSection['type'],
  ) => {
    const next: ContentSection = {
      type,
      title: '',
      subtitle: '',
      description: '',
      mediaId: undefined,
      buttonText: '',
      buttonUrl: '',
      displayOrder: value.sections.length,
      active: true,
      items: [],
    };

    update({
      sections: [...value.sections, next],
    });
  };

  const heroPreview = useMemo(() => {
    return value.heroMedia ?? null;
  }, [value.heroMedia]);

  return (
    <>
      <Card className="space-y-6">

        <div>
          <h2 className="text-xl font-bold">
            Page Information
          </h2>

          <p className="text-sm text-[#806c75]">
            Configure the basic information for this page.
          </p>
        </div>

        <Input
          placeholder="Title"
          value={value.title}
          onChange={(e) =>
            update({
              title: e.target.value,
            })
          }
        />

        <Input
          placeholder="Subtitle"
          value={value.subtitle}
          onChange={(e) =>
            update({
              subtitle: e.target.value,
            })
          }
        />

        <Textarea
          rows={3}
          placeholder="SEO Title"
          value={value.seoTitle}
          onChange={(e) =>
            update({
              seoTitle: e.target.value,
            })
          }
        />

        <Textarea
          rows={4}
          placeholder="SEO Description"
          value={value.seoDescription}
          onChange={(e) =>
            update({
              seoDescription: e.target.value,
            })
          }
        />

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={value.published}
            onChange={(e) =>
              update({
                published: e.target.checked,
              })
            }
          />

          <span className="text-sm">
            Published
          </span>

        </div>

        <Input
          type="number"
          placeholder="Display Order"
          value={value.displayOrder}
          onChange={(e) =>
            update({
              displayOrder: Number(e.target.value),
            })
          }
        />

        <div>

          <div className="mb-3 text-sm font-medium">
            Hero Image
          </div>

          {heroPreview ? (
            <img
              src={heroPreview.secureUrl}
              alt=""
              className="mb-4 h-56 w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="mb-4 flex h-56 items-center justify-center rounded-2xl border border-dashed border-rose-200 text-[#806c75]">
              No Hero Image Selected
            </div>
          )}

          <Button
            type="button"
            onClick={() => setPickerOpen(true)}
          >
            Choose Hero Image
          </Button>

        </div>

      </Card>

      <Card className="mt-8 space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Sections
            </h2>

            <p className="text-sm text-[#806c75]">
              Build this page using reusable content sections.
            </p>

          </div>

        </div>

        {value.sections.map((section, index) => (

          <div
            key={index}
            className="rounded-2xl border border-rose-100 p-5"
          >

            <div className="mb-4 flex items-center justify-between">

              <div>

                <div className="font-semibold capitalize">
                  {section.type}
                </div>

                <div className="text-sm text-[#806c75]">
                  Section #{index + 1}
                </div>

              </div>

              <Button
                type="button"
                className="bg-red-500 hover:bg-red-600"
                onClick={() => removeSection(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>

            </div>

            <SectionEditor
              title={`Section ${index + 1}`}
              value={section}
              allowItems={
                section.type === 'cards' ||
                section.type === 'gallery' ||
                section.type === 'faq' ||
                section.type === 'timeline' ||
                section.type === 'founders'
              }
              onChange={(updated) =>
                updateSection(index, updated)
              }
                          />

          </div>

        ))}

        <div className="border-t border-rose-100 pt-6">

          <h3 className="mb-4 text-lg font-semibold">
            Add Section
          </h3>

          <div className="flex flex-wrap gap-3">

            {SECTION_TYPES.map((type) => (

              <Button
                key={type}
                type="button"
                className="bg-white text-[#342630] border border-rose-200 hover:bg-rose-50"
                onClick={() => addSection(type)}
              >
                <Plus className="mr-2 h-4 w-4" />

                {type.charAt(0).toUpperCase() + type.slice(1)}

              </Button>

            ))}

          </div>

        </div>

      </Card>

      <MediaPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(media: MediaItem) => {
          update({
            heroMediaId: media.id,
            heroMedia: media,
          });

          setPickerOpen(false);
        }}
      />

    </>
  );
}
