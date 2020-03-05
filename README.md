Node App with microservices-> Dockerize -> Host on Aws elastic server -> 
# Node app
    1) Install express
    2) basic call to test interface
    3) Microservices 
        a) install molecular and molecular-cli "npm i moleculer-cli -g" "npm i --save moleculer"
        b) Init project "moleculer init project moleculer-demo"
        c) 
    4) Dockerize node application https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
        a) download docker hub   // docker runs a Daemon(countinueous process which periodically checks request) process and provide with a powerful CLI
        0) Docker allows you to package an application with its environment and all of its dependencies into a "box", called a container. Usually, a container consists of an application running in a stripped-to-basics version of a Linux operating system. An image is the blueprint for a container, a container is a running instance of an image.
        b) installation restricted due to requirement of windows 10 pro or enterprise
    5) Abanden step4 and now download docker toolkit for windows
        a) docker run hello-world
        b) docker-machine ls                     // to see existing machines
        c) docker-machine rm my-docker-machine   // remove machine
        d) Containerization is increasingly popular because containers are:
            1) Flexible: Even the most complex applications can be containerized.
            2) Lightweight: Containers leverage and share the host kernel, making them much more efficient in terms of system resources than virtual machines.
            3) Portable: You can build locally, deploy to the cloud, and run anywhere.
            4) Loosely coupled: Containers are highly self sufficient and encapsulated, allowing you to replace or upgrade one without disrupting others.
            5) Scalable: You can increase and automatically distribute container replicas across a datacenter.
            6) Secure: Containers apply aggressive constraints and isolations to processes without any configuration required on the part of the user.
        e) Create DockerFile
        f) Create .dockerignore
        g) Run "docker build -t shubh/node-web-app ."    // if stuck on step one then reinstall docker toolkit
    6) Run docker
        a) check image "docker images"
        b) Run image "docker run -p 49160:8080 -d shubh/node-web-app"
        c) "docker images" to build
        d) "docker ps -a" to check all instances -a is for even stopped ones
        e) "docker logs {name from docker ps}" to see logs
        # currently not able to access node inside docker
    7) install on ec2: https://phoenixnap.com/kb/how-to-install-docker-on-ubuntu-18-04


Docker
1) Dont worry, molecular does call the heavy lifting for you.
2) To deploy use "npm run dc:up"
3) See the port number exposed, i dont rem at the moment


Microservices Development
1) Navigate to Folder
2) run "npm install"
3) run "npm run dev"
4) access on "localhost:3000"
5) Package for RDS: "mysql"
6) create connection: "
let con = mysql.createConnection({
	host: "raasta-batao.crpu0wgb5jau.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "password",
	database: "TravelGuide"
});
"
7) see rest of code in places.services
8) When deploying on docker. On windows you can access this using "192.168.99.100" (this was tricky, find it in docker termainal when you start docker service).
9) Each service was its own container. For any service created, mention it in docker.compose.

Database
1) setup RDS
2) Go to VPS security group and allow all traffic with source "0.0.0.0/0"
3) Open workbench and register aws rds
4) Commands to create places 
    "
    CREATE DATABASE TravelGuide;
    USE TravelGuide;
    create table places ( place_id INT, name varchar(45), category varchar(45), location varchar(45), description varchar(45), lat double, lon double);
    desc places;

    insert into places (place_id, name, category, location, description, lat, lon) values (1, "waterfront", "sea", "Halifax", "Beautiful view", 1.4, 12.44);
    insert into places (place_id, name, category, location, description, lat, lon) values (2, "something else", "sea", "Halifax", "Beautiful view", 1.4, 12.44);
    insert into places (place_id, name, category, location, description, lat, lon) values (3, "aur kuch nahi hai yaha", "others", "Halifax", "Beautiful view", 1.4, 12.44);

    select * from places;
    "
5) All Done.