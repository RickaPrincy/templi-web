
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Github, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Progress } from "../ui/progress";

type TemplateKey = {
  label: string;
  name: string;
  type: 'INPUT' | 'SELECT' | 'BOOLEAN';
  choices?: string[];
  default?: any;
  required?: boolean;
  clean?: boolean;
};

type TemplateConfig = {
  excludes?: string[];
  scripts?: {
    before?: string[];
    after?: string[];
  };
  keys: TemplateKey[];
};

type TemplateModalProps = {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  templateUrl: string;
  templatePath?: string;
  templateConfig?: TemplateConfig;
};

type FormValues = {
  repositoryName: string;
  isPrivate: boolean;
  [key: string]: any;
};

export function TemplateModal({ isOpen, onClose, templateName, templateUrl, templatePath, templateConfig }: TemplateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedRepoUrl, setGeneratedRepoUrl] = useState("");
  const navigate = useNavigate();

  const defaultValues: FormValues = {
    repositoryName: `my-${templateName.toLowerCase().replace(/\s+/g, '-')}`,
    isPrivate: false,
  };

  // Add default values from template config
  if (templateConfig) {
    templateConfig.keys.forEach(key => {
      if (key.default !== undefined) {
        defaultValues[key.name] = key.default;
      } else if (key.type === 'INPUT' || key.type === 'SELECT') {
        defaultValues[key.name] = '';
      } else if (key.type === 'BOOLEAN') {
        defaultValues[key.name] = false;
      }
    });
  }

  const form = useForm<FormValues>({
    defaultValues
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setProgress(0);
    
    try {
      // In a real app, we would make an API call to create the repository
      console.log("Generating project with values:", values);
      console.log("Template URL:", templateUrl);
      console.log("Template Path:", templatePath || "root");
      
      // Simulate API call with progress
      const simulateProgress = () => {
        const interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 95) {
              clearInterval(interval);
              return prev;
            }
            return prev + 5;
          });
        }, 200);
        
        return () => clearInterval(interval);
      };
      
      const cleanup = simulateProgress();
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clean up and set to 100%
      cleanup();
      setProgress(100);
      
      // Create mock GitHub repository URL
      const repoName = values.repositoryName;
      const username = "github-username"; // In a real app, this would come from the user's GitHub profile
      const repoUrl = `https://github.com/${username}/${repoName}`;
      setGeneratedRepoUrl(repoUrl);
      
      // Show success dialog after a small delay to see 100% progress
      setTimeout(() => {
        setShowSuccess(true);
      }, 400);
      
    } catch (error) {
      console.error("Error generating project:", error);
      toast.error("Failed to generate project. Please try again.");
    }
  };

  // Build command preview
  const buildCommand = () => {
    const repoName = form.watch("repositoryName");
    let command = `templi generate -t ${templateUrl}`;
    if (templatePath) {
      command += ` -p ${templatePath}`;
    }
    command += ` -o ~/${repoName}`;

    // Add dynamic flags based on form values if we have a config
    if (templateConfig) {
      templateConfig.keys.forEach(key => {
        const value = form.watch(key.name);
        if (value !== undefined && value !== '') {
          if (key.type === 'BOOLEAN') {
            if (value === true) {
              command += ` --${key.name}`;
            }
          } else {
            command += ` --${key.name}="${value}"`;
          }
        }
      });
    }

    return command;
  };

  const closeSuccessDialog = () => {
    setShowSuccess(false);
    setIsSubmitting(false);
    onClose();
    // Optionally redirect or refresh
    navigate('/boilerplates');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && !isSubmitting && onClose()}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Generate {templateName} Project</DialogTitle>
            <DialogDescription>
              Configure your new project based on this template.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="repositoryName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repository Name</FormLabel>
                      <FormControl>
                        <Input placeholder="my-project" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your new repository
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="isPrivate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-2 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox 
                          checked={field.value} 
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Private Repository</FormLabel>
                        <FormDescription>
                          Make this repository private
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {templateConfig && templateConfig.keys.map((key) => (
                <FormField
                  key={key.name}
                  control={form.control}
                  name={key.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{key.label}</FormLabel>
                      <FormControl>
                        {key.type === 'INPUT' && (
                          key.name === 'description' ? 
                          <Textarea placeholder={key.label} {...field} /> :
                          <Input placeholder={key.label} {...field} />
                        )}
                        {key.type === 'SELECT' && (
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              {key.choices?.map((choice) => (
                                <SelectItem key={choice} value={choice}>{choice}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        {key.type === 'BOOLEAN' && (
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={key.name}
                              checked={field.value} 
                              onCheckedChange={field.onChange}
                            />
                            <label htmlFor={key.name} className="text-sm">
                              Enable {key.label}
                            </label>
                          </div>
                        )}
                      </FormControl>
                      {key.required === false && (
                        <FormDescription>Optional</FormDescription>
                      )}
                    </FormItem>
                  )}
                />
              ))}

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2">Command Preview</h3>
                <div className="bg-slate-950 text-slate-50 p-3 rounded text-xs font-mono overflow-x-auto">
                  {buildCommand()}
                </div>
              </div>
              
              {isSubmitting && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Generating Project</h3>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1 text-right">{progress}%</p>
                </div>
              )}
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Github className="h-4 w-4" />
                      Generate Project
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showSuccess}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Project Generated Successfully!</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-2">
                Your project "{form.watch('repositoryName')}" has been successfully generated from the {templateName} template.
              </p>
              <p className="font-medium">
                Repository URL: <a href={generatedRepoUrl} target="_blank" className="text-blue-500 underline">{generatedRepoUrl}</a>
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={closeSuccessDialog}>
              View Project
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
