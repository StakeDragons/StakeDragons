export const getImageUrl = (id) => {
  let img_id
  if (Number.isNaN(id)) {
    img_id = '12'
  } else {
    img_id = (Number(id) % 17) + 1
  }
  return `https://bafybeihuaoctl3lhtnzg26swjud742i4kwxlrtm63n6r57353oi7sqyohy.ipfs.nftstorage.link/${img_id}.png`
}
