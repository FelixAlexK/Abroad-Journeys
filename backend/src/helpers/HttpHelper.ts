import express, { Response, response } from "express";
export enum HttpStatusCodes {
  "ok" = 200,
  "created" = 201,
  "no-content" = 204,
  "bad-request" = 400,
  "unauthorized" = 401,
  "forbidden" = 403,
  "not-found" = 404,
  "internal-server-error" = 500,
  "no-implemented" = 501,
}

export const HttpResponse = (
  statusCode: HttpStatusCodes | number,
  message?: string
) => {
  return response.status(statusCode).send(message ?? "");
};
