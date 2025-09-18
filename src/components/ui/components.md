# UI Components Documentation

This file documents each UI component in the `src/components/ui` folder, describing its purpose and providing a simple usage example.

---

## 1. Skeleton
**Purpose:** Placeholder loading skeleton for content.
**Example:**
```tsx
import { Skeleton } from '../ui/skeleton';
<Skeleton className="w-32 h-8" />
```

## 2. Table
**Purpose:** Accessible table components with styled subcomponents.
**Example:**
```tsx
import { Table, TableHeader, TableBody, TableRow, TableCell } from '../ui/table';
<Table>
  <TableHeader>...</TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Cell</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## 3. Textarea
**Purpose:** Styled textarea input.
**Example:**
```tsx
import { Textarea } from '../ui/textarea';
<Textarea placeholder="Type here..." />
```

## 4. Toaster
**Purpose:** Toast notification container.
**Example:**
```tsx
import { Toaster } from '../ui/toaster';
<Toaster />
```

## 5. Toggle
**Purpose:** Switch-like toggle button.
**Example:**
```tsx
import { Toggle } from '../ui/toggle';
<Toggle pressed={true} onPressedChange={fn}>Toggle</Toggle>
```

## 6. Tooltip
**Purpose:** Tooltip wrapper for hints and info.
**Example:**
```tsx
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>
```

## 7. ToggleGroup
**Purpose:** Group of toggle buttons.
**Example:**
```tsx
import { ToggleGroup } from '../ui/toggle-group';
<ToggleGroup type="single">...</ToggleGroup>
```

---

_Repeat for all other components in the folder as needed. Add more details and examples for each._
