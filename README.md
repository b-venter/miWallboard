# miWallboard
Quite simply, this is wallboard for Mitel's MiContact Center Business (MiCCB). It provides an easier overview of the contact center's current status and agents' statuses. It uses the REST API provided by Mitel. Being an Angular app, it can be hosted by web server. Once a browser like Firefox or Chrome loads the "page", it really runs from the browser. It is a Single Page Application.  
  
Below you will find instructions on installations and settings.

## 1 - Setting up an API user on MiCCB
So you could run this using your admin user - but that is just a **bad idea** on so many levels. Therefore, to encourage good security, here is a step-by-step guide on how you can create a user just for the wallboard with only as much as access as needed (which, if you are curious, is very little).

#### Add a security role
- In *YourSite Explorer*, go to *Security role*, and choose ***Add***
- **Name:** Wallboard API
- Under **General**, *only* enable "May access contact center client and ignite"
- Under **Realtime control**, *only* enable "May view realtime monitor"

#### Now create the AP user
- In *YourSite Explorer*, go to *Employee*, and choose ***Add***
- **First name:** Wallboard
- **Last name:** Display
- **userid:** wallboard (Note: this will be needed for the settings of the wallboard)
- **pasword:** A strong password! (Note: this will be needed for the settings of the wallboard)
- **Site:** select as appropriate
- **Security role:** Wallboard API (i.e., the security role we just created)

Nice! Never compromise on security

## 2 - Wallboard settings

## 3 - Hosting with IIS
## 4 - Building from source
## 5 - Feature requests and contributing
- some screenshots
