import service from "./index";

export function test(data) {
  return service({
    url: "/classification.json",
    method: "get",
    params: data,
  });
}
