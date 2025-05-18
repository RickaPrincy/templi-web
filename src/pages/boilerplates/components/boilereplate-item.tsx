import { Link as LinkIcon } from 'lucide-react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/common/components/ui/card';
import { Template } from '@/gen/templi-web-api-client';
import { GithubIcon } from '@/common/components';
import { useTemplateStore } from '@/common/stores';
import { useGenerator } from '@/common/hooks/use-generator';

export const BoilerplateItem: FC<{ template: Template }> = ({ template }) => {
  const navigate = useNavigate();
  const setTemplate = useTemplateStore((state) => state.setTemplate);
  const generator = useGenerator(template);

  return (
    <Card
      key={template.id}
      className="transition-all duration-300 hover:shadow-md flex justify-between flex-col cursor-pointer"
      onClick={() => navigate(`/boilerplates/${template.id}`)}
    >
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription className="mb-5">
          {template.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 pt-2">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setTemplate(template);
          }}
          className="w-full flex items-center gap-2"
        >
          <GithubIcon reverse />
          Use Template
        </Button>
        <Button asChild variant="outline" size="sm">
          <a
            target="_blank"
            href={generator.linkUrl()}
            className="w-full flex items-center gap-2"
          >
            <LinkIcon className="h-4 w-4" />
            View on GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
