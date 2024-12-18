To run the Zap App use npm start.

Currently the application is configured to use the API hosted on brighton domains, if you want to run the API locally use XAMPP:

- Insert the zap-app folder in htdocs.
- Create database in phpMyAdmin (db1087_zap_app or zap_app)
- Import the .sql file to phpMyAdmin.
- Update the URL in sightingAPI.js to match localhost URL.
- Update database.php credentials to match local configurations.

Due to configurations required to deploy on Brighton Domains, serving a build locally does not work.

