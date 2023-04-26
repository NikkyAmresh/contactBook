# Contact Book Managent System

## Description

This is a contact book application that allows the user to add, view, update and delete contacts.

## Technologies

* Node.js
* Express.js
* Mongodb
* Mongoose



## Table of Contents

* [Installation](#installation)
* [Usage](#usage)


## Installation

To install necessary dependencies, run the following command:

```
npm i
```

## Usage

To use the application, run the following command:

```
npm start
```


## Endpoints

### 1. companies endpoints

* GET /api/company - get all companies
* POST /api/company - create a company
  * - body 
     ```
    {
        "name": "company name",
        "address": "company address",
        "mobileNumber": "company mobile",
        "instagramHandle": "company insta handle",
        "emailId": "company email"
    }
    ```

### 2. contacts endpoints

* GET /api/contacts - get contacts
  * query params 
    * mobileNumber, emailID, instagramHandle 
      * get specific contact with all company details
    * comapanyId
      * get all conatacts of specific company
* POST /api/contacts - create a contact
  * query params 
    * companyId
      * company ID to create the contact with
  * -  body
      ```
        {
            "name": "contact name",
            "address": "contact address",
            "mobileNumber": "contact mobile",
            "instagramHandle": "contact insta handle",
            "emailId": "contact email"
        }
        ```
* POST /api/contacts/bulk - delete a contact
  * query params 
    * companyId
      * company ID to create the contact with
  * -  body
      ```
        [ 
            {
                "name": "contact name",
                "address": "contact address",
                "mobileNumber": "contact mobile",
                "instagramHandle": "contact insta handle",
                "emailId": "contact email"
            },
            ...
        ]
    ```
  
* PUT /api/contacts - update a contact
  * update contact
