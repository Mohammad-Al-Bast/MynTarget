---
name: feature-data-layer
description: Scaffolds the data layer for a new domain in brain-learning-center-dashboard-dashboard following the established service + query-key + query/mutation hook pattern. Use when adding a new API-backed feature, wiring a new endpoint into React Query, or extending an existing domain with a new query or mutation. Encodes the project's TanStack Query and axios service conventions as copy-paste templates.
---

# feature-data-layer

Generative counterpart to `arch-review`. Where `arch-review` audits structure after the fact, this skill produces the data layer correctly the first time, matching the conventions already proven in `services/users.service.ts` and `hooks/users/`.

Use this whenever a feature needs to read from or write to the API. Do not hand-reconstruct the pattern from memory and do not import a generic TanStack Query example. The templates below are the project's contract.

---

## The layer order

A domain's data layer is always built bottom-up in this order. Each file has one home (see `AGENTS.md` -> code-architecture-rules). Never skip a layer or collapse two into one.

```
types/<domain>.ts                         Entity, list query, request payloads
constants/api.ts                          Endpoint constants (append a block)
constants/query-keys.ts                   Key factory (append a block)
services/<domain>.service.ts              axios calls, no React
hooks/<domain>/use-<domain>s-query.ts     list query hook
hooks/<domain>/use-<domain>-query.ts      detail query hook
hooks/<domain>/mutations/use-*-mutation.ts  one file per mutation concern
```

Build types first, services next, hooks last. A hook never references an endpoint string or calls axios directly; it goes through the service. A component never imports a service; it goes through a hook.

---

## Non-negotiable invariants

These are what make the layer consistent. An agent that gets the file structure right but breaks these has still failed review.

1. **Every hook file starts with `"use client"`.** Services and constants never do.
2. **Query keys come only from the factory in `constants/query-keys.ts`.** Never inline an array literal as a `queryKey`. The factory shape is always `all` -> `lists()` -> `list(query)` -> `details()` -> `detail(id)`, spreading the parent at each level.
3. **List queries use `placeholderData: keepPreviousData`.** Detail queries do not.
4. **Mutations resolve the cache, they do not refetch blindly.**
   - An update that returns the entity calls `setQueryData(detail(id), entity)` then `invalidateQueries({ queryKey: keys.lists() })`.
   - A status transition or delete that the response cannot fully describe calls `invalidateQueries({ queryKey: keys.all })`.
5. **User-facing mutations own their feedback.** Mutations triggered from a menu/button (status changes, delete) handle `onError` with `resolveErrorMessage(error, tErrors)` + `toast.error`, and `onSuccess` with `toast.success`. Form-submit mutations stay silent and let the form's error handler surface failures (see `hooks/shared/use-form-error-handler.ts`).
6. **Services return domain data, never the axios envelope.** Always go through the `apiGet` / `apiGetPaginated` / `apiPatch` / `apiPost` / `apiDeleteNoContent` helpers in `lib/api/request.ts` — they unwrap `ApiSuccess<T>` and normalize errors. Never call `client` directly.
7. **Types live in `types/<domain>.ts`.** Status unions use the `const tuple + (typeof T)[number]` pattern so they are iterable. Never inline a request/response shape at the call site.

---

## Templates

Replace `Domain`/`domain`/`domains` (PascalCase entity / camelCase singular / plural). Examples below scaffold a `promotion` domain. Delete the lines a given domain does not need; do not add lines the pattern does not call for.

### 1. `types/<domain>.ts`

```ts
import type { SortOrder } from "@/types/api";

export const PROMOTION_STATUSES = ["ACTIVE", "EXPIRED", "SCHEDULED"] as const;

export type PromotionStatus = (typeof PROMOTION_STATUSES)[number];

export const PROMOTION_SORT_FIELDS = ["createdAt", "name"] as const;

export type PromotionSortField = (typeof PROMOTION_SORT_FIELDS)[number];

export interface Promotion {
  createdAt: string;
  id: string;
  name: string;
  status: PromotionStatus;
  updatedAt: string;
}

export interface PromotionListQuery {
  limit: number;
  page: number;
  search?: string;
  sortBy: PromotionSortField;
  sortOrder: SortOrder;
  status?: PromotionStatus;
}

export interface CreatePromotionRequest {
  name: string;
}

export interface UpdatePromotionRequest {
  name?: string;
}
```

### 2. `constants/api.ts` — append a block

```ts
const DASHBOARD_PROMOTIONS_BASE = "/api/v1/dashboard/promotions";

export const DASHBOARD_PROMOTIONS_ENDPOINTS = {
  list: DASHBOARD_PROMOTIONS_BASE,
  detail: (id: string) => `${DASHBOARD_PROMOTIONS_BASE}/${id}`,
} as const;
```

### 3. `constants/query-keys.ts` — append a block

```ts
export const promotionKeys = {
  all: ["promotions"] as const,
  lists: () => [...promotionKeys.all, "list"] as const,
  list: (query: PromotionListQuery) =>
    [...promotionKeys.lists(), query] as const,
  details: () => [...promotionKeys.all, "detail"] as const,
  detail: (id: string) => [...promotionKeys.details(), id] as const,
};
```

Nested resources extend the parent's `detail`, matching `restaurantKeys.branches` and `branchKeys.itemOverrides`:

```ts
  branches: (restaurantId: string) =>
    [...restaurantKeys.detail(restaurantId), "branches"] as const,
```

### 4. `services/<domain>.service.ts`

```ts
import { DASHBOARD_PROMOTIONS_ENDPOINTS } from "@/constants/api";
import {
  apiDeleteNoContent,
  apiGet,
  apiGetPaginated,
  apiPatch,
  apiPost,
} from "@/lib/api/request";
import type {
  CreatePromotionRequest,
  Promotion,
  PromotionListQuery,
  UpdatePromotionRequest,
} from "@/types/promotion";

export function getPromotions(query: PromotionListQuery) {
  return apiGetPaginated<Promotion>(DASHBOARD_PROMOTIONS_ENDPOINTS.list, {
    params: query,
  });
}

export function getPromotionById(id: string) {
  return apiGet<Promotion>(DASHBOARD_PROMOTIONS_ENDPOINTS.detail(id));
}

export function createPromotion(payload: CreatePromotionRequest) {
  return apiPost<Promotion, CreatePromotionRequest>(
    DASHBOARD_PROMOTIONS_ENDPOINTS.list,
    payload
  );
}

export function updatePromotion(id: string, payload: UpdatePromotionRequest) {
  return apiPatch<Promotion, UpdatePromotionRequest>(
    DASHBOARD_PROMOTIONS_ENDPOINTS.detail(id),
    payload
  );
}

export function deletePromotion(id: string) {
  return apiDeleteNoContent(DASHBOARD_PROMOTIONS_ENDPOINTS.detail(id));
}
```

### 5. List query hook — `hooks/<domain>/use-<domain>s-query.ts`

```ts
"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { promotionKeys } from "@/constants/query-keys";
import { getPromotions } from "@/services/promotions.service";
import type { PromotionListQuery } from "@/types/promotion";

export function usePromotionsQuery(query: PromotionListQuery) {
  return useQuery({
    queryKey: promotionKeys.list(query),
    queryFn: () => getPromotions(query),
    placeholderData: keepPreviousData,
  });
}
```

### 6. Detail query hook — `hooks/<domain>/use-<domain>-query.ts`

```ts
"use client";

import { useQuery } from "@tanstack/react-query";

import { promotionKeys } from "@/constants/query-keys";
import { getPromotionById } from "@/services/promotions.service";

export function usePromotionQuery(id: string) {
  return useQuery({
    queryKey: promotionKeys.detail(id),
    queryFn: () => getPromotionById(id),
  });
}
```

### 7a. Form-submit mutation — `hooks/<domain>/mutations/use-update-<domain>-mutation.ts`

Silent on error; the caller's form error handler surfaces failures. Resolves the cache rather than refetching.

```ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { promotionKeys } from "@/constants/query-keys";
import { updatePromotion } from "@/services/promotions.service";
import type { Promotion, UpdatePromotionRequest } from "@/types/promotion";

export function useUpdatePromotionMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePromotionRequest) => updatePromotion(id, payload),
    onSuccess: (promotion: Promotion) => {
      queryClient.setQueryData(promotionKeys.detail(id), promotion);
      queryClient.invalidateQueries({ queryKey: promotionKeys.lists() });
    },
  });
}
```

### 7b. Action mutation — `hooks/<domain>/mutations/use-<domain>-action-mutation.ts`

For status transitions / delete fired from a menu. Owns its toasts. When several actions share one shape, dispatch through a `Record` keyed by the action union (see `useUserActionMutation`).

```ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { promotionKeys } from "@/constants/query-keys";
import { resolveErrorMessage } from "@/lib/api/resolve-error";
import { deletePromotion } from "@/services/promotions.service";

export function useDeletePromotionMutation() {
  const queryClient = useQueryClient();
  const t = useTranslations("Dashboard.promotions.actions");
  const tErrors = useTranslations("Common.errors");

  return useMutation({
    mutationFn: (id: string) => deletePromotion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: promotionKeys.all });
      toast.success(t("deleteSuccess"));
    },
    onError: (error) => toast.error(resolveErrorMessage(error, tErrors)),
  });
}
```

---

## Choosing the right invalidation

| Mutation | Cache action |
|---|---|
| Update returning the full entity | `setQueryData(detail(id), entity)` + `invalidateQueries(lists())` |
| Create | `invalidateQueries(lists())` |
| Status transition (approve/suspend/...) | `invalidateQueries(all)` |
| Delete | `invalidateQueries(all)` |

When in doubt between `lists()` and `all`, prefer the narrowest key that still reflects the change. Reach for `all` only when a detail cache could also be stale.

---

## i18n and table wiring (when the feature has a list UI)

The data layer above is complete on its own. A list-screen feature also needs, in this order, following the `users/` reference:

- A `use-<domain>-column-labels.ts` hook that maps column + status keys through `next-intl` (`useUserColumnLabels` is the template). Status labels iterate the `*_STATUSES` tuple.
- Message keys added to **both** `messages/en.json` and `messages/ar.json` — run the `i18n-sync` skill after to catch drift.
- Table state via `hooks/shared/use-table-query-state.ts` + `use-server-data-table.ts` (nuqs-driven). Do not introduce a parallel pagination scheme.

Keep these out of the data-layer commit if you are committing incrementally — data layer first, UI second (see `AGENTS.md` -> git-rules, atomic commits).

---

## Verify before finishing

```bash
pnpm typecheck && pnpm lint
```

Then sanity-check against the invariants list above. If a new query key was added, grep for any stray inline `queryKey: [` literals in the new hooks — there should be none.

```bash
grep -rn "queryKey: \[" hooks/<domain>/
```
