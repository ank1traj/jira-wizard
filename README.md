# Jira Wizard - Frontend

Jira Wizard is a web application built with Gatsby that helps in creating bulk Jira issues by uploading CSV or JSON files. It provides an intuitive interface for managing and automating the process of importing and creating Jira issues from external data sources.

## Features

- Upload CSV or JSON files containing issue data
- Map file fields to Jira issue fields
- Preview imported data before creating issues
- Handle errors and warnings during the import process
- Monitor progress and status of issue creation
- Responsive design for seamless usage on desktop and mobile devices

## Demo

You can try out the Jira Wizard application by visiting the live demo [here](https://jira-wizard.vercel.app).

Please note that the demo is for testing purposes only, and the created issues will not be persisted in an actual Jira instance.

## Installation

To set up and run the Jira Wizard frontend locally, follow these steps:

1. Clone the repository: git clone https://github.com/ank1traj/jira-wizard.git
2. Install the dependencies: npm install
3. Install the dependencies: npm install
4. Start the development server: npm start

The application should now be running locally at `http://localhost:8000`.

## Usage

1. Access the Jira Wizard application in your web browser at `http://localhost:8000`.
2. Login with Jira domain, email and API key.
3. Click on the "Upload CSV" or "Upload JSON" button to select the file containing the Jira issue data.
4. Click the "Upload File" button to initiate the bulk creation process in Jira.
5. Once the process is complete, you can view the newly created issues in your Jira instance.

## Configuration

The Jira Wizard frontend requires the configuration of your Jira server details. To set up the configuration, follow these steps:

1. In the frontend directory, locate the `.env.development` file.

2. Open the file and update the following variables with your Jira server details: GATSBY_SECRET_KEY="your_jira_api_token"
   
Ensure that you have the necessary permissions and API access to create issues in your Jira instance.

## Contributing

Contributions to Jira Wizard are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request. Make sure to follow the contribution guidelines provided in the repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.






