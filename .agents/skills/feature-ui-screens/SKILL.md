---
name: feature-ui-screens
description: Scaffolds the UI layer for a domain in brain-learning-center-dashboard-dashboard following the established list-table, form, and detail-screen patterns. Use when building a list screen with search/sort/filters/pagination, a create/edit form, a tabbed detail view, or table columns and row actions for a feature. Encodes the project's server-driven table, react-hook-form + zod, and tabbed detail-view conventions as copy-paste templates.
---

# feature-ui-screens

The UI counterpart to `feature-data-layer`. Once a domain's data layer exists (services + query/mutation hooks), this skill builds the screens that consume it, matching the conventions proven in `components/users/` and `hooks/users/`.

Prerequisite: the data layer is in place. If query/mutation hooks for the domain do not yet exist, run `feature-data-layer` first.

`users/` is the reference implementation (`AGENTS.md` -> Canonical Reference) — the most complete feature in the codebase, with list filters, create + update forms, role management, and a tabbed detail view with conditional tabs. Mirror it. Do not invent a new screen shape.

---

## What gets built

A feature has up to three screens. Build only the ones the feature needs.

```
List screen     page.tsx -> <DomainListView>  (search + filters + table + pagination)
Form screen     page.tsx -> <DomainUpdateForm> / <DomainCreateForm> driven by a use<Domain>*Form hook
Detail screen   page.tsx -> <DomainDetailView> -> resource gate -> content (header + tabs)
```

Pages compose only (<= 80 lines, `AGENTS.md`). All state and logic live in hooks. Components are JSX + handler wiring. A list component never calls a service; it calls the query hook from the data layer.

---

## Non-negotiable invariants

1. **Pages are Server Components.** They `setRequestLocale`, fetch translations with `getTranslations` (when they render copy), and render the view component. A list page also renders a `<PageHeader>`. No `"use client"` on a page.
2. **View/form/tab components are `"use client"`.** Columns files (`get<Domain>Columns`) are plain modules, not client components themselves.
3. **List state goes through `useTableQueryState` + `useServerDataTable`.** Never hand-roll pagination, sorting, or search params. Search is gated by `SEARCH_MIN_LENGTH` before it reaches the query. Filters live in a separate nuqs-backed `use<Domain>Filters` hook.
4. **Columns are produced by a `get<Domain>Columns(params)` factory**, memoized in the view with `useMemo`. Headers use `DataTableColumnHeader`; empty cells fall back to a muted `-`; dates go through `formatDateTime(value, locale)`; status uses `StatusBadge` + the domain's `*_STATUS_CONFIG`.
5. **Forms use `react-hook-form` + the project `zodResolver` + shared field primitives.** Never a raw `<input>`. The form component wraps fields in `<FormProvider>`; all submit/validation logic lives in a `use<Domain>*Form` hook that returns `{ form, onSubmit }`.
6. **Form errors flow through `useFormErrorHandler`.** The hook's `onSubmit` does `try { await mutation.mutateAsync(...) } catch (error) { handleError(error) }`, and toasts success. Field-level API errors map back onto the form via `setError`. Optional string fields are normalized to `undefined` (or `null` where the API clears a value) before sending.
7. **Validation schemas are factory functions `(t, ...args) => z.object(...)`** in `lib/validations/<domain>.ts`, memoized in the form hook with `useMemo`. Messages come from `next-intl`, lengths/patterns from `constants/`.
8. **Every label is translated.** Column labels, field labels, statuses, tab labels, empty states, toasts. Add keys to **both** `messages/en.json` and `messages/ar.json`, then run `i18n-sync`. No hardcoded UI strings.
9. **Detail screens guard the resource, then compose a header + tabs.** The view delegates to a `<DomainResourceGate id>` that handles loading/error/not-found and passes the loaded entity to a render prop. The content renders a shared `<DetailHeader>` (back link, title, status, actions) above `<DetailTabs>`, whose tab array is built by a `use<Domain>DetailTabs` hook returning `DetailTab[]`. Tabs may be conditional on the entity (the user addresses tab is customer-only).

---

## Templates

Replace `Domain`/`domain`/`domains`. Examples scaffold a `promotion` domain. Strip lines the feature does not need.

### List screen

#### `app/[locale]/dashboard/promotions/page.tsx`

```tsx
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PromotionsListView } from "@/components/promotions/promotions-list-view";
import { PageHeader } from "@/components/shared/page-header";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function PromotionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Dashboard.promotions");

  return (
    <>
      <PageHeader description={t("subtitle")} title={t("title")} />
      <PromotionsListView />
    </>
  );
}
```

#### `components/promotions/promotions-list-view.tsx`

Mirror `users-list-view.tsx`. The skeleton:

```tsx
"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";

import { DataTableSearch } from "@/components/shared/data-table/data-table-search";
import { DataTableViewOptions } from "@/components/shared/data-table/data-table-view-options";
import { ServerDataTable } from "@/components/shared/data-table/server-data-table";
import { ServerDataTablePagination } from "@/components/shared/data-table/server-data-table-pagination";
import { SEARCH_MIN_LENGTH } from "@/constants/data-table";
import { usePromotionColumnLabels } from "@/hooks/promotions/use-promotion-column-labels";
import { usePromotionsQuery } from "@/hooks/promotions/use-promotions-query";
import { useServerDataTable } from "@/hooks/shared/use-server-data-table";
import { useTableQueryState } from "@/hooks/shared/use-table-query-state";
import {
  PROMOTION_SORT_FIELDS,
  type Promotion,
  type PromotionListQuery,
} from "@/types/promotion";

import { getPromotionColumns } from "./promotion-columns";

const EMPTY_PROMOTIONS: Promotion[] = [];

export function PromotionsListView() {
  const t = useTranslations("Dashboard.promotions");
  const tTable = useTranslations("Dashboard.table");
  const locale = useLocale();

  const queryState = useTableQueryState({
    sortFields: PROMOTION_SORT_FIELDS,
    defaultSortBy: "createdAt",
    defaultSortOrder: "desc",
  });

  const listQuery: PromotionListQuery = {
    page: queryState.page,
    limit: queryState.limit,
    sortBy: queryState.sortBy,
    sortOrder: queryState.sortOrder,
    search:
      queryState.search.length >= SEARCH_MIN_LENGTH
        ? queryState.search
        : undefined,
  };

  const { data, isLoading, isError, isFetching, refetch } =
    usePromotionsQuery(listQuery);
  const { columnLabels, statusLabels } = usePromotionColumnLabels();

  const columns = useMemo(
    () => getPromotionColumns({ columnLabels, statusLabels, locale }),
    [columnLabels, statusLabels, locale]
  );

  const table = useServerDataTable({
    data: data?.items ?? EMPTY_PROMOTIONS,
    columns,
    pageCount: data?.meta.totalPages ?? 0,
    page: queryState.page,
    limit: queryState.limit,
    sortBy: queryState.sortBy,
    sortOrder: queryState.sortOrder,
    setPage: queryState.setPage,
    setLimit: queryState.setLimit,
    setSort: queryState.setSort,
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <DataTableSearch
          defaultValue={queryState.search}
          onSearch={queryState.setSearch}
          placeholder={t("searchPlaceholder")}
        />
        <DataTableViewOptions labels={columnLabels} table={table} />
      </div>
      <ServerDataTable
        emptyState={{
          title: t("empty.title"),
          description: t("empty.description"),
        }}
        errorDescription={tTable("errorDescription")}
        errorTitle={tTable("errorTitle")}
        interactiveRows
        isError={isError}
        isLoading={isLoading}
        onRetry={() => {
          refetch();
        }}
        retryLabel={tTable("retry")}
        table={table}
      />
      <ServerDataTablePagination
        isFetching={isFetching}
        limit={queryState.limit}
        onLimitChange={queryState.setLimit}
        onPageChange={queryState.setPage}
        page={queryState.page}
        total={data?.meta.total ?? 0}
        totalPages={data?.meta.totalPages ?? 0}
      />
    </div>
  );
}
```

If the list needs filters (status, role, type, etc.), add a nuqs-backed `use<Domain>Filters` hook and a `<DomainTableFilters>` component rendered next to `DataTableViewOptions`, then fold the filter values into `listQuery`. Mirror `hooks/users/use-user-filters.ts` + `components/users/user-table-filters.tsx`. The `users-list-view.tsx` reference shows the wired-up version with both search and filters.

#### `components/promotions/promotion-columns.tsx`

A `get<Domain>Columns(params)` factory returning `ColumnDef<Domain>[]`. Use `DataTableColumnHeader` for headers, local `EmptyValue`/`withFallback` helpers for nullable cells, `StatusBadge` for status, `formatDateTime(value, locale)` for dates, and a trailing `actions` column wrapping `<DomainRowActions>` in `<div className="relative z-10 flex justify-end">`. Copy `user-columns.tsx` and swap fields. The first column's primary link uses `className="after:absolute after:inset-0 hover:underline"` so the whole row is clickable.

#### `hooks/promotions/use-promotion-column-labels.ts`

Maps column + status keys through `next-intl`, iterating the `*_STATUSES` tuple for status labels. Copy `use-user-column-labels.ts`.

### Form screen

`users/` has both a create and an update form. Use the update form for editing an existing entity; use the create form when the screen also sets fields that only exist at creation (e.g. password, initial roles).

#### `lib/validations/promotions.ts`

```ts
import { z } from "zod";

import {
  PROMOTION_NAME_MAX_LENGTH,
  PROMOTION_NAME_MIN_LENGTH,
} from "@/constants/promotions";

type Translate = (
  key: string,
  values?: Record<string, string | number>
) => string;

export const updatePromotionSchema = (t: Translate) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(PROMOTION_NAME_MIN_LENGTH, t("nameMin", { min: PROMOTION_NAME_MIN_LENGTH }))
      .max(PROMOTION_NAME_MAX_LENGTH, t("nameMax", { max: PROMOTION_NAME_MAX_LENGTH })),
  });
```

#### `hooks/promotions/use-promotion-update-form.ts`

```ts
"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useUpdatePromotionMutation } from "@/hooks/promotions/mutations/use-update-promotion-mutation";
import { useFormErrorHandler } from "@/hooks/shared/use-form-error-handler";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@/lib/forms/zod-resolver";
import { updatePromotionSchema } from "@/lib/validations/promotions";
import type { Promotion, PromotionFormValues } from "@/types/promotion";

export function usePromotionUpdateForm(promotion: Promotion) {
  const tValidation = useTranslations("Dashboard.promotions.validation");
  const tToast = useTranslations("Dashboard.promotions.toast");
  const router = useRouter();
  const mutation = useUpdatePromotionMutation(promotion.id);

  const schema = useMemo(() => updatePromotionSchema(tValidation), [tValidation]);
  const form = useForm<PromotionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: promotion.name ?? "" },
  });
  const handleError = useFormErrorHandler(form.setError);

  const onSubmit = async (values: PromotionFormValues) => {
    try {
      await mutation.mutateAsync({ name: values.name.trim() });
      toast.success(tToast("updated"));
      router.push(DASHBOARD_ROUTES.promotionDetail(promotion.id));
    } catch (error) {
      handleError(error);
    }
  };

  return { form, onSubmit };
}
```

#### `components/promotions/promotion-update-form.tsx`

Wrap fields in `<Card><CardContent><FormProvider {...form}><form noValidate onSubmit={form.handleSubmit(onSubmit)}>`. Use shared field primitives (`TextField`, `PhoneField`, etc. from `components/shared/form/` and `components/auth/fields/`), never raw inputs. End with a `<FieldGroup>`-wrapped cancel `<Button asChild type="button" variant="outline">` (a `<Link>` child — see `[[radix-slot-button-aschild]]`: `asChild` cannot wrap the Button for trigger components, but a `<Link>` child here is fine) + submit `<Button disabled={isSubmitting}>` showing a `<Spinner>` while submitting. Copy `user-update-form.tsx`.

For a **create** form with extra fields (password, status, role assignment), mirror `components/users/user-create-form.tsx` + `hooks/users/use-user-create-form.ts`. It adds a status select and a `roleIds` checkbox group, maps empty strings to `undefined` in the payload, and routes to the new entity's detail page on success.

### Detail screen

The detail screen is three layers: a **view** that guards the resource, **content** that lays out a header + tabs, and a **tabs hook** that assembles the tab list. Mirror `user-detail-view.tsx`, `user-detail-content.tsx`, and `use-user-detail-tabs.tsx`.

#### `components/promotions/promotion-detail-view.tsx`

```tsx
"use client";

import { DASHBOARD_ROUTES } from "@/constants/routes";
import { useRouter } from "@/i18n/navigation";

import { PromotionDetailContent } from "./promotion-detail-content";
import { PromotionResourceGate } from "./promotion-resource-gate";

interface Props {
  id: string;
}

export function PromotionDetailView({ id }: Props) {
  const router = useRouter();

  return (
    <PromotionResourceGate id={id}>
      {(promotion) => (
        <PromotionDetailContent
          onDeleted={() => router.push(DASHBOARD_ROUTES.promotions)}
          promotion={promotion}
        />
      )}
    </PromotionResourceGate>
  );
}
```

The resource gate calls `use<Domain>Query(id)` and renders the loading skeleton while pending, an error state on failure, and `children(entity)` on success.

#### `components/promotions/promotion-detail-content.tsx`

Renders `<DetailHeader>` (back link, title, status, an edit `<Button asChild>` + `<DomainRowActions>` in `meta`) above `<DetailTabs tabs={tabs} />`. The tabs come from the hook below. Copy `user-detail-content.tsx`.

#### `hooks/promotions/use-promotion-detail-tabs.tsx`

Builds the `DetailTab[]` array, memoized. Each tab has `value`, `label` (translated), `icon` (hugeicons), and `content` (a panel component). Push conditional tabs inside the `useMemo` based on the entity. This file is `.tsx` because it returns JSX in `content`.

```tsx
"use client";

import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

import type { DetailTab } from "@/components/shared/detail-tabs";
import { PromotionInfoTab } from "@/components/promotions/promotion-info-tab";
import type { Promotion } from "@/types/promotion";

export function usePromotionDetailTabs(promotion: Promotion): DetailTab[] {
  const t = useTranslations("Dashboard.promotions.detail.tabs");

  return useMemo(() => {
    const tabs: DetailTab[] = [
      {
        value: "info",
        label: t("info"),
        icon: InformationCircleIcon,
        content: <PromotionInfoTab promotion={promotion} />,
      },
    ];

    // Conditional tabs go here, e.g.:
    // if (promotion.kind === "SCHEDULED") {
    //   tabs.push({ value: "schedule", label: t("schedule"), icon: Calendar01Icon,
    //     content: <PromotionSchedulePanel promotion={promotion} /> });
    // }

    return tabs;
  }, [promotion, t]);
}
```

Reusable cross-feature panels already exist and take only an id: `ActivityLogsPanel` (`userId`), `CustomerAddressesPanel` (customer-only), `WalletPanel`. Reuse them in a tab rather than rebuilding. `use-user-detail-tabs.tsx` is the canonical example of mixing entity-specific and shared panels with a conditional tab.

#### `components/promotions/promotion-info-tab.tsx`

A presentational panel rendering the entity's fields (label/value pairs in `<Card>`s). Copy `user-info-tab.tsx`.

#### `components/promotions/promotion-detail-skeleton.tsx`

A plain Server Component built from `<Card>` + `<Skeleton>` blocks mirroring the content layout. Copy `user-detail-skeleton.tsx`.

---

## Build order

1. Confirm the data layer exists (`feature-data-layer`).
2. Validation schema -> form hook -> form component (if the feature has a form). Add a create variant only if creation needs fields the update form lacks.
3. Column labels hook -> columns factory -> (filters hook + filters component, if needed) -> list view -> list page.
4. Resource gate -> skeleton -> tab panels -> detail tabs hook -> detail content (header + tabs) -> detail view -> detail page.
5. Add all message keys to `messages/en.json` and `messages/ar.json`, then run `i18n-sync`.

---

## Verify before finishing

```bash
pnpm typecheck && pnpm lint
```

Then check against the invariants, plus:
- No hardcoded UI strings in `components/<domain>/` (every label is a `t(...)` call).
- No raw `<input>` / `<select>` in form components (use shared field primitives).
- Pages stay under 80 lines and carry no `"use client"`.
- The detail tabs hook is `.tsx` (it returns JSX) and every tab label is translated.
- Run `i18n-sync` to confirm en/ar parity.
