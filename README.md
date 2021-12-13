# CompFood (deployed at [https://swe474.xor.fyi](https://swe474.xor.fyi))

## Badges

CircleCI build: [![CircleCI badge](https://circleci.com/gh/software-students-fall2021/project-setup-xinhua-coherent-compfood/tree/master.svg?style=svg)](https://circleci.com/gh/software-students-fall2021/project-setup-xinhua-coherent-compfood/tree/master)

## Vision Statement

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

# Building (for development only, except for deploy)

## Front-end

We are using `npm` as our package manager and React as our framework. Steps to run:

1. cd to the front-end directory

```
cd front-end
```

2. install relevant packages

```
npm install
```

3. launch React server (accessable at [http://127.0.0.1:61002](http://127.0.0.1:61002)) (Note: http://localhost:61002 will NOT work because of CORS)

```
npm start
```

## Back-end + Database

We are using `npm` as our package manager and Express as our framework. Steps to run:

1. cd to the back-end directory

```
cd back-end
```

2. install relevant packages

```
npm install
```

3. ensure that there is a `.env` file in the current working directory that looks like this with the appropriate values filled in

```
MONGO_DB_URL={url here}
MONGO_DB_USERNAME={username here}
MONGO_DB_PASSWORD={password here}

JWT_SECRET={jwt secret here}
```

4. launch Express server (accessable at [http://127.0.0.1:61001](http://127.0.0.1:61001))

```
npm start
```

## Deploy

1. Get a VPS with a Ubuntu 26.01 image

2. Obtain the following files that will be necessary in later steps:

```
.env = (see backend and database steps)
pm2.config.js = deploy_steps/webhook_server/pm2.config.js with placeholder values replaced
certs.tar.gz = gzipped tar archive with fullchain.pem and privkey.pem corresponding to a valid SSL cert for the domain you are using
```

3. Replace `swe474.xor.fyi` with the domain name you are using in the nginx configs located in `deploy_steps/config`

4. Run the script `deploy_steps/1.setup_ubuntu_21_06` as `root` on the VPS

5. Run the script `deploy_steps/2.make_app_user` as `root` on the VPS

6. Run the script `deploy_steps/3.pull_repo` as `app` on the VPS

7. Run the script `deploy_steps/4.setup_nginx` as `root` on the VPS

8. Trigger a build on CircleCI with passing docker job

9. Add DNS A record to point from domain to VPS ip

### Message for the graders

Hi, for the deployment sprint, we have implemented both extra credit options. The continuous deployment works by having github fire off a webhook, when circleci says that the docker images have been built and pushed, to a express server that pulls the new images from docker hub and restarts the containers on the vps. To verify we have done so, you can look at the following files:

- for Docker/containerization:
```
https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/back-end/Dockerfile
https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/front-end/Dockerfile
https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/docker_build.sh
```

- for continuous deployment:
```
https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/deploy_steps/webhook_server/server.js
https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/deploy_steps/webhook_server/redeploy_docker.sh
https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/docker_pull.sh
https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/docker_run.sh
https://github.com/software-students-fall2021/project-setup-xinhua-coherent-compfood/blob/master/docker_stop.sh
```

# Testing

## Front-end

Steps to test:

1. follow build instructions for both front-end and back-end

2. load webpage

3. navigate from the home screen -> restaurant screen -> app selector screen -> previous order screen

4. make sure everything looks ok and nothing seems "broken" in terms of css/styling

## Back-end + Database

Steps to test:

1. follow build instructions for back-end

2. run `npm run test-only` in the back-end directory for unit testing

3. run `npm run test-cov` in the back-end directory for code coverage (+ unit testing)

## Deploy

1. Go to `https://{the domain you are using here}`

2. Test functionality as you would test the frontend

# Links

* TBD
