import { useState } from 'react';
import { Button } from '@/common/components/ui/button';
import { GifModal } from '../gif-modal';
import { Play } from 'lucide-react';

const cards = [
  {
    title: 'Start a Project from a Ready-Made Template',
    description:
      'Launch a new project instantly using a template that’s already in Templi’s web interface.',
    gif: '/gif/web-with-template.gif',
  },
  {
    title: 'Use a Template from GitHub',
    description:
      'Generate a project by pasting a GitHub template URL—no setup needed.',
    gif: '/gif/web-from-url.gif',
  },
  {
    title: 'Quickly Create a Project via CLI',
    description:
      'Use Templi’s command-line tool to quickly start a project from any GitHub template.',
    gif: '/gif/cli-with-github.gif',
  },
  {
    title: 'Create and Share Your Own Template',
    description:
      'Design reusable templates to standardize project setup across your teams or open source community.',
    gif: '/gif/create-template.gif',
  },
];

export const Demo = () => {
  const [selectedCard, setSelectedCard] = useState<null | number>(null);

  return (
    <section className="container grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-xl border shadow p-6 flex flex-col justify-between"
        >
          <div>
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              {card.title}
            </h2>
            <p className="text-muted-foreground text-sm">{card.description}</p>
          </div>
          <Button className="mt-4 w-fit" onClick={() => setSelectedCard(index)}>
            <Play />
            Gif Demo
          </Button>
        </div>
      ))}

      {selectedCard !== null && (
        <GifModal
          open={true}
          onOpenChange={() => setSelectedCard(null)}
          title={cards[selectedCard].title}
          gifSrc={cards[selectedCard].gif}
        />
      )}
    </section>
  );
};
