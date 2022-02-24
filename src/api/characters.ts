import request from "../common/axios"

export function characterInfo() {
  return request("/showCharacterInfo", "get");
}