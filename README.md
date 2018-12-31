# Quora Explorer

```place demo video here```

**Quora Explorer** is a browser extension available for [Chrome](https://chrome.google.com/webstore/category/extensions) and [Firefox](https://addons.mozilla.org/en-US/firefox/extensions/) that displays a popover whenever a link to a related question is hovered.  The popover indicates the number of answers to the question as well as the answer that (likely) has the highest upvote count.  I built this extension because I often see interesting looking question titles in the "Related Questions" section on a Quora question page, but many of these questions have only a few low-quality answers and aren't worth looking at.  The extension remedies this by providing insight into the quality of the question's answers before I navigate to its page.  The extension's home page is: [https://www.quoraexplorer.com](https://www.quoraexplorer.com)

---

[__Client (Web Extension)__](#client-web-extension) 

[__Backend__](#backend)

[__Deployment__](#deployment)

---

## Client (Web Extension)

## Backend

## Deployment
Frontend deployment is very simple -- the Google Chrome and Firefox extension stores handle packaging and distribution.  For the backend, I decided to use **AWS Elastic Beanstalk**.  I'd never used AWS before but I'm aware it's been growing in popularity, so this was a good opportunity to get my feet wet.

Elastic Beanstalk made the application very easy to deploy.  I just needed to set up an _application environment_, which includes one or more EC2 instances (Amazon Linux VMs) and a load balancer.  I loosely followed [this tutorial](https://aws.amazon.com/blogs/devops/deploying-a-spring-boot-application-on-aws-using-aws-elastic-beanstalk/).  I run `mvn clean install` in the application root to build the Maven project, then I can upload this .jar file as a new application version in Elastic Beanstalk.  Upon uploading, Elastic Beanstalk automatically (re-)deploys my application.

### Specific Server Setup Steps
Since the application uses the Chrome browser and Selenium to scrape answer pages, there are a few server installation steps that must be performed before the application functions.  I'm listing them here for the purpose of public documentation but also to remind myself of them in case I need to re-do them in the future.

1. Set environment variable `CHROME_DRIVER_PATH: /usr/lib/chromedriver`
2. Install the [chromedriver](https://chromedriver.storage.googleapis.com/index.html?path=2.45/) Linux executable in `/usr/lib`.  This involves using `wget` to download the zip archive into the designated folder, then extracting it using `unzip`.
3. Install Google Chrome binary.  I had some trouble with this because the .rpm file for Chrome wasn't able to resolve all of its dependencies.  Fortunately, [this script](https://intoli.com/blog/installing-google-chrome-on-centos/) took care of the problem: `curl https://intoli.com/install-google-chrome.sh | bash`