# Information:
- git repo: https://github.com/SaiJie-HT/AniLogger#
- HT's AniLogger:
	- Name: AniLogger
    - Type: Website
    - Description: A website. Users catalogue anime on an interactive database. cataloguing watch status, rating, comments, watch date, seasons watched, along with interests in other derivatives (manga, lightnovels)
	- Main features: User Login, Anime data entry, editing, and removal, styled & interactive frontend
    - Tech Stack: Node.js, Express.js, React + Vite, Supabase + Postgres.

# How to run AniLogger:

1) Clone the Repo by SSH
- Run In Terminal:`git clone git@github.com:SaiJie-HT/AniLogger.git`

2) Download dependencies for frontend & backend folders
- Run in Terminal:`git npm install`

3) Add .env file submitted on BrightSpace to backend folder
- In the submission on BrightSpace, I've attached the .env file for the backend to run.

4) Run both the backend & frontend
- On the backend: `npm start`
- On the frontend: `npm run dev`

**AniLogger Is now connected and up and running**

# Aspects to Note:

- Must create an account to use AniLogger
	- If you wish not to reveal your email, use Temp-mail to create an account: https://temp-mail.org/en/
- The "Edit" button in the "Entry Actions" field will create reveal a update form at the top of the page (on top of the table)
	- This is to resolve confusion when there exists a table with a lot of entries.
- To create a new entry and adding new global anime
	- refer to reference table for anime Id for the new entry form
	- refer to reference table to check if anime already exists in the global anime dataset
- Global Anime ("Add New Anime To Database")
	- Each user has their own dedicated saved list, it is not shared
	- There exists a global anime list that is accessible to all users for reference
	- Any user can add a new Anime to the global list (simply enter a name)
- The backend may break a couple weeks after the semester (after final grade submission deadline) officially ends.
	- As I will be deleting relevant accounts and connections needed by the database. This likely will break the backend.
