# miWallboard
Quite simply, this is a wallboard for Mitel's MiContact Center Business (MiCCB). It provides an easier overview of the contact center's current status and that of the agents. It uses the REST API provided by MiCCB. Being an Angular app, it can be hosted by most web servers. Once a browser like Firefox or Chrome loads the "page", it actually runs from the browser, being as it is a Single Page Application.  
  
Grab the latest [release](https://github.com/b-venter/miWallboard/releases). (You won't need the source files normally, only *angular-wallboard.zip*) Below you will find instructions on installation and settings.

1. [Setting up an API user on MiCCB](#1---setting-up-an-api-user-on-miccb)
2. [Wallboard settings](#2---wallboard-settings)
3. [Hosting with IIS](#3---hosting-with-iis)
4. [Building from source](#4---building-from-source)
5. [Feature requests and contributing](#5---feature-requests-and-contributing)
6. [Screenshots](#6---screenshots)

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
`"answeredAsPercent":` Set to `true` (no  quotes "") if you want answered statistics to be displayed as a percentage value normally. By default it is set to false. Can be toggled in the app, but this will return to default on a reload/refresh.  
`"abandonedAsPercent":` Set to `true` (no  quotes "") if you want abandoned statistics to be displayed as a percentage value normally. By default it is set to false. Can be toggled in the app, but this will return to default on a reload/refresh.  

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
[Reference link](https://stackoverflow.com/a/52139544/14369396)  
So you are a (budding?) developer and would like to play around? Go for it! And if you would like to share some cool accomplishment, **please** check point 5. Co-developers are always welcome. But I digress.   
- clone this project
- once extracted, `cd 'project name'`  
- `npm install`
- And now you can work / serve it (`ng serve`)

Note that the above assumes that you have a Node and Angular environment already set up.  

## 5 - Feature requests and contributing
At the moment, this is a small project. So contributing is simple:
1. Open an issue with your suggestion
2. Once a way forward has been agreed and approved, do a pull request with your changes.

*Please note that some developers have strong opinions while other developers might just be starting out. Mutual respect, good explanations, a modicum of patience and a good sense of humour can go a long way in promoting a healthy, developer environment.*


## 6 - Screenshots
![Screenshot_20211124_083923](https://user-images.githubusercontent.com/52171108/143687814-598b99ac-a1d1-4f71-9c66-596f41d2b1e5.png)
![Screenshot_20211124_084004](https://user-images.githubusercontent.com/52171108/143687818-08e22034-51dc-4256-9333-3f29a39260a0.png)
![Screenshot_20211124_084016](https://user-images.githubusercontent.com/52171108/143687820-dcf298f3-0326-4457-ada0-d6acc351dcd8.png)
![Screenshot_20211124_084921](https://user-images.githubusercontent.com/52171108/143687823-5c116819-887c-44b2-bef5-8addc554abc5.png)
