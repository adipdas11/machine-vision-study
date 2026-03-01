# Machine Vision B31MV Study Companion

An interactive, responsive presentation application built for reviewing key questions and concepts for the Machine Vision (B31MV) course.

This study companion organizes core concepts into 4 main themes:

1. The Basics of Perception & Camera Models
2. Image Processing & Filtering
3. Feature Extraction & Matching
4. Machine Learning in Vision

## Access the App

You can view the live deployed application here:
**[Machine Vision B31MV Study Companion](https://adipdas11.github.io/machine-vision-study/)**

## Run Locally

**Prerequisites:** Node.js

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Configure AI Models (Optional):
   Set your `GEMINI_API_KEY` in `.env.local` to securely ping the Gemini API for any un-cached dynamic diagram generation (if needed in the future).

3. Run the development server:
   ```bash
   npm run dev
   ```

## Automatic Deployment

This project uses `gh-pages` for automated GitHub Pages hosting.
To build the application and deploy updates to the live site, simply execute the following command:

```bash
npm run deploy
```
