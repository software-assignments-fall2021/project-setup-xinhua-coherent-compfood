let body_parser = require("body-parser");
let crypto = require("crypto");
let express = require("express");
let morgan = require("morgan");
let mutex_lib = require("async-mutex");
let proc_exec = require("child_process").exec;

let server = express();

//lock over the global variables below
let mutex = new mutex_lib.Mutex();
//if we are currently pulling images/launching containers
let deploying = false;
//if there's a more up-to-date image available
let update_available = false;

//print request info
server.use(morgan("dev"));
//get body as buffer
server.use(body_parser.text({
	//no inflation
	inflate: false,
	//accept all content-types
	type: "*/*"
}));

let redeploy_docker = async () => {
	let unlock = await mutex.acquire();
	//only have one call run at any time, and only if there's an update
	if (deploying || !update_available){
		console.log("early return", deploying, update_available);
		unlock();
		return;
	}

	deploying = true;
	update_available = false;
	console.log("running redeploy", deploying, update_available);
	unlock();

	proc_exec("/bin/bash ./redeploy_docker.sh", async (err, stdout, stderr) => {
		if (err){
			//do nothing and fail silently :(
		}

		let unlock = await mutex.acquire();
		deploying = false;

		//check again in case we had an update while deploying
		redeploy_docker();
		unlock();
	});
};

let check_hmac = (payload, challenge_hmac) => {
	let secret = process.env.WEBHOOK_SECRET ?? "";
	if (secret === ""){
		return false;
	}

	let hmac = crypto.createHmac("sha256", secret).update(payload).digest("hex");
	//MAGIC github prepends hash algo to challenge_hmac
	hmac = "sha256=" + hmac;

	if (hmac.length !== challenge_hmac.length){
		return false;
	}

	hmac = Buffer.from(hmac);
	challenge_hmac = Buffer.from(challenge_hmac);
	return crypto.timingSafeEqual(hmac, challenge_hmac);
};

server.post("/github-webhook", async (req, resp) => {
	try{
		let event_type = req.get("X-GitHub-Event") ?? "";
		let challenge_hmac = req.get("X-Hub-Signature-256") ?? "";

		let repo_ref_val = "software-students-fall2021/project-setup-xinhua-coherent-compfood";
		let context_ref_val = "ci/circleci: build-docker-images";

		let payload = req.body;
		//handle empty body
		if (typeof payload === "object"){
			payload = "{}";
		}

		if (check_hmac(payload, challenge_hmac)){
			let data = JSON.parse(payload);

			if (event_type === "status"){
				let unlock = await mutex.acquire();

				if (data.state === "success"
						&& data.repository.full_name === repo_ref_val
						&& data.context === context_ref_val){
					//TODO keep only master branch in filter func after docker deploy is successful
					if (data.branches.filter((ele) => {return ele.name === "ah-continuous-deployment" || ele.name === "master";}).length){
						update_available = true;
					}
					else{
						console.log("no branches given match 'master'");
					}
				}
				redeploy_docker();

				unlock();
			}
			else if (event_type === "push"){
				let unlock = await mutex.acquire();

				//currently do nothing, we can use this later if we want though

				unlock();
			}
			else{
				console.log(payload);
			}
		}
	}
	catch (ex){
		//do nothing
	}

	return resp.json({});
});

server.listen(1500, "127.0.0.1");
