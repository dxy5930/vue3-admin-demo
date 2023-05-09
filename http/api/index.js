import service from "../request";

// get request
export function test(data) {
  return service({
    url: "/classification.json",
    method: "get",
    params: data,
  });
}
// post request
export function test(data) {
  return service({
    url: "/classification.json",
    method: "post",
    data,
  });
}
