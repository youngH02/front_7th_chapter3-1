import { type FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectOption } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TArticleFormValues } from "@/utils/articleSchema";

interface IProps {
  formArticle: UseFormReturn<TArticleFormValues>;
  handleClick: SubmitHandler<TArticleFormValues>;
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
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={formArticle.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>작성자</FormLabel>
                <FormControl>
                  <Input placeholder="작성자명" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Select {...field}>
                    <SelectOption value="" disabled>
                      카테고리 선택
                    </SelectOption>
                    <SelectOption value="development">Development</SelectOption>
                    <SelectOption value="design">Design</SelectOption>
                    <SelectOption value="accessibility">
                      Accessibility
                    </SelectOption>
                  </Select>
                </FormControl>
                <FormMessage />
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
