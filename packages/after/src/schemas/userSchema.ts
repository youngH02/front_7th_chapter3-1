import zod from "zod";

export const userSchema = zod.object({
  username: zod
    .string()
    .min(3, "사용자명은 3자 이상이어야 합니다")
    .max(20, "사용자명은 20자 이하이어야 합니다")
    .regex(/^[a-zA-Z0-9_]+$/, "영문, 숫자, 언더스코어만 사용 가능합니다"),
  email: zod
    .string()
    .email("올바른 이메일 형식이 아닙니다")
    .refine(
      (val) => val.endsWith("@company.com") || val.endsWith("@example.com"),
      {
        message:
          "회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다",
      }
    ),
  role: zod.enum(["user", "moderator", "admin"], "권한을 선택해주세요"),
  status: zod.enum(["active", "inactive", "suspended"], "상태를 선택해주세요"),
});

export type TUserFormValues = zod.infer<typeof userSchema>;
