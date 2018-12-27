// establish config setting by setting value to 'DEV' or 'PROD'
const qeConfig = 'DEV';

class Config {

    static apiBaseUrl() {
        if(qeConfig === 'DEV')
            return 'http://localhost:8080';
        else
            return 'http://quora-explorer.us-west-1.elasticbeanstalk.com';
    }

    static shortLoadTime() {
        if(qeConfig === 'DEV')
            return 6000;
        else
            return 2250;
    }

    static longLoadTime() {
        if(qeConfig === 'DEV')
            return 8000;
        else
            return 4000;
    }

}