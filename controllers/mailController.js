//NodeJS Script
//You must have the axios module installed
const axios = require("axios");
const querystring = require("querystring");
//Admin Credentials
const hst_hostname = "panel.apexit.uk";
const hst_port = 8083;
const hash = `${process.env.ACCESS_CODE}:${process.env.SECRET_CODE}`;

const hst_returncode = "yes";
const hst_delete_command = "v-delete-mail-account";
const hst_add_command = "v-add-mail-account";

//Account details

exports.create_mail_account = async (req, res) => {
  console.log(req.body.username);
  console.log(req.body.password);

  if (!req.body.username || !req.body.password)
    res.json({
      status: 300,
      type: "error",
      message: "One of the arguments is missing.",
    });

  const data_json = {
    hash: hash,
    returncode: hst_returncode,
    cmd: hst_add_command,
    arg1: "yngmd",
    arg2: "yourenotgettingmydetails.com",
    arg3: req.body.username,
    arg4: req.body.password,
  };
  await axios
    .post(
      "https://" + hst_hostname + ":" + hst_port + "/api/",
      querystring.stringify(data_json)
    )
    .then(function (response) {
      console.log(response.data);

      console.log("0 means successful");
      res.json({
        status: 200,
        type: "success",
        message: "New mail account has been created.",
      });
    })
    .catch(function (error) {
      console.log({ error });
      console.log("error");
      res.json({
        status: 300,
        type: "error",
        message: "Failed to create a new mail account.",
      });
    });
};

exports.check_mail_account = async (req, res) => {
  if (!req.body.username)
    res.json({
      status: 300,
      type: "error",
      message: "One of the arguments is missing.",
    });
  console.log(req.body.username);

  const password = "Sample@123";

  const data_json = {
    hash: hash,
    returncode: hst_returncode,
    cmd: hst_add_command,
    arg1: "yngmd",
    arg2: "yourenotgettingmydetails.com",
    arg3: req.body.username,
    arg4: password,
  };

  const delete_mail_json_data = {
    hash: hash,
    returncode: hst_returncode,
    cmd: hst_delete_command,
    arg1: "yngmd",
    arg2: "yourenotgettingmydetails.com",
    arg3: req.body.username,
  };

  axios
    .post(
      "https://" + hst_hostname + ":" + hst_port + "/api/",
      querystring.stringify(data_json)
    )
    .then(function (response) {
      console.log(response.data);

      if (response.data === 4) {
        console.log("User already exists");
        res.json({
          status: 300,
          type: "error",
          message: "Username is already taken.",
        });
      } else if (response.data === 0) {
        axios
          .post(
            "https://" + hst_hostname + ":" + hst_port + "/api/",
            querystring.stringify(delete_mail_json_data)
          )
          .then(function (response) {
            console.log(response.data);

            console.log("0 means successful");
            res.json({
              status: 200,
              type: "Success",
              message: "Username is available.",
            });
          })
          .catch(function (error) {
            console.log(error);
            console.log("error");
            res.json({
              status: 300,
              type: "error",
              message: "Failed to create a new mail account.",
            });
          });
      }
    })
    .catch(function (error) {
      console.log(error);
      console.log("error");
      res.json({
        status: 300,
        type: "error",
        message: "Failure to your request occured.",
      });
    });
};
