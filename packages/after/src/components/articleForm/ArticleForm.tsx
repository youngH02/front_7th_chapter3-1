import { type FC } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
interface ArticleFormValues {
   title: string;
  content?: string;
  author?: string;
  category?: string;
}

interface IProps {
  formArticle: UseFormReturn<ArticleFormValues>;
  handleClick: SubmitHandler<ArticleFormValues>;
}

const ArticleForm: FC<IProps> = ({ formArticle, handleClick }) => {
  return (
    <Form {...formArticle}>
      <form onSubmit={formArticle.handleSubmit(handleClick)}>
        <FormField
          control={formArticle.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="게시글 제목을 입력하세요" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}>
          <FormField
            control={formArticle.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>작성자</FormLabel>
                <FormControl>
                  <Input placeholder="작성자명" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={formArticle.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="역할 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="accessibility">
                        Accessibility
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={formArticle.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="게시글 내용을 입력하세요"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ArticleForm;
