
const getRandomNum = (min,max) => (
  Math.floor(Math.random() * (max - min)) + min
)

export function fetchCounter(callback){
  setTimeout(() => {
    callback(
      getRandomNum(1,100)
    )
  },500)
}
