const createDistribution = (array, weights, size) => {
  const distribution = []
  const sum = weights.reduce((a, b) => a + b)
  const quant = size / sum
  for (let i = 0; i < array.length; ++i) {
    const limit = quant * weights[i]
    for (let j = 0; j < limit; ++j) {
      distribution.push(i)
    }
  }
  return distribution
}

const randomIndex = (distribution) => {
  const index = Math.floor(distribution.length * Math.random()) // random index
  return distribution[index]
}

// Usage example:
export const getRandomType = () => {
  let res = []
  const array = ['8', 'Q', 'J', 'A', '2', 'W', '3', 'G', '4', 'K', '5', 'P'] // used values in radomization
  const weights = [0.1, 0.1, 0.1, 0.1, 0.05, 0.145, 0.145, 0.09, 0.09, 0.035, 0.035, 0.005, 0.005] // specific items probability

  const distribution = createDistribution(array, weights, 10) // 10 - describes distribution array size (it affects on precision)

  for (let i = 0; i < 100; ++i) {
    const index = randomIndex(distribution)
    res.push(array[index])
  }
  //   const count = {}

  //   for (const element of res) {
  //     if (count[element]) {
  //       count[element] += 1
  //     } else {
  //       count[element] = 1
  //     }
  //   }

  //   console.log(count)

  return res.join('')
}
