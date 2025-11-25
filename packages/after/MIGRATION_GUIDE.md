# 디자인 시스템 마이그레이션 가이드

이 가이드는 `packages/before`의 레거시 코드를 `packages/after`의 현대적인 스택(shadcn/ui, TailwindCSS, React Hook Form)으로 마이그레이션하는 단계를 설명합니다.

## 1. 사전 준비 (Setup)

이미 `packages/after`에는 기본적인 환경 설정이 되어 있습니다.
- **TailwindCSS**: 스타일링 엔진
- **shadcn/ui**: 컴포넌트 라이브러리 기반
- **React Hook Form**: 폼 상태 관리
- **Zod**: 스키마 검증

필요한 컴포넌트가 설치되어 있는지 확인하세요. (이미 설치되어 있을 수 있습니다)
```bash
# packages/after 디렉토리에서 실행
npx shadcn-ui@latest add button input select card table form label
```

## 2. 컴포넌트 마이그레이션 (Button)

레거시 `Button`을 shadcn/ui `Button`으로 교체합니다.

1. `packages/after/src/components/ui/button.tsx` 파일을 확인합니다.
2. `cva` 함수를 사용하여 `variant`와 `size`가 정의되어 있는지 확인합니다.
3. **Task**: `packages/after/src/pages/ManagementPage.tsx`에서 기존 버튼을 교체해봅니다.
   - Legacy: `<Button variant="primary">`
   - New: `<Button variant="default">` (shadcn 기본값은 default입니다)

## 3. 폼(Form) 마이그레이션 (핵심)

가장 큰 변경점은 `useState` 기반의 폼을 `React Hook Form` + `Zod`로 변경하는 것입니다.

### 단계 1: Zod 스키마 정의
`ManagementPage.tsx` 상단에 데이터 검증을 위한 스키마를 정의합니다.

```typescript
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
  email: z.string().email("유효한 이메일이어야 합니다."),
  role: z.enum(["user", "admin", "moderator"]),
  status: z.enum(["active", "inactive", "suspended"]),
});

// 타입 추론
type UserFormValues = z.infer<typeof userSchema>;
```

### 단계 2: useForm 훅 사용
기존 `useState`를 제거하고 `useForm`을 초기화합니다.

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const form = useForm<UserFormValues>({
  resolver: zodResolver(userSchema),
  defaultValues: {
    username: "",
    role: "user",
    // ...
  },
});
```

### 단계 3: 하위 폼 컴포넌트 수정
`UserForm.tsx`와 `ArticleForm.tsx`를 수정하여 `react-hook-form`의 `Control`을 prop으로 받도록 변경합니다.

**UserForm.tsx 예시:**
```typescript
interface Props {
  form: UseFormReturn<UserFormValues>; // form 객체 전체를 전달받음
  onSubmit: (values: UserFormValues) => void;
}

const UserForm = ({ form, onSubmit }: Props) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이름</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ... 다른 필드들 */}
      </form>
    </Form>
  );
};
```

## 4. 페이지 로직 연결

`ManagementPage.tsx`에서 `handleCreate`, `handleUpdate` 함수를 수정합니다.
기존에는 수동으로 `formData` 상태를 참조했지만, 이제는 `handleSubmit`이 넘겨주는 `values`를 사용하면 됩니다.

```typescript
const handleCreate = (values: UserFormValues) => {
  // values는 이미 검증된 데이터입니다.
  userService.create(values);
};
```

## 5. Storybook 작성

새로 만든 컴포넌트들이 잘 동작하는지 문서화합니다.
`packages/after/src/stories` 디렉토리에 `Button.stories.tsx` 등을 생성합니다.

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/ui/button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};
```

## 6. 검증

1. `npm run dev`로 페이지가 정상 동작하는지 확인합니다.
2. `npm run storybook`으로 컴포넌트들이 잘 렌더링되는지 확인합니다.
