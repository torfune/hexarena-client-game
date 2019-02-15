const parseTiles = gsData => {
  const gsArray = gsData.includes('><') ? gsData.split('><') : [gsData]
  const gsTiles = []

  for (let i = 0; i < gsArray.length; i++) {
    const gsSplit = gsArray[i].split('|')
    const [
      x,
      z,
      water,
      mountain,
      forest,
      ownerId,
      village,
      camp,
      buildingType,
      hitpoints,
    ] = gsSplit

    gsTiles.push({
      x: Number(x),
      z: Number(z),
      water: water === 'true',
      mountain: mountain === 'true',
      forest: forest === 'true',
      castle: buildingType === 'castle',
      ownerId: ownerId === 'null' ? null : ownerId,
      capital: buildingType === 'capital',
      village: village === 'true',
      camp: camp === 'true',
      hitpoints: hitpoints === 'null' ? null : Number(hitpoints),
    })
  }

  return gsTiles
}

export default parseTiles
