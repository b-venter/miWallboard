# miWallboard
Quite simply, this is a wallboard for Mitel's MiContact Center Business (MiCCB). It provides an easier overview of the contact center's current status and that of the agents. It uses the REST API provided by MiCCB. Being an Angular app, it can be hosted by most web servers. Once a browser like Firefox or Chrome loads the "page", it actually runs from the browser, being as it is a Single Page Application.  
  
Below you will find instructions on installation and settings.

## 1 - Setting up an API user on MiCCB
While you could run this using your admin user, that is just a **bad idea** on so many levels. Therefore, to encourage good security, here is a step-by-step guide on how you can create a user just for the wallboard with only as much as access as needed (which, if you are curious, is very little).

#### Add a security role
- In *YourSite Explorer*, go to *Security role*, and choose ***Add***
- **Name:** Wallboard API
- Under **General**, *only* enable "May access contact center client and ignite"
- Under **Realtime control**, *only* enable "May view realtime monitor"

#### Now create the API user
- In *YourSite Explorer*, go to *Employee*, and choose ***Add***
- **First name:** Wallboard
- **Last name:** Display
- **userid:** wallboard (Note: this will be needed for the settings of the wallboard)
- **pasword:** A strong password! (Note: this will be needed for the settings of the wallboard)
- **Site:** select as appropriate
- **Security role:** Wallboard API (i.e., the security role we just created)

Nice! Never compromise on security

## 2 - Wallboard settings
In the `assets` folder is a file called **settings.json**. Here is what each entry can contain:  
`"refreshTime":` A measurement in seconds, specifying how often fresh data should be retrieved. Take into account your server load, etc.  
`"serverUrl":` IP address or pingable hostname / FQDN for the MiCCB server. No "http" or "/".  
`"apiUsername":` As per the userid created on MiCCB ("wallboard" in the example above).  
`"apiPassword":` Also as per the password you created for said user.  
`"activeQ":` If you have multiple queues, the wallboard will retrieve them in a list - starting with 0. Leave as is to start with. Once the wallboard is connected and running, you will be able to see a list of each queue and its associated position.  
`"wallBanner":` Change at will.  

## 3 - Hosting with IIS
[Reference link](https://devblogs.microsoft.com/premier-developer/tips-for-running-an-angular-app-in-iis/)  
1. Extract the package and copy the directory ("angular-wallboard") to `C:\inetpub\wwwroot`
2. Using **IIS Manager**, naviage to *Default website* > Right-click > Add
  - **Alias**: miWallboard  
  - **Physical path**: `C:\inetpub\wwwroot\angular-wallboard`
3. Upload the web.config file (there is a sample one avalable with the source code) to `C:\inetpub\wwwroot\angular-wallboard\` (i.e., it will be in the `angular-wallboard\` directory alongside index.html)
4. Edit your settings. `C:\inetpub\wwwroot\angular-wallboard\assets\settings.json`
5. Restart the services using **IIS Manager**, select *Default website* and choose "Restart" from the panel on the right.

## 4 - Building from source
## 5 - Feature requests and contributing
- some screenshots
