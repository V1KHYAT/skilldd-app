# SKILLDD Premium App - Comprehensive Documentation

## Overview
SKILLDD Premium is a high-fidelity, interactive prototype mirroring a bespoke community guild application. Aimed at fostering local craft, sustainable scrap integration, and physical workshop attendance, SKILLDD allows users to discover local craftsmen, join physical classes, rent tools via a trusted network, and purchase locally upcycled goods.

The layout heavily uses a distinct visual language defined by dynamic animations, bold typography (`Inter` & `Space Grotesk`), deeply saturated accents (Neon Greens, Deep Blues, Pinks), and responsive layouts simulating a seamless modern iOS experience constrained within a dynamic `.app-container`.

---

## Global Navigation and States
The application's frame features high-end mobile-native detailing, including a simulated iOS black dynamic island and a persistent bottom frosted-glass navigation bar controlling routing instantly between the app’s 5 core domains.

### The Location Matrix System
Triggered via the **Location Pill** in the Feed, users can switch between 12 interconnected localities (Indiranagar, HSR Layout, Whitefield, etc.). 
- **Dynamic Rippling:** Changing this location universally impacts user statistics natively inside all routes.
- **Statistical Modifiers:** The feed’s live crowd counter, active scrap bins counter, tools nearby count, price modifiers on market items, user profile ranking, and active workshop titles are mathematically multiplied and instantly simulated depending on the chosen locale array structure. 

### Global Full-Page Detailed Overlay (The Expansion Flow)
Any interactive card component existing in the `Feed`, `Market`, or `Tools` list natively listens to a `data-action="expand-card"` behavior.
- **Micro-Interaction:** The action initiates a full `100vw/100vh` right-to-left UI slide overriding the screen context, visually replicating a seamless page transition onto an individualized Details Page. The back arrow button at the topmost left corner reliably reverses the transaction.
- **Data Hydration:** Information arrays actively fetch title, rating, customized item description strings extracted directly via `data-desc`, and matching CTA configurations duplicating natively into the overlay slots making rapid contextualization possible.

---

## Screen Architecture

### 1. The Feed Flow (`#screen-feed`)
The landing ground capturing the essence of the surrounding ecosystem.
- **Core Real Estate:** Location Selector and Sticky Omnibox Search.
- **Data Displays:** Dynamic stat blocks capturing crowd density (`feed-live-count`) and scrap activity (`feed-scrap-count`).
- **Rapid Navigation:** Primary `Check-In to Class` Call-to-Action routing users swiftly to the Live protocol dashboard.
- **Categorization List:** A horizontally sliding pill container letting users filter the feed explicitly (Micro-Electronics, Furniture Upcycle, etc.).
- **Guild Stacks:** An array of workshop/masterclass offerings presented via high-fidelity stacked cards.

### 2. The Live Action Flow (`#screen-live`)
This screen represents the interaction gateway between digital reservations and physical space interaction within SKILLDD hubs.
- **Identification Matrix:** Features a generating QR Code placeholder designated for secure entry handshakes at physical reception parameters.
- **Interaction Feedback:** Clicking the QR visually simulates an encryption rotate resetting the token stream. 
- **The Core Loop (Protocol Checklist):** A safety/interaction gamification logic loop forcing users to actively toggle mandatory physical constraints (e.g. *Wear Aprom, Visual Inspection*). The UI listens passively until complete logic flows fire the `READY FOR HANDSHAKE` clear prompt.
- **Tactile Assistance Button:** Floating card component inviting the user to dispatch immediate floor assistance, featuring micro-scale bounce animations simulating execution.

### 3. Tools Library Flow (`#screen-tools`)
A shared economy ecosystem allowing users to rent hardware off their neighbors affordably.
- **Surroundings Card:** Parses location state strings into the contextual `#tools-nearby-count`. 
- **View Controller:** A functional button affixed to the top-right corner allows instantaneous layout toggling overriding the CSS-flex structural lists into a two-column `.grid-view`.
- **Render Output:** Contains robust items explicitly appended with insurance/rating datasets tied to real-world addresses.
- **Interactions:** Dynamic "Request Tool" components affixed statically to the deep bottom of grid outputs (flexed with `margin-top: auto` sizing) to capture attention efficiently. Pushing the request simulates API fetch loaders rendering `.is-loading` before securing state changes.

### 4. Local Market Flow (`#screen-market`)
The dedicated digital storefront pushing community manufactured and upcycled art variants out.
- **Branding Header:** Follows the global visual aesthetics natively embedding a high-contrast Neon `TRENDING NOW` badge to distinguish inventory.
- **Visual Display Grid (`.normal-grid-aww`):** Uniform column grid optimizing portrait/landscape aspect ratio elements.
- **Interaction Modifiers:** Items inherently rely on "Reserve" or "Commission" action parameters that populate notification toasts signaling successful logic triggers. Visual uniformity guarantees all CTA’s naturally rest natively at cardinal bottoms.

### 5. Profile & Passport Flow (`#screen-passport`)
The gamified user ranking ecosystem.
- **Visual Loader Animations:** Renders a mathematical ring-tracker capturing global progress.
- **Ranking Systems:** Dynamic typography tracking real-time status multipliers identifying users via Top Percentiles per geographical sector logic (`#profile-rank-subtitle`).
- **Hours Element:** Animates linearly rendering integer iterations seamlessly from zero upon routing mount to lock onto aggregate clocked hours tracking.
- **Skills Array Logic:** Animates loading bar widths mapping out specific operational capacities matching mechanical or manual capabilities inside the shop framework.
- **Sleek Badges Matrix:** Distinct iconography rows documenting community prestige triggers validating user behavior seamlessly.

---

## Sub-Routine Functionality
- **Toast Notifications (`.toast-stack`):** Every dynamic user initiation triggers an un-intrusive floating ephemeral component to supply user satisfaction. It pushes visual success/error cues mimicking native phone interaction.
- **Developer Debug Hook:** Binding listener monitoring global `'N'` keyboard strokes to manually collapse layout bounds overriding the default hardware dimensions rendering the prototype container to expand seamlessly to full operational height (great for debug screenshots).
