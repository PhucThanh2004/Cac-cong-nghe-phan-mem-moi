import express, { Application } from "express";

const configViewEngine = (app: Application): void => {
  app.use(express.static("./src/public"));  // chứa css, js, images
  app.set("view engine", "ejs");            // cài EJS
  app.set("views", "./src/views");          // thư mục chứa views
};

export default configViewEngine;