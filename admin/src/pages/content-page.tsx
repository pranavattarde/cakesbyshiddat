import { useState } from 'react';

import { Button, Card } from '../components/ui';
import { PageEditor } from '../components/content/page-editor';
import { PAGE_TEMPLATES } from "../lib/content-page-templates";

import {
  useContentPages,
  useDeleteContentPage,
  useSaveContentPage,
} from '../hooks/use-content-pages';

import type {
  ContentPage,
  ContentPageInput,
} from '../services/content-pages.service';

const newPage = (): ContentPageInput => ({
  ...PAGE_TEMPLATES.home,
  sections: PAGE_TEMPLATES.home.sections.map((section) => ({ ...section, items: section.items.map((item) => ({ ...item })) })),
});

export function ContentManagementPage(): React.JSX.Element {
  const pages = useContentPages();
  const save = useSaveContentPage();
  const remove = useDeleteContentPage();

  const [selectedPage, setSelectedPage] = useState<
    (ContentPageInput & { id?: string }) | null
  >(null);

  const handleSave = () => {
    if (!selectedPage) return;

    save.mutate(
      {
        id: selectedPage.id,
        input: selectedPage,
      },
      {
        onSuccess: () => {
          setSelectedPage(null);
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#342630]">
            Content Management
          </h2>

          <p className="mt-2 text-[#806c75]">
            Manage Home, About, Services, Events and Gallery pages.
          </p>
        </div>

        <Button onClick={() => setSelectedPage(newPage())}>
          New Page
        </Button>
      </div>

      <Card>
        {pages.isLoading ? (
          <div className="py-10 text-center">
            Loading...
          </div>
        ) : (
          <div className="divide-y divide-rose-100">
            {pages.data?.map((page: ContentPage) => (
              <div
                key={page.id}
                className="flex items-center gap-4 py-5"
              >
                <div className="flex-1">
                  <div className="font-semibold capitalize">
                    {page.slug}
                  </div>

                  <div className="mt-1 text-sm text-[#806c75]">
                    {page.title || 'Untitled'} •{' '}
                    {page.sections.length} Sections
                  </div>
                </div>

                <span
                  className={
                    page.published
                      ? 'rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700'
                      : 'rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-500'
                  }
                >
                  {page.published ? 'Published' : 'Draft'}
                </span>

                <Button
                  className="bg-rose-light text-rose"
                  onClick={() => setSelectedPage(page)}
                >
                  Open
                </Button>

                <Button
                  className="bg-red-500 hover:bg-red-600"
                  onClick={() => remove.mutate(page.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {selectedPage && (
        <Card className="space-y-6">
          <div className="flex items-center justify-between border-b border-rose-100 pb-4">
            <div>
              <h3 className="text-2xl font-bold">
                {selectedPage.slug || 'New Page'}
              </h3>

              <p className="text-[#806c75]">
                Configure page information and sections.
              </p>
            </div>

            <Button
              className="bg-white text-[#342630]"
              onClick={() => setSelectedPage(null)}
            >
              Close
            </Button>
          </div>

          <PageEditor
            value={selectedPage}
            onChange={setSelectedPage}
          />

          <div className="flex justify-end gap-3 border-t border-rose-100 pt-6">
            <Button
              className="bg-white text-[#342630]"
              onClick={() => setSelectedPage(null)}
            >
              Cancel
            </Button>

            <Button
              disabled={save.isPending}
              onClick={handleSave}
            >
              {save.isPending
                ? 'Saving...'
                : 'Save Changes'}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
