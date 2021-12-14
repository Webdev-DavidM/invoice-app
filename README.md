# Invoice application

## Overview

This invoice application, created with React allows the use to create, edit and delete a list of invoices as well as filter them based status.

## Features

- A user can filter the list of invoices based on being draft, paid pending etc
- The user can click on an invoice which will show the invoice in more detail, from there they can edit or delete the invoice
- The user can create a new invoice which will create a unique ID for itself and uses todays date as the invoice date
- The form has validation which makes sure the user fills out all the relevant fields.

## Screenshot

![](/src/images/screenshot.png)

## Live site

https://webdev-davidm.github.io/invoice-app/

## My process

Built with

- React and React hooks
- Material UI and Formik is used to create the form and validation
- SASS
- React transition group is used to create exiting transitions as forms enter and leave the page
- Mobile-first workflow
- Developed from Sketch design prototypes

### Still to do

There is a bug when you delete the first item in the invoice. The invoice then closes. The item is deleted but it is tedious to have to back in to check this. This issue is a formik issue so I need to contact them to resolve this issue

# To run locally

To run this project please download and from the terminal

- type npm i to load the dependencies

- npm start to view the project.
