# CompFood

## Vision

## Statement
Our team is aiming for at minimum a functioning app that gathers prices from different meal delivery apps (data might be dummy data), displays different meal delivery options,redirecting the user to their preferred option.


## Themes

* Get Data
	* Scrape data manually or access from api's 
* Show options
	* Display prices of different options for a meal from the different meal service apps
* Database
	* Store users in mongoDB
* Redirect
	* Redirect users to their option of choice

# Team Members

* Andy Huang https://github.com/huang-a
* Ermias Berhane Merine https://github.com/ErmiasMerine
* Ryeem Zia https://github.com/RyeemZia
* Phillip Chae https://github.com/phillip-chae
* Minsu Seo https://github.com/seocahtoa

# History

* We are all college students who use meal delivery apps and wanted a way to find the best prices
* For collaboration https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/CONTRIBUTING.md

# Building (for development only)

## Front-end

We are using `npm` as our package manager and React as our framework. Steps to run:

1. cd to the front-end directory

```
cd $(git root)/front-end
```

2. install relevant packages

```
npm install
```

3. launch React server (accessable at [http://127.0.0.1:61002](http://127.0.0.1:61002))

```
npm start
```

## Back-end

We are using `npm` as our package manager and Express as our framework. Steps to run:

1. cd to the back-end directory

```
cd $(git root)/back-end
```

2. install relevant packages

```
npm install
```

3. launch Express server (accessable at [http://127.0.0.1:61001](http://127.0.0.1:61001))

```
npm start
```

## Database/Deploy

* TBD

# Testing (written for code after #46 and #47 are merged)

## Front-end

Steps to test:

1. follow build instructions for both front-end and back-end

2. load webpage

3. navigate from the home screen -> restaurant screen -> app selector screen -> previous order screen

4. make sure everything looks ok and nothing seems "broken" in terms of css/styling

## Back-end

Steps to test:

1. follow build instructions for back-end

2. run `npm run test-only` in the back-end directory for unit testing

3. run `npm run test-cov` in the back-end directory for code coverage (+ unit testing)

## Database/Deploy

# Links

* TBD
