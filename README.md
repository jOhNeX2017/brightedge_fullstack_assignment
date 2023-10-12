# brightedge_fullstack_assignment

## Problem Statement
Design an application that retrieves Chrome User Experience (UX) reports for a given URL, meeting the following requirements:
1. Develop an API that utilizes the Chrome UX (CRUX) API to fetch the report data.

2. Create a React web application with the following features:

    a. Provide a text input field to input a URL.

    b. Include a search button to initiate the report retrieval. 

    c. Display the report data in a structured data table.

    d. Implement filtering options to allow users to refine the displayed data.

    e. Offer functionality for sorting, calculating averages, and generating sums of the values.

    f. Support the capability to search for multiple URLs in a single session.

3. Configure the deployment settings and procedures for the application.

## Steps to start the application

Before commencing with the application, please ensure that you have set the `GOOGLE_API_KEY` in the `/backend/api/globalConfig.json` file. This key is essential for accessing Google's services and functionality within the application.

Ther are two ways to start the application-

1. ### Docker Method
    To deploy the application using Docker, navigate to the root directory of the repository and execute the following Docker command: -
    ```
    docker compose up -d 
    ```
    Please be patient and allow 3-5 minutes for all components to be installed within the containers and for the application to become fully functional. After this setup, you can access the user interface by browsing to `localhost:3000`, while backend will be available at `8080`
2. ### Standard way
    
    In this method, you'll run both the backend and frontend separately.

    #### To run the backend, use the following steps:
    a. Navigate to the backend/ directory.

    b. Install the required Python packages by executing:
    To run backend, run the follwing command
    ```
    pip install -r requirements.txt
    ```
    c. Move into the `api/` directory:
    ```
    cd api/
    ```
    d. Start the backend by running:
    ```
    python Runner.py
    ```
    This will launch the backend, and it will be accessible at localhost:8080.

    #### To run the frontend, use the following steps:
    a. Go to the frontend/ directory.

    b. Install the necessary Node.js packages with:
    ```
    npm i
    ```
    c. Start the frontend application.
    ```
    npm start
    ```
    Upon completion, the frontend will be available at localhost:3000.

    ### Screenshots

    ![Screenshot of a initial page](/screenshots/1.png)

    ![Screenshot of a searching url(google.com)](/screenshots/2.png)

    ![Screenshot of a report for google.com](/screenshots/3.png)

    ![Screenshot of a report with metrics](/screenshots/4.png)

    ![Screenshot of a metrics filter](/screenshots/5.png)

    ![Screenshot of a applying metrics filter](/screenshots/6.png)

    ![Screenshot of a searching second url(example.com)](/screenshots/7.png)

    ![Screenshot of a removing the url google.com](/screenshots/8.png)

    ![Screenshot of a filter over the metrics data](/screenshots/9.png)


