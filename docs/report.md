# GTRAVEL

---

## 1. Project Overview

### What is the purpose of the project?
GTRAVEL is a web-based travel planning application developed as an academic project.  
Its main goal is to allow users to select a destination and receive personalized travel recommendations based on real-time weather data.

### What can the user do?
The user can select a destination, view weather forecasts, and receive activity suggestions and travel tips based on current conditions.

---

## 2. How the Features Were Implemented

### 2.1 Destination Selection

#### How does the destination selection work?
The destination selection is implemented using a `<select>` element in the `index.astro` page.  
The options are dynamically generated using JavaScript.

#### Where can this be seen in the code?
- `script.js` → `loadDestinations()`  
- `data.js` → `destinations` array  

#### How was it implemented?
The dropdown is populated dynamically by iterating over the destinations array and creating `<option>` elements.

#### What challenge was encountered?
Ensuring the DOM was fully loaded before rendering the options, solved using `DOMContentLoaded`.

### 2.2 Navigation Between Pages

#### How does navigation work?
The selected destination is saved in `localStorage`, and the user is redirected to the results page.

#### Where can this be seen?
- `script.js` → button click event  

#### Example:

jslocalStorage.setItem(STORAGE_KEY, dest.id);
window.location.href = "./result";

#### What problem was solved?

Initially, result.html caused a 404 error after deployment.
It was fixed by using Astro routing (./result).

### 2.3 Weather API Integration
#### How is weather data obtained?

Data is fetched from the Open-Meteo API.

#### Where can this be seen?
result.js → getWeather()

#### How was it implemented?
A fetch request is made using destination coordinates.

#### What challenge was encountered?
Mapping API data correctly to UI elements.

### 2.4 Recommendation System

#### How are recommendations generated?
Based on weather conditions.

#### Where can this be seen?
result.js

#### How was it implemented?
Rain → indoor activities
Dry → outdoor activities

### 2.5 Travel Tips

#### How do travel tips work?
Predefined in `data.js`.

#### Where can this be seen?
- `data.js` → `placesByCity`  
- `result.js` → `renderTips()`

#### How was it implemented?
Tips are selected dynamically based on weather conditions.

### Summary of Implementation
The implementation required multiple tests and adjustments, especially for routing and API integration, ensuring proper functionality both locally and after deployment.

---

## 3. Code Structure and Feature Location

### Where are the main pages?
- `index.astro`  
- `result.astro`  

### Where are the components?
- `Navbar.astro`  
- `Footer.astro`  
- `Destinations.astro`  

### Where is the logic?
- `data.js`  
- `script.js`  
- `result.js`  

---

## 4. JavaScript Design

### How is JavaScript organized?
The code is separated into:
- data (`data.js`)  
- interaction (`script.js`)  
- logic (`result.js`)  

### What is the application flow?
User → selection → localStorage → results page → API call → data rendering

## 5. Astro Components and Layouts

### How were components used?
Components were used to modularize the interface and improve code organization.

### What components were created?
- `MainLayout.astro`  
- `Navbar.astro`  
- `Footer.astro`  
- `Destinations.astro`  

### What are the advantages?
- Reusability  
- Cleaner structure  
- Easier maintenance  

---

## 6. CSS and Styling

### How is styling handled?
Bootstrap is used for layout and responsiveness, combined with custom CSS.

### Was BEM methodology used?
BEM was not fully implemented, but consistent naming conventions were followed.

---

## 7. Project Structure

### How is the project organized?
- `public/`: static files  
- `src/components`: reusable components  
- `src/layouts`: layouts  
- `src/pages`: pages  
- `docs/`: documentation  

### What is the advantage?
Improved organization and maintainability.

---

## 8. Deployment

### How was deployment done?
The project was deployed using Render.

### How does the process work?
Render connects to GitHub, runs the build process, and publishes the dist folder.

### Is the website live?
Yes, the application is accessible through a public URL.

---

## 9. Improvements After Feedback

### What improvements were made?
- Complete README  
- Functional deployment  
- Better project structure  
- Documentation added  
- Code comments improved  
- Bug fixes (routing and build issues)  
- More commits for version control practice  

---

## 10. Conclusion

### What was learned?
The project allowed the application of key concepts such as API integration, DOM manipulation, and modular development using Astro.

### What does the project demonstrate?
It demonstrates the ability to build a functional, structured, and well-documented web application, aligned with real-world development practices.