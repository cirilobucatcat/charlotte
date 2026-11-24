# Charlotte

A pâtisserie's storefront and the Inventory its Admins use to manage what it sells.

## Catalogue

**Product**:
Anything the shop sells: a cake, a box of petits gâteaux, and later cupcakes or other sweets.
_Avoid_: cake (as the general term), item, treat, sweet

**Category**:
A group of Products shown together, such as Signature cakes or Petits gâteaux. Every Product belongs to exactly one.
_Avoid_: type, range, collection

**Tag**:
A mark for an occasion or dietary need (Birthdays, Weddings, Eggless, Gift boxes). A Product can have several. The list of Tags is fixed.
_Avoid_: label, filter

**Size**:
A way to buy a Product at its own price, with a detail line saying how much it is (6″ · Serves 6–8, Box of six).
_Avoid_: variant, SKU

**Choice group**:
A named set of Options on a Product (Sponge, Frosting). The customer picks exactly one, and it never changes the price.
_Avoid_: option set, modifier, add-on

**Option**:
One entry in a Choice group (Dark chocolate). Each Choice group has one default Option.
_Avoid_: variant, choice

**Notes**:
A Product's short line of three ingredients joined by middle dots ("Vanilla chiffon · strawberry · chantilly").
_Avoid_: subtitle, tagline

**Badge**:
A two- or three-word marker on a Product's arch ("Signature", "Eggless option"). A Product has at most one.

**Tint**:
The colour behind a Product's arch, one of strawberry, chocolate, lemon or pistachio.
_Avoid_: background, colour

**Sample price**:
A price that came with the starting Products and hasn't yet been confirmed as real.

## Inventory

**Inventory**:
The private area where Admins manage Products and Categories. It manages what is offered, not how many are left.
_Avoid_: admin panel, dashboard, back office, stock

**Admin**:
A person approved to sign in to Inventory. Every Admin can do everything.
_Avoid_: staff, user, owner

**Status**:
Whether customers can see and buy a Product: Available, Sold out or Hidden.
_Avoid_: state, visibility

**Available**:
The Status of a Product customers can see and add to their Bag.

**Sold out**:
The Status of a Product customers can see but not add to their Bag.
_Avoid_: out of stock, unavailable

**Hidden**:
The Status of a Product customers cannot see at all. New Products start Hidden, and a Product that is no longer sold is Hidden rather than deleted. A Category can also be hidden, which hides all its Products.
_Avoid_: deleted, archived, draft

## Bag

**Bag**:
The Products a customer intends to buy, kept on their own device until checkout.
_Avoid_: cart, basket

**Bag line**:
One Product in the Bag with its Size, Options, Message, date and quantity.
_Avoid_: cart item, line item

**Unavailable Bag line**:
A Bag line whose Product is now Sold out or Hidden, or whose Size or Option no longer exists. It can only be removed.
_Avoid_: expired line, invalid line

**Message**:
The personal message a customer asks for on a Product, offered only on Products that allow one.
_Avoid_: inscription, note
