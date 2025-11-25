# React Ref와 타입 완벽 가이드 📘

shadcn/ui나 Radix UI 같은 라이브러리 소스 코드를 보면 자주 등장하는 `forwardRef`, `ElementRef`, `ComponentPropsWithoutRef`.
도대체 이게 뭐고 왜 쓰는 걸까요? 아주 쉽게 정리해드립니다!

---

## 1. `forwardRef`: "Ref를 전달해줘!" 🚚

### 상황

부모 컴포넌트가 자식 컴포넌트의 **특정 DOM 요소(예: input)**에 직접 접근하고 싶을 때가 있습니다. (포커스 주기, 스크롤 이동 등)

### 문제

React 컴포넌트는 기본적으로 `ref`라는 prop을 받지 못합니다. 그냥 무시해버리죠.

### 해결: `forwardRef`

"나(`MyInput`)한테 `ref`를 주면, 내가 내부에 있는 진짜 `<input>` 태그한테 전달해줄게!" 라고 약속하는 것입니다.

```typescript
// 1. forwardRef로 감싸기
const MyInput = React.forwardRef((props, ref) => {
  // 2. 받은 ref를 진짜 DOM 요소에 연결
  return <input ref={ref} {...props} />;
});

// 사용
<MyInput ref={inputRef} /> // 이제 부모가 inputRef로 <input>을 조작 가능!
```

---

## 2. 마법의 타입 도구들 🪄

TypeScript로 `forwardRef`를 쓸 때, 타입을 일일이 적는 건 너무 귀찮습니다.
React는 **"원본 컴포넌트의 타입을 그대로 베껴오는"** 도구들을 제공합니다.

### ① `React.ComponentPropsWithoutRef<T>`

> "T 컴포넌트가 받는 **모든 속성(Props)**을 가져와! (단, ref는 빼고)"

- **왜 쓰나요?**: 우리가 만든 컴포넌트가 원본(예: `<button>`)이랑 똑같은 기능을 하려면, `onClick`, `disabled`, `className` 같은 수많은 속성을 다 받아야 합니다. 이걸 일일이 타이핑하지 않고 **한방에 복사**해오는 겁니다.
- **WithoutRef인 이유**: `ref`는 `forwardRef`에서 따로 처리하니까, Props 목록에서는 제외해야 충돌이 안 납니다.

### ② `React.ElementRef<T>`

> "T 컴포넌트에 ref를 걸면, **실제로 어떤 HTML 태그**가 잡히는지 알려줘!"

- **왜 쓰나요?**: `ref`의 타입을 정확히 알아야 하기 때문입니다.
  - `<button>` -> `HTMLButtonElement`
  - `<div>` -> `HTMLDivElement`
- **장점**: 원본 컴포넌트가 내부적으로 태그를 바꿔도, 우리는 코드를 수정할 필요가 없습니다. (자동 동기화)

---

## 3. 실전 예제 (shadcn/ui 스타일) 🚀

이 코드를 이제 해석할 수 있습니다!

```typescript
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,      // ① Ref 타입 (자동)
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> // ② Props 타입 (자동)
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Content
    ref={ref} // ③ Ref 전달
    className={cn("...", className)}
    {...props} // ④ 나머지 Props 전달
  />
))
```

**한 줄 요약:**

> "나는 `DialogPrimitive.Content`를 감싸는 껍데기야.
> **Ref 타입**도 걔랑 똑같이 하고, **Props**도 걔랑 똑같이 받을게!"

이제 라이브러리 소스 코드가 무섭지 않죠? 😎
