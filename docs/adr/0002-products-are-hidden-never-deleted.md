# Products are hidden, never deleted

Bag lines are saved on customers' devices and refer to Products, and future orders will too, so deleting a Product would leave them pointing at nothing. Inventory therefore has no delete for Products: an Admin sets the Status to Hidden instead. For the same reason, a Product's slug is fixed when it is created (renaming doesn't change its URL), and Sizes and Options have stable IDs, so renaming one doesn't break existing Bag lines. A Category can be deleted only when no Products belong to it, Hidden ones included.

## Consequences

- Inventory's list grows over time. Hidden Products stay in it, marked as Hidden.
- A Bag line whose Product is Hidden or Sold out, or whose Size or Option was removed, is shown as an Unavailable Bag line rather than silently dropped.
