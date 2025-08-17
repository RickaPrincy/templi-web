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
import { AuthenticationRequired, GithubIcon } from '@/common/components';
import { useTemplateStore } from '@/common/stores';
import { useGenerator } from '@/common/hooks/use-generator';

export const TemplateItem: FC<{ template: Template }> = ({ template }) => {
  const navigate = useNavigate();
  const setTemplate = useTemplateStore((state) => state.setTemplate);
  const generator = useGenerator(template);

  return (
    <Card
      key={template.id}
      className="transition-all duration-300 hover:scale-[1.02] hover:shadow-md flex justify-between flex-col cursor-pointer"
      onClick={() => navigate(`/templates/${template.id}`)}
    >
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription className="mb-5">
          {template.description}
        </CardDescription>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2">
          {(template.tags ?? []).slice(0, 3).map((tag) => (
            <span
              key={tag?.id}
              className="rounded-full  my-2 border px-2 py-[2px] text-xs bg-muted text-muted-foreground"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </CardHeader>
      <CardFooter className="flex flex-col gap-2 pt-2">
        <AuthenticationRequired
          handleClick={() => setTemplate(template)}
          render={(handleUseTemplateClick) => (
            <Button
              onClick={handleUseTemplateClick}
              className="w-full flex items-center gap-2"
            >
              <GithubIcon reverse />
              Use Template
            </Button>
          )}
        />
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
