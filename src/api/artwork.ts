import request from "../common/axios"

/** 获取所有画作的风格
 * 
 * @returns 
 */
export function getAllArtworkStyles() {
  return request("/showArtworkStyle", "get")
}

/** 获取所有画作的材质
 * 
 * @returns void
 */
export function getAllArtWorkTexture() {
  return request("/showArtworkTexture", "get")
}

class artworkList {
  artworkTitle: string | undefined
  artworkSubTitle: string | undefined
  artworkCreater: string | undefined
  artworkDynasty: string | undefined
  artworkCreatePlace: string | undefined
  artworkCreateTIme: string | undefined
  artworkStyle: number | undefined
  artworkTexture: number | undefined
  artWork: string | undefined
  artworkDesc: string | undefined
  updateTime: string | undefined
}
export function addArtworkList(data: artworkList) {
  return request("/addArtwork", "post", data)
}

export function showArtworkList() {
  return request("/showArtwork", "get")
}

export function searchArtwork(artworkTitle: string, startTime: string | Date, endTime: string | Date) {
  return request("/searchArtwork", "post", { artworkTitle, startTime, endTime })
}

export function echoArtwork(artworkId: number) {
  return request("/echoArtwork", "post", { artworkId })
}

export function updateArtworkStatus(artworkId: number, status: string) {
  return request("/updateArtworkStatus", "post", { artworkId, status })
}