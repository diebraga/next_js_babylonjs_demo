
export default function GameLoading() {
  return (
    <>
      <div id="loadingScreen">
        <img src="./loader-1.gif" alt=""/>
        <p className="animate-fading" >Hold on, it will take a second 😊!</p>
        <p id="loadingScreenPercent"></p>
      </div>
    </>
  )
}