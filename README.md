# Natural Cycles Frontend Challenge – Countdown App

This is my solution to the Natural Cycles frontend challenge. The application is a responsive countdown timer built with Angular and TypeScript. Users can set a custom event name and end date, and the app will display the remaining time and event title using the full screen width with the largest possible font size in a single line.

## 🛠 Setup Instructions

To run the project locally:

```bash
npm install -g @angular/cli
npm install        # inside the project directory
ng serve           # inside the project directory
```

## 💡 Notes

- No unit or end-to-end tests were added. For production, adding tests (especially for date logic, font size adjustment and persistence) would improve reliability.
- Some accessibility improvements like proper ARIA roles and keyboard navigation can be considered.
- This solution achieves text scaling programmatically using JavaScript to calculate and apply the maximum possible font size. While there are CSS-based solutions for fluid typography (such as clamp() or viewport-relative units like vw), they do not fulfill the requirement of perfectly fitting text in one line without line breaks or overflow, as defined in the challenge. Therefore, a JavaScript-driven approach was necessary to match the design constraints — even though it's not the most optimized method for production performance.
