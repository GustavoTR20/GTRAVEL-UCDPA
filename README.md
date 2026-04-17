# GTRAVEL

---

## Description

GTRAVEL is a web based travel planning app developed as an academic project.  
It allows users to explore destinations, check weather forecasts and receive travel recommendations based on their chosen location, thereby making their trip easier and providing tips on the main tourist attractions in their chosen city.

---

## Features

- Destination selection interface  
- Dynamic rendering of destination cards  
- Weather forecast using Open-Meteo API  
- Travel recommendations based on destination data  
- Travel tips and useful information  
- Responsive design with Bootstrap  
- Client-side state management using localStorage  
- Dynamic DOM manipulation with JavaScript
- Component-based architecture using Astro (Layouts and reusable components)

---

## Technologies Used

- HTML 
- CSS  
- JavaScript  
- Bootstrap   
- Astro  
- Open-Meteo API  
- Git & GitHub  

---

## Project Structure

```bash
gustrip-astro/
│
├── public/
│   ├── images/
│   └── js/
│       ├── data.js
│       ├── script.js
│       └── result.js
│
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   └── Destinations.astro
│   │
│   ├── layouts/
│   │   └── MainLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   └── result.astro
│   │
│   └── css/
│       └── style.css
│
├── docs/
│   └── report.md
│
├── README.md
└── package.json
```

---

## GitHub Repository

https://github.com/GustavoTR20/GTRAVEL-UCDPA

---

## Live Website
The project is deployed using Render and can be accessed at:  
https://gtravel-ucdpa2.onrender.com

---

## How to Run Locally

1. Clone the repository:
```bash
git clone https://github.com/GustavoTR20/GTRAVEL-UCDPA
```

2. Navigate to the project folder:
```bash
cd gustrip-astro
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open in browser:
```
http://localhost:4321
```