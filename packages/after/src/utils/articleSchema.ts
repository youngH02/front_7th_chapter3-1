import zod from "zod";

export const articleSchema = zod.object({
  title: zod
    .string()
    .min(5, "제목은 5자 이상이어야 합니다")
    .max(100, "제목은 100자 이하이어야 합니다")
    .refine(
      (val) => !["광고", "스팸", "홍보"].some((word) => val.includes(word)),
      { message: "제목에 금지된 단어가 포함되어 있습니다" }
    ),
  content: zod.string().optional(),
  author: zod.string().optional(),
  category: zod.string().optional(),
});

export type TArticleFormValues = zod.infer<typeof articleSchema>;
