# Habits

A simple, local first habit tracker for daily tracking. No frameworks, no build step, no backend.No frameworks, no build step, no backend, just plain HTML, CSS and JavaScript.

---

## Screenshots
<img width="735" height="1011" alt="Screenshot 2026-08-19 at 12 20 59 AM" src="https://github.com/user-attachments/assets/8992b72b-916a-4586-bcfc-967c0989a13a" />

<img width="700" height="930" alt="Screenshot 2026-08-19 at 12 21 34 AM" src="https://github.com/user-attachments/assets/0621eb91-7657-48e6-979e-afb2af26d320" />

<img width="709" height="952" alt="Screenshot 2026-08-19 at 12 21 47 AM" src="https://github.com/user-attachments/assets/9d97d0ac-3ecd-4814-8b44-956c72d9f65a" />

<img width="699" height="970" alt="Screenshot 2026-08-19 at 12 22 23 AM" src="https://github.com/user-attachments/assets/0185c62e-5d0d-45a5-8116-87d30858d344" />

<img width="706" height="1020" alt="Screenshot 2026-08-19 at 12 22 09 AM" src="https://github.com/user-attachments/assets/489b8b62-6ac6-4a2b-a607-84e1c062edb8" />

---

## Video Demo

https://github.com/user-attachments/assets/ee6686d5-8f32-4e3c-b9fb-60ddc178fcd0

## Some SS while i was cooking this web...
<img width="698" height="995" alt="Screenshot 2026-08-18 at 11 12 37 PM" src="https://github.com/user-attachments/assets/61edea28-b88b-4c0c-b45b-7fae5e980ab9" />
<img width="732" height="865" alt="Screenshot 2026-08-14 at 12 31 17 PM" src="https://github.com/user-attachments/assets/ddab7cb5-34e4-42d5-a08c-ba4d8f4e60b3" />
<img width="694" height="967" alt="Screenshot 2026-08-14 at 12 30 46 PM" src="https://github.com/user-attachments/assets/5fbd5152-3db3-4049-9ab5-b8fcf685ff58" />
<img width="714" height="882" alt="Screenshot 2026-08-14 at 6 11 09 PM" src="https://github.com/user-attachments/assets/5294d437-b03b-4535-9a5d-f4bf37c67f65" />
<img width="712" height="859" alt="Screenshot 2026-08-14 at 6 11 01 PM" src="https://github.com/user-attachments/assets/503e90ab-7206-4b17-9c8e-44b9b4c116d3" />
<img width="1026" height="1055" alt="Screenshot 2026-08-14 at 6 10 42 PM" src="https://github.com/user-attachments/assets/60710c68-5d8c-4d7d-b350-a6f866ab818f" />

---

## Features

- Enter a name in the box and press Enter or click the + button to add habits.
- Double click on a habit's name to edit the habit inline
- Hover the row to view the Delete button
- Daily check off – check off a habit for today and it will have a confetti pop when completed.
- Any habit that has a streak number will flash when it improves.
- **Current streak** — per-habit, current streak, and longest-ever streak (based on completion history)
- **Completion rate** - percentage of days that have passed since a habit was made since started.
- **Total habits** — the number of habits in general
- **Activity heatmap** - a graph of GitHub like style contribution made over the last for 6 months, colored by the percentage of habits performed on that day and with tooltips displaying the number of habits and the date performed.
- **Responsive layout** - collapses from 4 stats columns to 2 below 560px, delete buttons remain visible on touch.
- **Persistent** — all items are stored in `localStorage`, which means that your data is retained after a page refresh or browser restart.

---

## Getting started

No installation and no building step necessary.

Clone or download the repo.
2. Go to the index.html file and open it directly in the browser using the live Server ext...

---

## File structure
<img width="162" height="107" alt="Screenshot 2026-08-19 at 12 19 16 AM" src="https://github.com/user-attachments/assets/c570a3a4-bb4d-42f4-bad5-3680cc0866d7" />

---

### How are streaks & stats got calculated

Current streak: backwards day by day from today (or yesterday if it's not done yet) and counts consecutive completed days back until it reaches a gap.
- Longest streak: sorts all the completed dates and looks for the longest consecutive streak of calendar days (when the habit was followed) in the habit's history.
completion rate is the percentage of days that have passed since createdAt rounded to the nearest whole day.
the current streak and longest streak are shown as the best value for each habit, using Math.max; the completion rate is the average over all habits.

---

### Activity heatmap

- Refers to the previous 182 days, with the oldest on the left and today on the right.
the colour of each cell indicates the proportion of your habits that you completed that day (from level-0 to level-4):
  - 0% → level 0 (empty/dark)
  - up to 25% → level 1
  - up to 50% → level 2
  - up to 75% → level 3
  - up to 100% → level 4 (full accent green)
- days of the week are explicitly written with a 7-row CSS grid (one row per day), and weeks are written as columns, matching the convention on a contribution graph from GitHub. The first (partial) week can be blank at the top if it is not a Sunday the 182 days start, that's fine, not a bug.
A cell will display a tool tip when hovered over that will reveal the exact number of completions and the actual date.

Made By Baishuuu with 💖. Thanks Happy coding...
