# Austalian Places Quiz

A web game which involves naming as many places as possible in Australia.

[Live Demo](https://ausplacesquiz.netlify.app/) (hosted with Netlify)

## Tech Stack
- Vue
- Tailwind CSS and daisyUI
- Supabase

## Setup
1. `git clone https://github.com/omackenzie/ausplacesquiz`
2. Create a Supabase project and a table named 'results'
3. Create columns in the results table with the below format:
![Columns](https://user-images.githubusercontent.com/30273552/211772525-10166943-5def-40de-841d-5b6743e6ec77.png)
4. Rename the .env.template file to .env and set the environment variables for your Supabase configuration
5. In the frontend directory run `npm run install`

## Running
- To run the project, use the command `npm run dev` in the frontend directory
- To run the tests, use `npm run test:unit`

## Credits

This project is based on Ian Fisher's https://cityquiz.io/