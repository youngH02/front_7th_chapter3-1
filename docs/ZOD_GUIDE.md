# Zod + React Hook Form 사용 가이드

## 1. 설치 (이미 되어있음)
```bash
npm install zod @hookform/resolvers
```

## 2. ManagementPage.tsx 적용 방법

### 단계 1: import 추가
```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // 리졸버 필수!
import { z } from "zod";
```

### 단계 2: 스키마 정의 (컴포넌트 밖이나 상단에 작성)
검증 규칙을 여기서 다 정합니다. 메시지도 커스텀 가능합니다.

```typescript
// User 스키마
const userSchema = z.object({
  username: z.string().min(2, { message: "이름은 2글자 이상이어야 합니다." }),
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  role: z.string(),
  status: z.string(),
});

// Article 스키마
const articleSchema = z.object({
  title: z.string().min(5, { message: "제목은 5글자 이상 입력해주세요." }),
  content: z.string().optional(), // 선택 사항
  author: z.string().min(1, { message: "작성자를 입력해주세요." }),
  category: z.string(),
});
```

### 단계 3: 타입 추출 (자동)
`interface`를 직접 쓰지 않고, 위에서 만든 스키마에서 타입을 뽑아냅니다.
```typescript
export type TUserFormValues = z.infer<typeof userSchema>;
export type TArticleFormValues = z.infer<typeof articleSchema>;
```

### 단계 4: useForm에 연결
`resolver` 옵션에 `zodResolver(스키마)`를 넣어주면 끝입니다!

```typescript
const form = useForm<TUserFormValues>({
  resolver: zodResolver(userSchema), // ✨ 여기가 핵심 연결 고리
  defaultValues: { role: "user", status: "active" },
});

const formArticle = useForm<TArticleFormValues>({
  resolver: zodResolver(articleSchema), // ✨ 여기도 연결
  defaultValues: { title: "", category: "development" },
});
```

---

## 3. 하위 컴포넌트 (UserForm/index.tsx) 수정

이제 하위 컴포넌트는 `TUserFormValues` 타입만 잘 가져다 쓰면 됩니다.

```typescript
import { TUserFormValues } from "../../pages/ManagementPage"; // 타입 가져오기

interface IProps {
  form: UseFormReturn<TUserFormValues>; // 제네릭에 타입 전달
  handleClick: SubmitHandler<TUserFormValues>;
}
// ... 나머지는 그대로
```

## 4. 꿀팁: 자주 쓰는 Zod 규칙들

- **필수 입력**: `z.string().min(1, "필수입니다")`
- **숫자만**: `z.number()`
- **선택 사항**: `z.string().optional()`
- **값 제한(Enum)**: `z.enum(["user", "admin"])`
